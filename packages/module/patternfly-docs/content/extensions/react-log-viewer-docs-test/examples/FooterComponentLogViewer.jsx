import React from 'react';
import { data } from './realTestData';
import { LogViewer, LogViewerContext } from '@ausuliv/react-log-viewer-docs-test';
import { Button } from '@patternfly/react-core';

FooterComponentLogViewer = () => {
  const logViewerRef = React.useRef();
  const FooterButton = () => {
    const handleClick = e => {
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