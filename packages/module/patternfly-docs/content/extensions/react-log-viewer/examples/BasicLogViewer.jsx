import { useState, Fragment } from 'react';
import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer } from '@patternfly/react-log-viewer';
import { Checkbox } from '@patternfly/react-core';

export const BasicLogViewer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <Fragment>
      <Checkbox
        label="Dark theme"
        isChecked={isDarkTheme}
        onChange={(_event, value) => setIsDarkTheme(value)}
        aria-label="toggle dark theme checkbox"
        id="toggle-dark-theme"
        name="toggle-dark-theme"
      />
      <LogViewer hasLineNumbers={false} height={300} data={data.data} theme={isDarkTheme ? 'dark' : 'light'} />
    </Fragment>
  );
};
