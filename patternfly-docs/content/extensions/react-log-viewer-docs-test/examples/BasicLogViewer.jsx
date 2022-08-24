import React from 'react';
import { data } from '@ausuliv/react-log-viewer-docs-test/src/LogViewer/examples/realTestData';
import { LogViewer } from '@ausuliv/react-log-viewer-docs-test';
import { Checkbox } from '@patternfly/react-core';

BasicLogViewer = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  return (
    <React.Fragment>
      <Checkbox
        label="Dark theme"
        isChecked={isDarkTheme}
        onChange={setIsDarkTheme}
        aria-label="toggle dark theme checkbox"
        id="toggle-dark-theme"
        name="toggle-dark-theme"
      />
      <LogViewer hasLineNumbers={false} height={300} data={data.data} theme={isDarkTheme ? 'dark' : 'light'} />
    </React.Fragment>
  );
};
