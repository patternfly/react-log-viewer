import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
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
const pageData = {
  "id": "Log viewer",
  "section": "extensions",
  "subsection": "",
  "deprecated": false,
  "template": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "react-demos",
  "tabName": null,
  "slug": "/extensions/log-viewer/react-demos",
  "sourceLink": "https://github.com/patternfly/patternfly-react/blob/main/packages/module/patternfly-docs/content/extensions/react-log-viewer/demos/LogViewer.md",
  "relPath": "packages/module/patternfly-docs/content/extensions/react-log-viewer/demos/LogViewer.md",
  "examples": [
    "With complex toolbar"
  ]
};
pageData.liveContext = {
  useState,
  useRef,
  useEffect,
  Fragment,
  data,
  LogViewer,
  LogViewerSearch,
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
  ToolbarToggleGroup,
  OutlinedPlayCircleIcon,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  EllipsisVIcon,
  DownloadIcon
};
pageData.examples = {
  'With complex toolbar': props => 
    <Example {...pageData} {...props} {...{"code":"import { useState, useRef, useEffect, Fragment } from 'react';\nimport { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';\nimport { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';\nimport {\n  Badge,\n  Button,\n  MenuToggle,\n  Select,\n  SelectList,\n  SelectOption,\n  Tooltip,\n  Toolbar,\n  ToolbarContent,\n  ToolbarGroup,\n  ToolbarItem,\n  ToolbarToggleGroup\n} from '@patternfly/react-core';\nimport OutlinedPlayCircleIcon from '@patternfly/react-icons/dist/esm/icons/outlined-play-circle-icon';\nimport ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';\nimport PauseIcon from '@patternfly/react-icons/dist/esm/icons/pause-icon';\nimport PlayIcon from '@patternfly/react-icons/dist/esm/icons/play-icon';\nimport EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';\nimport DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';\n\nexport const ComplexToolbarLogViewer = () => {\n  const dataSources = {\n    'container-1': { type: 'C', id: 'data1' },\n    'container-2': { type: 'D', id: 'data2' },\n    'container-3': { type: 'E', id: 'data3' }\n  };\n  const [isPaused, setIsPaused] = useState(false);\n  const [isFullScreen, setIsFullScreen] = useState(false);\n  const [itemCount, setItemCount] = useState(1);\n  const [currentItemCount, setCurrentItemCount] = useState(0);\n  const [renderData, setRenderData] = useState('');\n  const [selectedDataSource, setSelectedDataSource] = useState('container-1');\n  const [selectDataSourceOpen, setSelectDataSourceOpen] = useState(false);\n  const [timer, setTimer] = useState(null);\n  const [selectedData, setSelectedData] = useState(data[dataSources[selectedDataSource].id].split('\\n'));\n  const [buffer, setBuffer] = useState([]);\n  const [linesBehind, setLinesBehind] = useState(0);\n  const logViewerRef = useRef(null);\n\n  useEffect(() => {\n    setTimer(\n      window.setInterval(() => {\n        setItemCount((itemCount) => itemCount + 1);\n      }, 500)\n    );\n    return () => {\n      window.clearInterval(timer);\n    };\n  }, []);\n\n  useEffect(() => {\n    if (itemCount > selectedData.length) {\n      window.clearInterval(timer);\n    } else {\n      setBuffer(selectedData.slice(0, itemCount));\n    }\n  }, [itemCount]);\n\n  useEffect(() => {\n    if (!isPaused && buffer.length > 0) {\n      setCurrentItemCount(buffer.length);\n      setRenderData(buffer.join('\\n'));\n      if (logViewerRef && logViewerRef.current) {\n        logViewerRef.current.scrollToBottom();\n      }\n    } else if (buffer.length !== currentItemCount) {\n      setLinesBehind(buffer.length - currentItemCount);\n    } else {\n      setLinesBehind(0);\n    }\n  }, [isPaused, buffer]);\n\n  // Listening escape key on full screen mode.\n  useEffect(() => {\n    const handleFullscreenChange = () => {\n      const isFullscreen =\n        document.fullscreenElement ||\n        document.mozFullScreenElement ||\n        document.webkitFullscreenElement ||\n        document.msFullscreenElement;\n\n      setIsFullScreen(!!isFullscreen);\n    };\n\n    document.addEventListener('fullscreenchange', handleFullscreenChange);\n    document.addEventListener('mozfullscreenchange', handleFullscreenChange);\n    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);\n    document.addEventListener('msfullscreenchange', handleFullscreenChange);\n\n    return () => {\n      document.removeEventListener('fullscreenchange', handleFullscreenChange);\n      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);\n      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);\n      document.removeEventListener('msfullscreenchange', handleFullscreenChange);\n    };\n  }, []);\n\n  const onExpandClick = (_event) => {\n    const element = document.querySelector('#complex-toolbar-demo');\n\n    if (!isFullScreen) {\n      if (element.requestFullscreen) {\n        element.requestFullscreen();\n      } else if (element.mozRequestFullScreen) {\n        element.mozRequestFullScreen();\n      } else if (element.webkitRequestFullScreen) {\n        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);\n      }\n      setIsFullScreen(true);\n    } else {\n      if (document.exitFullscreen) {\n        document.exitFullscreen();\n      } else if (document.webkitExitFullscreen) {\n        /* Safari */\n        document.webkitExitFullscreen();\n      } else if (document.msExitFullscreen) {\n        /* IE11 */\n        document.msExitFullscreen();\n      }\n      setIsFullScreen(false);\n    }\n  };\n\n  const onDownloadClick = () => {\n    const element = document.createElement('a');\n    const dataToDownload = [data[dataSources[selectedDataSource].id]];\n    const file = new Blob(dataToDownload, { type: 'text/plain' });\n    element.href = URL.createObjectURL(file);\n    element.download = `${selectedDataSource}.txt`;\n    document.body.appendChild(element);\n    element.click();\n    document.body.removeChild(element);\n  };\n\n  const onToggleClick = () => {\n    setSelectDataSourceOpen(!selectDataSourceOpen);\n  };\n\n  const onScroll = ({ scrollOffsetToBottom, _scrollDirection, scrollUpdateWasRequested }) => {\n    if (!scrollUpdateWasRequested) {\n      if (scrollOffsetToBottom > 0) {\n        setIsPaused(true);\n      } else {\n        setIsPaused(false);\n      }\n    }\n  };\n\n  const selectDataSourceMenu = Object.entries(dataSources).map(([value, { type }]) => (\n    <SelectOption\n      key={value}\n      value={value}\n      isSelected={selectedDataSource === value}\n      isChecked={selectedDataSource === value}\n    >\n      <Badge key={value}>{type}</Badge>\n      {` ${value}`}\n    </SelectOption>\n  ));\n\n  const selectDataSourcePlaceholder = (\n    <Fragment>\n      <Badge>{dataSources[selectedDataSource].type}</Badge>\n      {` ${selectedDataSource}`}\n    </Fragment>\n  );\n\n  const ControlButton = () => (\n    <Button\n      variant=\"link\"\n      onClick={() => {\n        setIsPaused(!isPaused);\n      }}\n      icon={isPaused ? <PlayIcon /> : <PauseIcon />}\n    >\n      {isPaused ? ` Resume log` : ` Pause log`}\n    </Button>\n  );\n\n  const toggle = (toggleRef) => (\n    <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={selectDataSourceOpen}>\n      {selectDataSourcePlaceholder}\n    </MenuToggle>\n  );\n\n  const leftAlignedToolbarGroup = (\n    <Fragment>\n      <ToolbarToggleGroup toggleIcon={<EllipsisVIcon />} breakpoint=\"md\">\n        <ToolbarItem>\n          <Select\n            toggle={toggle}\n            onOpenChange={(isOpen) => setSelectDataSourceOpen(isOpen)}\n            onSelect={(event, selection) => {\n              setSelectDataSourceOpen(false);\n              setSelectedDataSource(selection);\n              setSelectedData(data[dataSources[selection].id].split('\\n'));\n              setLinesBehind(0);\n              setBuffer([]);\n              setItemCount(1);\n              setCurrentItemCount(0);\n            }}\n            selections={selectedDataSource}\n            isOpen={selectDataSourceOpen}\n            placeholderText={selectDataSourcePlaceholder}\n          >\n            <SelectList>{selectDataSourceMenu}</SelectList>\n          </Select>\n        </ToolbarItem>\n        <ToolbarItem>\n          <LogViewerSearch onFocus={(_e) => setIsPaused(true)} placeholder=\"Search\" />\n        </ToolbarItem>\n      </ToolbarToggleGroup>\n      <ToolbarItem>\n        <ControlButton />\n      </ToolbarItem>\n    </Fragment>\n  );\n\n  const rightAlignedToolbarGroup = (\n    <Fragment>\n      <ToolbarGroup variant=\"icon-button-group\">\n        <ToolbarItem>\n          <Tooltip position=\"top\" content={<div>Download</div>}>\n            <Button onClick={onDownloadClick} variant=\"plain\" aria-label=\"Download current logs\">\n              <DownloadIcon />\n            </Button>\n          </Tooltip>\n        </ToolbarItem>\n        <ToolbarItem>\n          <Tooltip position=\"top\" content={<div>Expand</div>}>\n            <Button onClick={onExpandClick} variant=\"plain\" aria-label=\"View log viewer in full screen\">\n              <ExpandIcon />\n            </Button>\n          </Tooltip>\n        </ToolbarItem>\n      </ToolbarGroup>\n    </Fragment>\n  );\n\n  const FooterButton = () => {\n    const handleClick = (_e) => {\n      setIsPaused(false);\n    };\n    return (\n      <Button onClick={handleClick} isBlock>\n        <OutlinedPlayCircleIcon />\n        resume {linesBehind === 0 ? null : `and show ${linesBehind} lines`}\n      </Button>\n    );\n  };\n  return (\n    <LogViewer\n      data={renderData}\n      id=\"complex-toolbar-demo\"\n      scrollToRow={currentItemCount}\n      innerRef={logViewerRef}\n      height={isFullScreen ? '100%' : 600}\n      toolbar={\n        <Toolbar>\n          <ToolbarContent>\n            <ToolbarGroup align={{ default: 'alignLeft' }}>{leftAlignedToolbarGroup}</ToolbarGroup>\n            <ToolbarGroup align={{ default: 'alignRight' }}>{rightAlignedToolbarGroup}</ToolbarGroup>\n          </ToolbarContent>\n        </Toolbar>\n      }\n      overScanCount={10}\n      footer={isPaused && <FooterButton />}\n      onScroll={onScroll}\n    />\n  );\n};\n","title":"With complex toolbar","lang":"js","className":""}}>
      
    </Example>
};

const Component = () => (
  <React.Fragment>
    {React.createElement(pageData.examples["With complex toolbar"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsLogViewerReactDemosDocs';
Component.pageData = pageData;

export default Component;
