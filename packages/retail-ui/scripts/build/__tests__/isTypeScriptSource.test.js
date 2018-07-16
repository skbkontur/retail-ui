const { isTypeScriptSource } = require('../isTypeScriptSource');

const TestCases = [
  ['Gapped.tsx', true],
  ['Gapped.d.ts', false],
  ['index.tsx', true],
  ['index.d.ts', false],
  ['ComboBoxOld.tsx', true],
  ['ComboBoxOld.d.ts', false]
];

TestCases.forEach(([filename, result]) => {
  test(`${filename} should be ${result}`, () => {
    expect(isTypeScriptSource(filename)).toBe(result);
  });
});
