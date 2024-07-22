/* eslint-disable import/no-default-export */
import { API, FileInfo, JSXAttribute } from 'jscodeshift';

function getLiteralValue(attribute: null | JSXAttribute) {
  if (attribute === null) {
    return null;
  }

  const { value } = attribute;

  if (value === null || value === undefined) {
    return null;
  }

  if (value.type === 'Literal') {
    return value.value;
  }

  return null;
}

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source);

  ['Autocomplete', 'ComboBox', 'DatePicker', 'Dropdown', 'Select', 'ComboBoxView', 'CustomComboBox'].map(
    modifyComponent,
  );

  function getMenuPositionsAttribute(menuPos: null | JSXAttribute, menuAlign: null | JSXAttribute) {
    const attribute = menuPos ?? menuAlign;
    const value = attribute?.value;

    if (attribute === null || value === null || value === undefined) {
      throw new Error('Unexpected null');
    }

    const newValue = j.jsxExpressionContainer(value);
    const verticalPosition = getLiteralValue(menuPos) ?? 'bottom';
    const horizontalPosition = getLiteralValue(menuAlign) ?? 'left';
    const menuPosition = `${verticalPosition} ${horizontalPosition}`;

    attribute.value = newValue;
    attribute.name.name = 'menuPositions';
    newValue.expression = j.arrayExpression([j.literal(menuPosition)]);

    return attribute;
  }

  function modifyComponent(name: string) {
    const elements = result.findJSXElements(name);

    return elements.forEach((path) => {
      let menuPos: null | JSXAttribute = null;
      let menuAlign: null | JSXAttribute = null;
      const { openingElement } = path.value;
      const { attributes = [] } = openingElement;

      openingElement.attributes = attributes.filter((attribute) => {
        if (attribute.type !== 'JSXAttribute') {
          return true;
        }

        if (attribute.name.name === 'menuPos') {
          menuPos = attribute;

          return false;
        } else if (attribute.name.name === 'menuAlign') {
          menuAlign = attribute;

          return false;
        }

        return true;
      });

      if ((menuPos ?? menuAlign) === null) {
        return;
      }

      openingElement.attributes.push(getMenuPositionsAttribute(menuPos, menuAlign));
      modified = true;
    });
  }

  if (modified) {
    return result.toSource({ lineTerminator: '\n' });
  }
}
