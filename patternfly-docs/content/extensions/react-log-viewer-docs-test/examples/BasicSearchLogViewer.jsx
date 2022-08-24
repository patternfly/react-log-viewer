import React from 'react';
import { data } from '@patternfly/react-log-viewer/src/LogViewer/examples/realTestData';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';

BasicSearchLogViewer = () => {
  return (
    <LogViewer
      data={data.data}
      toolbar={
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <LogViewerSearch placeholder="Search value" />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      }
    />
  );
};
