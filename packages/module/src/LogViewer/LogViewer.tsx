import React, { useState, useEffect, memo } from 'react';
import { LogViewerContext, LogViewerToolbarContext } from './LogViewerContext';
import { css } from '@patternfly/react-styles';
import { LogViewerRow } from './LogViewerRow';
import { parseConsoleOutput, searchedKeyWordType, stripAnsi } from './utils/utils';
import { VariableSizeList as List, areEqual } from '../react-window';
import styles from '@patternfly/react-styles/css/components/LogViewer/log-viewer';
import AnsiUp from '../ansi_up/ansi_up';

export interface LogViewerProps {
  /** String or String Array data being sent by the consumer*/
  data?: string | string[];
  /** Consumer may turn off the visibility on the toolbar */
  hasToolbar?: boolean;
  /** Flag to enable or disable line numbers on the log viewer. */
  hasLineNumbers?: boolean;
  /** Width of the log viewer. */
  width?: number | string;
  /** Height of the log viewer. */
  height?: number | string;
  /** Rows rendered outside of view. The more rows are rendered, the higher impact on performance */
  overScanCount?: number;
  /** Toolbar rendered in the log viewer header */
  toolbar?: React.ReactNode;
  /** Content displayed while the log viewer is loading */
  loadingContent?: React.ReactNode;
  /** Flag indicating that log viewer is dark themed */
  theme?: 'dark' | 'light';
  /** Row index to scroll to */
  scrollToRow?: number;
  /** The width of index when the line numbers is shown, set by char numbers */
  initialIndexWidth?: number;
  /** Number of rows to display in the log viewer */
  itemCount?: number;
  /** Flag indicating that log viewer is wrapping text or not */
  isTextWrapped?: boolean;
  /** Component rendered in the log viewer console window header */
  header?: React.ReactNode;
  /** Component rendered in the log viewer console window footer */
  footer?: React.ReactNode;
  /** Callback function when scrolling the window.
   * scrollDirection is the direction of scroll, could be 'forward'|'backward'.
   * scrollOffset and scrollOffsetToBottom are the offset of the current position to the top or the bottom.
   * scrollUpdateWasRequested is false when the scroll event is cause by the user interaction in the browser, else it's true.
   * @example onScroll={({scrollDirection, scrollOffset, scrollOffsetToBottom, scrollUpdateWasRequested})=>{}}
   */
  onScroll?: ({
    scrollDirection,
    scrollOffset,
    scrollOffsetToBottom,
    scrollUpdateWasRequested
  }: {
    scrollDirection: 'forward' | 'backward';
    scrollOffset: number;
    scrollOffsetToBottom: number;
    scrollUpdateWasRequested: boolean;
  }) => void;
  /** Forwarded ref */
  innerRef?: React.RefObject<any>;
  /** Flag to enable or disable the use of classes (instead of inline styles) for ANSI coloring/formatting. */
  useAnsiClasses?: boolean;
  /** The maximum char length for fast row height estimation.
   * For wrapped lines in Chrome based browsers, lines over this length will actually be rendered to the dom and
   * measured to prevent a bug where one line can overlap another.
   */
  fastRowHeightEstimationLimit?: number;
}

let canvas: HTMLCanvasElement | undefined;

const getCharNums = (windowWidth: number, font: string) => {
  // if given, use cached canvas for better performance
  // else, create new canvas
  canvas = canvas || document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const oneChar = context.measureText('a');
  return Math.floor(windowWidth / oneChar.width);
};

