import React from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Button } from '@patternfly/react-core';

export const FooterComponentLogViewer = () => {
  const logViewerRef = React.useRef();
  const FooterButton = () => {
    const handleClick = () => {
      logViewerRef.current.scrollToBottom();
    };
    return <Button onClick={handleClick}>Jump to the bottom</Button>;
  };

  return (
    <LogViewer
      ref={logViewerRef}
      hasLineNumbers={false}
      height={300}
      data={data.data}
      theme="dark"
      footer={<FooterButton />}
    />
  );
};
