module.exports = {
  branches: [
    { name: 'v4', channel: 'prerelease' },
    { name: 'main', channel: 'alpha', prerelease: 'alpha' }
  ],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'prerelease-v${version}'
};