const LogViewerBase: React.FunctionComponent<LogViewerProps> = memo(
  ({
    data = '',
    hasLineNumbers = true,
    height = 600,
    overScanCount = 10,
    loadingContent = '',
    toolbar,
    width,
    theme = 'light',
    scrollToRow = 0,
    itemCount = undefined,
    header,
    footer,
    onScroll,
    innerRef,
    isTextWrapped = true,
    initialIndexWidth,
    useAnsiClasses,
    fastRowHeightEstimationLimit = 5000,
    ...props
  }: LogViewerProps) => {
    const [searchedInput, setSearchedInput] = useState<string | null>('');
    const [rowInFocus, setRowInFocus] = useState<searchedKeyWordType | null>({ rowIndex: scrollToRow, matchIndex: 0 });
    const [searchedWordIndexes, setSearchedWordIndexes] = useState<searchedKeyWordType[] | null>([]);
    const [currentSearchedItemCount, setCurrentSearchedItemCount] = useState<number>(0);
    const [lineHeight, setLineHeight] = useState<number>(0);
    const [charNumsPerLine, setCharNumsPerLine] = useState<number>(0);
    const [indexWidth, setIndexWidth] = useState<number>(0);
    const [resizing, setResizing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listKey, setListKey] = useState(1);

    const [, setEmptyState] = useState({});

    /* Parse data every time it changes */
    const parsedData = React.useMemo(() => parseConsoleOutput(data), [data]);

    const isChrome = React.useMemo(() => navigator.userAgent.indexOf('Chrome') !== -1, []);

    const ansiUp = new AnsiUp();
    // eslint-disable-next-line camelcase
    ansiUp.escape_html = false;
    // eslint-disable-next-line camelcase
    ansiUp.use_classes = useAnsiClasses;

    const ref = React.useRef<any>();
    const logViewerRef = innerRef || ref;
    const containerRef = React.useRef<any>();
    let resizeTimer = null as any;

    useEffect(() => {
      let observer : ResizeObserver | undefined = undefined;
      if (containerRef && containerRef.current) {
        window.addEventListener('resize', callbackResize);
        observer = new ResizeObserver((event) => {
          setEmptyState({});
        }); 
        observer.observe(containerRef.current);
        setLoading(false);
        createDummyElements();
        ansiUp.resetStyles();
      }
      return () => { 
        window.removeEventListener('resize', callbackResize);
        observer?.disconnect();
      }
    }, [containerRef.current]);

    const callbackResize = (event : UIEvent) => {
      if (event.type === 'scroll') {
        return;
      }
      if (!resizing) {
        setResizing(true);
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        setResizing(false);
        createDummyElements();
      }, 100);
    };

    useEffect(() => {
      setLoading(resizing);
    }, [resizing]);

    const dataToRender = React.useMemo(
      () => ({
        parsedData,
        logViewerRef,
        rowInFocus,
        searchedWordIndexes
      }),
      [parsedData, logViewerRef, rowInFocus, searchedWordIndexes]
    );

    useEffect(() => {
      if (logViewerRef && logViewerRef.current) {
        logViewerRef.current.resetAfterIndex(0);
      }
    }, [parsedData]);

    useEffect(() => {
      if (scrollToRow && parsedData.length) {
        setRowInFocus({ rowIndex: scrollToRow, matchIndex: 0 });
        // only in this way (setTimeout) the scrollToItem will work
        setTimeout(() => {
          if (logViewerRef && logViewerRef.current) {
            logViewerRef.current.scrollToItem(scrollToRow, 'center');
          }
        }, 1);
      }
    }, [parsedData, scrollToRow]);

    const createDummyElements = () => {
      if (!(containerRef && containerRef.current)) {
        return;
      }
      // create dummy elements
      const dummyIndex = document.createElement('span');
      dummyIndex.className = css(styles.logViewerIndex);
      const dummyText = document.createElement('span');
      dummyText.className = css(styles.logViewerText);
      const dummyListItem = document.createElement('div');
      dummyListItem.className = css(styles.logViewerListItem);
      const dummyList = document.createElement('div');
      dummyList.className = css(styles.logViewerList);
      // append dummy elements
      dummyListItem.appendChild(dummyIndex);
      dummyListItem.appendChild(dummyText);
      dummyList.appendChild(dummyListItem);
      containerRef.current.appendChild(dummyList);
      // compute styles
      const dummyIndexStyles = getComputedStyle(dummyIndex);
      const dummyTextStyles = getComputedStyle(dummyText);
      setLineHeight(parseFloat(dummyTextStyles.lineHeight));
      const lineWidth = hasLineNumbers
        ? (containerRef.current as HTMLDivElement).clientWidth -
          (parseFloat(dummyTextStyles.paddingLeft) +
            parseFloat(dummyTextStyles.paddingRight) +
            parseFloat(dummyIndexStyles.width))
        : (containerRef.current as HTMLDivElement).clientWidth -
          (parseFloat(dummyTextStyles.paddingLeft) + parseFloat(dummyTextStyles.paddingRight));
      const charNumsPerLine = getCharNums(
        lineWidth,
        `${dummyTextStyles.fontWeight} ${dummyTextStyles.fontSize} ${dummyTextStyles.fontFamily}`
      );
      setCharNumsPerLine(charNumsPerLine);
      setIndexWidth(parseFloat(dummyIndexStyles.width));
      // remove dummy elements from the DOM tree
      containerRef.current.removeChild(dummyList);
      setListKey(listKey => listKey + 1);
    };

    const scrollToRowInFocus = (searchedRowIndex: searchedKeyWordType) => {
      setRowInFocus(searchedRowIndex);
      logViewerRef.current.scrollToItem(searchedRowIndex.rowIndex, 'center');
      // use this method to scroll to the right
      // if the keyword is out of the window when wrapping text
      if (!isTextWrapped) {
        setTimeout(() => {
          const element = containerRef.current.querySelector('.pf-v5-c-log-viewer__string.pf-m-current');
          element && element.scrollIntoView({ block: 'nearest', inline: 'center' });
        }, 1);
      }
    };

    useEffect(() => {
      setListKey(listKey => listKey + 1);
    }, [isTextWrapped]);

    const computeRowHeight = (rowText: string, estimatedHeight: number) => {
      const logViewerList = containerRef.current.firstChild.firstChild;

      // early return with the estimated height if the log viewer list hasn't been rendered yet,
      // this will be called again once it has been rendered and the correct height will be set
      if (!logViewerList) {
        return estimatedHeight;
      }

      const dummyText = document.createElement('span');
      dummyText.className = css(styles.logViewerText);
      dummyText.innerHTML = rowText;

      logViewerList.appendChild(dummyText);
      const computedHeight = dummyText.clientHeight
      logViewerList.removeChild(dummyText);

      return computedHeight
    }

    const guessRowHeight = (rowIndex: number) => {
      if (!isTextWrapped) {
        return lineHeight;
      }
      // strip ansi escape code before estimate the row height
      const rowText = stripAnsi(parsedData[rowIndex]);
      // get the row numbers of the current text
      const numRows = Math.ceil(rowText.length / charNumsPerLine);
      // multiply by line height to get the total height
      const heightGuess = lineHeight * (numRows || 1);

      // because of a bug in react-window (which seems to be limited to chrome) we need to 
      // actually compute row height in long lines to prevent them from overflowing. 
      // related issue https://github.com/bvaughn/react-window/issues/593
      if (rowText.length > fastRowHeightEstimationLimit && isChrome && isTextWrapped) {
        return computeRowHeight(rowText, heightGuess);
      }

      return heightGuess
    };

    const createList = (parsedData: string[]) => (
      <List
        key={listKey}
        outerClassName={css(styles.logViewerScrollContainer)}
        innerClassName={css(styles.logViewerList)}
        height={containerRef.current.clientHeight}
        width={containerRef.current.clientWidth}
        itemSize={guessRowHeight}
        itemCount={typeof itemCount === 'undefined' ? parsedData.length : itemCount}
        itemData={dataToRender}
        ref={logViewerRef}
        overscanCount={overScanCount}
        onScroll={onScroll}
        isTextWrapped={isTextWrapped}
        hasLineNumbers={hasLineNumbers}
        indexWidth={indexWidth}
        ansiUp={ansiUp}
      >
        {LogViewerRow}
      </List>
    );

    return (
      <LogViewerContext.Provider
        value={{
          parsedData,
          searchedInput
        }}
      >
        <div
          className={css(
            styles.logViewer,
            hasLineNumbers && styles.modifiers.lineNumbers,
            !isTextWrapped && styles.modifiers.nowrap,
            initialIndexWidth && styles.modifiers.lineNumberChars,
            theme === 'dark' && styles.modifiers.dark
          )}
          {...(initialIndexWidth && {
            style: {
              '--pf-v5-c-log-viewer--line-number-chars': initialIndexWidth + 1
            } as React.CSSProperties
          })}
          {...props}
        >
          {toolbar && (
            <LogViewerToolbarContext.Provider
              value={{
                itemCount,
                searchedInput,
                rowInFocus,
                searchedWordIndexes,
                currentSearchedItemCount,
                scrollToRow: scrollToRowInFocus,
                setRowInFocus,
                setSearchedInput,
                setSearchedWordIndexes,
                setCurrentSearchedItemCount
              }}
            >
              <div className={css(styles.logViewerHeader)}>{toolbar}</div>
            </LogViewerToolbarContext.Provider>
          )}
          {header}
          <div className={css(styles.logViewerMain)} style={{ height, width }} ref={containerRef}>
            {loading ? <div>{loadingContent}</div> : createList(parsedData)}
          </div>
          {footer}
        </div>
      </LogViewerContext.Provider>
    );
  },
  areEqual
);

export const LogViewer = React.forwardRef((props: LogViewerProps, ref: React.Ref<any>) => (
  <LogViewerBase innerRef={ref as React.MutableRefObject<any>} {...props} />
));

LogViewer.displayName = 'LogViewer';
