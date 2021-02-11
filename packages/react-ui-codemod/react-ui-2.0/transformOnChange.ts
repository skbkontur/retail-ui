/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

interface CustomJSXElement {
  name: string;
  changes: Array<CustomChange>;
}

interface CustomChange {
  before: string;
  after: any;
  conditions: ChangeCondition;
}

enum ChangeCondition {
  'RemoveFirstParam',
  'Nothing',
}

const listOfComponents: Array<CustomJSXElement> = [
  {
    name: 'ComboBox',
    changes: [
      { before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam },
      { before: 'onInputChange', after: 'onInputValueChange', conditions: ChangeCondition.Nothing },
    ],
  },
  {
    name: 'CustomComboBox',
    changes: [
      { before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam },
      { before: 'onInputChange', after: 'onInputValueChange', conditions: ChangeCondition.Nothing },
    ],
  },
  {
    name: 'DateInput',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'DatePicker',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'DateSelect',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.Nothing }],
  },
  {
    name: 'Fias',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'FiasSearch',
    changes: [
      { before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam },
      { before: 'onInputChange', after: 'onInputValueChange', conditions: ChangeCondition.Nothing },
    ],
  },
  {
    name: 'RadioGroup',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'Select',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'Switcher',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'Tabs',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
  {
    name: 'TokenInput',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.Nothing }],
  },
  {
    name: 'Toggle',
    changes: [
      { before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.Nothing },
      { before: 'changeEventHandler', after: 'onChange', conditions: ChangeCondition.Nothing },
    ],
  },
  {
    name: 'Input',
    changes: [{ before: 'onChange', after: 'onValueChange', conditions: ChangeCondition.RemoveFirstParam }],
  },
];
const transformExpression = (api: API, node: any, change: CustomChange, report: () => void) => {
  const j = api.jscodeshift;
  let modified = true;
  switch (change.conditions) {
    case ChangeCondition.RemoveFirstParam: {
      const { expression } = node.value;
      if (expression.type === 'FunctionExpression' || expression.type === 'ArrowFunctionExpression') {
        if (expression.params && expression.params.length > 1) {
          const eventNode = node.value.expression.params[0];
          const using = j(node.value.expression.body)
            .find(j.Identifier)
            .some(nodePath => nodePath.value.name == eventNode.name && nodePath.name !== 'property');
          if (!using) {
            node.name = change.after;
            node.value.expression.params.shift();
          } else {
            report();
            modified = false;
          }
        } else {
          node.name = change.after;
        }
      } else {
        report();
        modified = false;
      }
      break;
    }
    case ChangeCondition.Nothing:
    default: {
      node.name = change.after;
      break;
    }
  }
  return { node, modified };
};

const transform = (file: FileInfo, api: API, JsxElement: CustomJSXElement) => {
  const j = api.jscodeshift;
  const result = j(file.source).findJSXElements(JsxElement.name);

  let modified = false;
  JsxElement.changes.forEach(change => {
    const jsxAttributeCollection = result.find(j.JSXAttribute, n => n.name.name === change.before);

    if (!jsxAttributeCollection.length) {
      return;
    }

    jsxAttributeCollection.forEach((node: any) => {
      const report = () => {
        api.report &&
          api.report(
            `${JsxElement.name}: can't transform "${change.before}" to "${change.after}". Please, try to do it manually.`,
          );
      };
      const transformResult = transformExpression(api, node.value, change, report);
      if (transformResult.modified) {
        node.value = transformResult.node;
        modified = transformResult.modified;
      }
    });
  });

  if (modified) {
    file.source = result.toSource();
  }

  return file;
};

export default function(fileInfo: FileInfo, api: API) {
  const originalSource = fileInfo.source;
  const result = listOfComponents.reduce((prev, cur) => {
    return transform(prev, api, cur);
  }, fileInfo);
  return result.source !== originalSource ? result.source : null;
}
