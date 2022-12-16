import React from 'react';
import { data } from './realTestData';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Checkbox } from '@patternfly/react-core';

const BasicLogViewer = () => {
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

export default BasicLogViewer;