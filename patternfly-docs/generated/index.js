module.exports = {
  '/extensions/log-viewer/react-demos': {
    id: "Log viewer",
    title: "Log viewer",
    toc: [[{"text":"With complex toolbar"}]],
    examples: ["With complex toolbar"],
    section: "extensions",
    source: "react-demos",
    Component: () => import(/* webpackChunkName: "extensions/log-viewer/react-demos/index" */ './extensions/log-viewer/react-demos')
  },
  '/extensions/log-viewer/design-guidelines': {
    id: "Log viewer",
    title: "Log viewer",
    toc: [{"text":"Light theme log viewer"},{"text":"Dark theme log viewer"},{"text":"Usability"},{"text":"Log viewer functionality"},[{"text":"With popover"},{"text":"With dropdown, drilldown, and search expanded"},{"text":"With search results"}]],
    section: "extensions",
    source: "design-guidelines",
    Component: () => import(/* webpackChunkName: "extensions/log-viewer/design-guidelines/index" */ './extensions/log-viewer/design-guidelines')
  },
  '/extensions/log-viewer/react': {
    id: "Log viewer",
    title: "Log viewer",
    toc: [{"text":"Examples"},[{"text":"Basic"},{"text":"With search"},{"text":"With complex toolbar"},{"text":"With header component"},{"text":"With footer component"},{"text":"With ANSI color logs"}]],
    examples: ["Basic","With search","With complex toolbar","With header component","With footer component","With ANSI color logs"],
    section: "extensions",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/log-viewer/react/index" */ './extensions/log-viewer/react')
  }
};