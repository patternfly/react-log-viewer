import React from 'react';
import { data } from './realTestData';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Banner } from '@patternfly/react-core';

const HeaderComponentLogViewer = () => (
    <LogViewer
      hasLineNumbers={false}
      height={300}
      data={data.data}
      theme="dark"
      header={<Banner>5019 lines</Banner>}
    />
  );

export default HeaderComponentLogViewer;