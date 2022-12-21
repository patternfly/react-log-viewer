import React from 'react';
import { data } from './realTestData.js';
import { LogViewer } from '@patternfly/react-log-viewer';

const ANSIColorLogViewer = () => (
    <LogViewer
      hasLineNumbers={false}
      height={300}
      data={data.data4}
      theme="dark"
    />
  );

  export default ANSIColorLogViewer;