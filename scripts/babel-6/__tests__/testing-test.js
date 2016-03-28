import {transform} from 'babel-core';
import jsxSyntaxPlugin from 'babel-preset-react/node_modules/babel-plugin-syntax-jsx';
import testingPugin from '../testing.js';

describe('testing plugin', () => {
  it('transforms tid', () => {
    const input = '<a tid="a" />;<b tid={b} />;';

    const output = transform(input, {
      plugins: [jsxSyntaxPlugin, testingPugin],
    }).code;
    const expected = '<a ref={global.ReactTesting.ref("a")} />;' +
      '<b ref={global.ReactTesting.ref(b)} />;';
    expect(output).toBe(expected);
  });
});
