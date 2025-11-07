const { readdirSync } = require('fs');

// these files must exist in the final pack
const FILES = ['CHANGELOG.md', 'README.md', 'index.d.ts', 'index.js', 'index.js.map', 'package.json'].sort();
const REACT_UI_DIST = 'build/react-ui-dist';

describe('Publishing packs must contain the required files', () => {
  it('@skbkontur/react-ui', () => {
    expect(readdirSync(REACT_UI_DIST).sort()).toEqual(FILES);
  });
});
