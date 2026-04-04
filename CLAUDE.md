# react-log-viewer

A virtualized React component for viewing, searching, and filtering application logs. Built with React, TypeScript, PatternFly, Webpack, and memoize-one (for virtualization).

## Structure

- `packages/module/src/react-window/` - Forked react-window for custom virtualization
- `packages/module/src/LogViewer/` - Log viewer components and custom CSS (additional to PatternFly)
- `packages/module/patternfly-docs/content/extensions/react-log-viewer/` - MD files, live code examples, design guidelines, and documentation content

## Key Files

- Library package: `packages/module/package.json`
- Setup instructions: `/README.md`
- Main component: `packages/module/src/LogViewer/LogViewer.tsx`
- Monorepo root: `package.json`

## Commands

```bash
yarn build          # Build the library
yarn test           # Run unit tests
yarn lint           # Lint the codebase
```

For accessibility testing:
```bash
yarn build:docs && yarn serve:docs  # Start docs server
yarn test:a11y                       # Run a11y tests (in separate terminal)
```

## Important Context

- **Uses forked react-window** for custom virtualization needs
- **Large log files require virtualization** - performance is critical for handling large datasets

## More Info

See [BOOKMARKS.md](BOOKMARKS.md) for react-window, virtualization, and PatternFly documentation.
