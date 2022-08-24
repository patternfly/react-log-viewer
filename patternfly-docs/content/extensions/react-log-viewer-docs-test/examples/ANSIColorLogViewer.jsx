import React from 'react';
import { data } from '@ausuliv/react-log-viewer-docs-test/src/LogViewer/examples/realTestData.js';
import { LogViewer } from '@ausuliv/react-log-viewer-docs-test';

ANSIColorLogViewer = () => {
  return (
    <LogViewer
      hasLineNumbers={false}
      height={300}
      data={data.data4}
      theme="dark"
    />
  );
};