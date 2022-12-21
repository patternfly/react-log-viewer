/* eslint-disable no-console */
import React from 'react';
import { data } from './realTestData';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import { Toolbar, ToolbarContent, ToolbarItem, Button, Checkbox } from '@patternfly/react-core';

const CustomControlLogViewer = () => {
  const [isTextWrapped, setIsTextWrapped] = React.useState(false);
  const onActionClick = () => {
    console.log('clicked test action button');
  };

  const onPrintClick = () => {
    console.log('clicked console print button');
  };

  return (
    <LogViewer
      data={data.data}
      isTextWrapped={isTextWrapped}
      toolbar={
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Button onClick={onActionClick} variant="control">
                Test Action
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <LogViewerSearch placeholder="Search" />
            </ToolbarItem>
            <ToolbarItem>
              <Button onClick={onPrintClick} variant="control">
                Print to Console
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Checkbox label="Wrap text" aria-label="wrap text checkbox" isChecked={isTextWrapped} id="wrap-text-checkbox" onChange={setIsTextWrapped} />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      }
    />
  );
};

export default CustomControlLogViewer;