import React from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';

export const BasicSearchLogViewer = () => (
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
