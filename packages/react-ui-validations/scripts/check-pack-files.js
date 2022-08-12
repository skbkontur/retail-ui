const { readdirSync } = require('fs');

// these files must exist in the final pack
const FILES = ['CHANGELOG.md', 'index.d.ts', 'index.js', 'index.js.map', 'package.json', 'README.md'];
const REACT_UI_DIST = 'build/react-ui-dist';
const RETAIL_UI_DIST = 'build/retail-ui-dist';

describe('Publishing packs must contain the required files', () => {
  it('@skbkontur/react-ui', () => {
    expect(readdirSync(REACT_UI_DIST)).toEqual(FILES);
  });
  it('retail-ui', () => {
    expect(readdirSync(RETAIL_UI_DIST)).toEqual(FILES);
  });
});
