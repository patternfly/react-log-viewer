---
id: Log viewer
section: extensions
source: react-demos
---

import { data } from '@patternfly/react-log-viewer/patternfly-docs/content/extensions/react-log-viewer/examples/realTestData.js';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import {
Badge,
Button,
MenuToggle,
Select,
SelectList,
SelectOption,
Tooltip,
Toolbar,
ToolbarContent,
ToolbarGroup,
ToolbarItem,
ToolbarToggleGroup
} from '@patternfly/react-core';
import OutlinedPlayCircleIcon from '@patternfly/react-icons/dist/esm/icons/outlined-play-circle-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import PauseIcon from '@patternfly/react-icons/dist/esm/icons/pause-icon';
import PlayIcon from '@patternfly/react-icons/dist/esm/icons/play-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';

### With complex toolbar

```js file='./ComplexToolbarLogViewer.jsx'
```
