import React from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer } from '@patternfly/react-log-viewer';

export const ANSIColorLogViewer = () => (
  <LogViewer
    hasLineNumbers={false}
    height={300}
    data={data.data4}
    theme="dark"
  />
);
