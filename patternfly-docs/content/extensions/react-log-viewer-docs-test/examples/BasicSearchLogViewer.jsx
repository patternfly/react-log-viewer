import React from 'react';
import { data } from '@ausuliv/react-log-viewer-docs-test/src/LogViewer/examples/realTestData';
import { LogViewer, LogViewerSearch } from '@ausuliv/react-log-viewer-docs-test';
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
