---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
# Sidenav secondary level section
# should be the same for all markdown files
id: Log viewer
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
beta: true
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provdided in patternfly-docs.source.js
propComponents: [LogViewer, LogViewerSearch]
---

import { LogViewer, LogViewerSearch, LogViewerContext } from '@patternfly/react-log-viewer';
import { Button, Checkbox, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { data } from './realTestData';

## Examples

### Basic

```js file='./BasicLogViewer.jsx'
```

### With search

```js file='./BasicSearchLogViewer.jsx'
```

### With complex toolbar

```js file='./CustomControlLogViewer.jsx'
```

### With header component

```js file='./HeaderComponentLogViewer.jsx'
```

### With footer component

```js file='./FooterComponentLogViewer.jsx'
```

### With ANSI color logs

```js file='./ANSIColorLogViewer.jsx'
```
