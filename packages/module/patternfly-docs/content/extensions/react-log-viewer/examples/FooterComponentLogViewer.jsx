import React from 'react';
import { data } from './realTestData';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Button } from '@patternfly/react-core';

const FooterComponentLogViewer = () => {
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

export default FooterComponentLogViewer;