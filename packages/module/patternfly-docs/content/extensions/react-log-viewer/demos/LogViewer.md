---
id: Log viewer
beta: true
section: extensions
source: react-demos
---

import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import {
Badge,
Button,
Select,
SelectOption,
PageSection,
PageSectionVariants,
Tooltip,
Toolbar,
ToolbarContent,
ToolbarGroup,
ToolbarItem,
ToolbarToggleGroup
} from '@patternfly/react-core';
import { data } from '../examples/realTestData';
import { OutlinedPlayCircleIcon } from '@patternfly/react-icons';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import PauseIcon from '@patternfly/react-icons/dist/esm/icons/pause-icon';
import DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';
import PlayIcon from '@patternfly/react-icons/dist/esm/icons/play-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';

### With complex toolbar

```js file='./ComplexToolbarLogViewer.jsx'
```
