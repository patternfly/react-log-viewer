import React from 'react';
import { data } from '@ausuliv/react-log-viewer-docs-test/src/LogViewer/examples/realTestData';
import { LogViewer } from '@ausuliv/react-log-viewer-docs-test';
import { Banner } from '@patternfly/react-core';

HeaderComponentLogViewer = () => {
  return (
    <LogViewer
      hasLineNumbers={false}
      height={300}
      data={data.data}
      theme="dark"
      header={<Banner>5019 lines</Banner>}
    />
  );
};