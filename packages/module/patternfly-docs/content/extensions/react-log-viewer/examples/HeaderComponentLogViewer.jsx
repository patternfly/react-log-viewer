import React from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Banner } from '@patternfly/react-core';

export const HeaderComponentLogViewer = () => (
  <LogViewer
    hasLineNumbers={false}
    height={300}
    data={data.data}
    theme="dark"
    header={<Banner>5019 lines</Banner>}
  />
);
