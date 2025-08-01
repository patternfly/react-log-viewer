import { useState, useRef, useEffect, Fragment } from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import {
  Badge,
  Button,
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
  Tooltip,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup
} from '@patternfly/react-core';
import OutlinedPlayCircleIcon from '@patternfly/react-icons/dist/esm/icons/outlined-play-circle-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import PauseIcon from '@patternfly/react-icons/dist/esm/icons/pause-icon';
import PlayIcon from '@patternfly/react-icons/dist/esm/icons/play-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';

export const ComplexToolbarLogViewer = () => {
  const dataSources = {
    'container-1': { type: 'C', id: 'data1' },
    'container-2': { type: 'D', id: 'data2' },
    'container-3': { type: 'E', id: 'data3' }
  };
  const [isPaused, setIsPaused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [currentItemCount, setCurrentItemCount] = useState(0);
  const [renderData, setRenderData] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState('container-1');
  const [selectDataSourceOpen, setSelectDataSourceOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [selectedData, setSelectedData] = useState(data[dataSources[selectedDataSource].id].split('\n'));
  const [buffer, setBuffer] = useState([]);
  const [linesBehind, setLinesBehind] = useState(0);
  const logViewerRef = useRef(null);

  useEffect(() => {
    setTimer(
      window.setInterval(() => {
        setItemCount((itemCount) => itemCount + 1);
      }, 500)
    );
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (itemCount > selectedData.length) {
      window.clearInterval(timer);
    } else {
      setBuffer(selectedData.slice(0, itemCount));
    }
  }, [itemCount]);

  useEffect(() => {
    if (!isPaused && buffer.length > 0) {
      setCurrentItemCount(buffer.length);
      setRenderData(buffer.join('\n'));
      if (logViewerRef && logViewerRef.current) {
        logViewerRef.current.scrollToBottom();
      }
    } else if (buffer.length !== currentItemCount) {
      setLinesBehind(buffer.length - currentItemCount);
    } else {
      setLinesBehind(0);
    }
  }, [isPaused, buffer]);

  // Listening escape key on full screen mode.
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      setIsFullScreen(!!isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const onExpandClick = (_event) => {
    const element = document.querySelector('#complex-toolbar-demo');

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const onDownloadClick = () => {
    const element = document.createElement('a');
    const dataToDownload = [data[dataSources[selectedDataSource].id]];
    const file = new Blob(dataToDownload, { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDataSource}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const onToggleClick = () => {
    setSelectDataSourceOpen(!selectDataSourceOpen);
  };

  const onScroll = ({ scrollOffsetToBottom, _scrollDirection, scrollUpdateWasRequested }) => {
    if (!scrollUpdateWasRequested) {
      if (scrollOffsetToBottom > 0) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    }
  };

  const selectDataSourceMenu = Object.entries(dataSources).map(([value, { type }]) => (
    <SelectOption
      key={value}
      value={value}
      isSelected={selectedDataSource === value}
      isChecked={selectedDataSource === value}
    >
      <Badge key={value}>{type}</Badge>
      {` ${value}`}
    </SelectOption>
  ));

  const selectDataSourcePlaceholder = (
    <Fragment>
      <Badge>{dataSources[selectedDataSource].type}</Badge>
      {` ${selectedDataSource}`}
    </Fragment>
  );

  const ControlButton = () => (
    <Button
      variant="link"
      onClick={() => {
        setIsPaused(!isPaused);
      }}
      icon={isPaused ? <PlayIcon /> : <PauseIcon />}
    >
      {isPaused ? ` Resume log` : ` Pause log`}
    </Button>
  );

  const toggle = (toggleRef) => (
    <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={selectDataSourceOpen}>
      {selectDataSourcePlaceholder}
    </MenuToggle>
  );

  const leftAlignedToolbarGroup = (
    <Fragment>
      <ToolbarToggleGroup toggleIcon={<EllipsisVIcon />} breakpoint="md">
        <ToolbarItem>
          <Select
            toggle={toggle}
            onOpenChange={(isOpen) => setSelectDataSourceOpen(isOpen)}
            onSelect={(event, selection) => {
              setSelectDataSourceOpen(false);
              setSelectedDataSource(selection);
              setSelectedData(data[dataSources[selection].id].split('\n'));
              setLinesBehind(0);
              setBuffer([]);
              setItemCount(1);
              setCurrentItemCount(0);
            }}
            selections={selectedDataSource}
            isOpen={selectDataSourceOpen}
            placeholderText={selectDataSourcePlaceholder}
          >
            <SelectList>{selectDataSourceMenu}</SelectList>
          </Select>
        </ToolbarItem>
        <ToolbarItem>
          <LogViewerSearch onFocus={(_e) => setIsPaused(true)} placeholder="Search" />
        </ToolbarItem>
      </ToolbarToggleGroup>
      <ToolbarItem>
        <ControlButton />
      </ToolbarItem>
    </Fragment>
  );

  const rightAlignedToolbarGroup = (
    <Fragment>
      <ToolbarGroup variant="icon-button-group">
        <ToolbarItem>
          <Tooltip position="top" content={<div>Download</div>}>
            <Button onClick={onDownloadClick} variant="plain" aria-label="Download current logs">
              <DownloadIcon />
            </Button>
          </Tooltip>
        </ToolbarItem>
        <ToolbarItem>
          <Tooltip position="top" content={<div>Expand</div>}>
            <Button onClick={onExpandClick} variant="plain" aria-label="View log viewer in full screen">
              <ExpandIcon />
            </Button>
          </Tooltip>
        </ToolbarItem>
      </ToolbarGroup>
    </Fragment>
  );

  const FooterButton = () => {
    const handleClick = (_e) => {
      setIsPaused(false);
    };
    return (
      <Button onClick={handleClick} isBlock>
        <OutlinedPlayCircleIcon />
        resume {linesBehind === 0 ? null : `and show ${linesBehind} lines`}
      </Button>
    );
  };
  return (
    <LogViewer
      data={renderData}
      id="complex-toolbar-demo"
      scrollToRow={currentItemCount}
      innerRef={logViewerRef}
      height={isFullScreen ? '100%' : 600}
      toolbar={
        <Toolbar>
          <ToolbarContent>
            <ToolbarGroup align={{ default: 'alignLeft' }}>{leftAlignedToolbarGroup}</ToolbarGroup>
            <ToolbarGroup align={{ default: 'alignRight' }}>{rightAlignedToolbarGroup}</ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      }
      overScanCount={10}
      footer={isPaused && <FooterButton />}
      onScroll={onScroll}
    />
  );
};
