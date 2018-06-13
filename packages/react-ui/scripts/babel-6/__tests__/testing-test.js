import { transform } from 'babel-core';
import jsxSyntaxPlugin from 'babel-plugin-syntax-jsx';
import testingPugin from '../testing.js';

function compile(input) {
  return transform(input, {
    plugins: [jsxSyntaxPlugin, testingPugin]
  }).code;
}

describe('testing plugin', () => {
  it('transforms tid', () => {
    const input = '<a tid="a" />;<b ref={refFn} tid={b} />;';
    const output =
      '<a tid="a" ref={global.ReactTesting.ref("a", null)} />;' +
      '<b tid={b} ref={global.ReactTesting.ref(b, refFn)} />;';

    expect(compile(input)).toBe(output);
  });

  it('transforms tid-pass', () => {
    const input = '<a tid-pass />;';
    const output = '<a ref={global.ReactTesting.pass(this)} />;';

    expect(compile(input)).toBe(output);
  });
});
