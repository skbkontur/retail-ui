const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../useMenuPositions');

const componentNames = [
  'Autocomplete',
  'ComboBox',
  'DatePicker',
  'Dropdown',
  'Select',
  'ComboBoxView',
  'CustomComboBox',
];

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `<div>
    ${componentNames
      .map(
        (name) => `
      <div>
        <${name} menuPos="top" menuAlign="left" />
        <${name} menuAlign="left" />
        <${name} menuAlign="right" />
        <${name} menuPos="top" />
      </div>
    `,
      )
      .join('')}
  </div>`,
  `<div>
    ${componentNames
      .map(
        (name) => `
      <div>
        <${name} menuPositions={["top left"]} />
        <${name} menuPositions={["top left", "bottom left"]} />
        <${name} menuPositions={["top right", "bottom right"]} />
        <${name} menuPositions={["top left"]} />
      </div>
    `,
      )
      .join('')}
  </div>`,
  `transforms "menuPos" and "menuAlign" to "menuPositions" for all related components`,
);
