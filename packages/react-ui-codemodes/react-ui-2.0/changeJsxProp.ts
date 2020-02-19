/* eslint-disable import/no-default-export */
import { API, FileInfo, MemberExpression, ASTPath } from 'jscodeshift';

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
  'AddParam',
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
    name: 'Input',
    changes: [{ before: 'onUnexpectedInput', after: 'onUnexpectedInput', conditions: ChangeCondition.AddParam }],
  },
  {
    name: 'MaskedInput',
    changes: [{ before: 'onUnexpectedInput', after: 'onUnexpectedInput', conditions: ChangeCondition.AddParam }],
  },
];
const transformExpression = (api: API, node: any, change: CustomChange) => {
  const j = api.jscodeshift;
  switch (change.conditions) {
    case ChangeCondition.RemoveFirstParam: {
      if (node.value.expression.params && node.value.expression.params.length > 1) {
        node.name = change.after;
        node.value.expression.params.shift();
      }
      break;
    }
    case ChangeCondition.AddParam: {
      node.name = change.after;
      if (node.value.expression.params) {
        const ident = j.identifier('value');
        node.value.expression.params.push(ident);
      }
      break;
    }
    case ChangeCondition.Nothing:
    default: {
      node.name = change.after;
      break;
    }
  }
  return node;
};

const transform = (file: FileInfo, api: API, JsxElement: CustomJSXElement) => {
  const j = api.jscodeshift;
  const result = j(file.source).findJSXElements(JsxElement.name);

  JsxElement.changes.forEach(change => {
    result
      .find(j.JSXAttribute, n => n.name.name === change.before)
      .forEach((node: any) => {
        node.value = transformExpression(api, node.value, change);
      });
  });

  file.source = result.toSource();

  return file;
};

export default function(fileInfo: FileInfo, api: API) {
  const result = listOfComponents.reduce((prev, cur) => {
    return transform(prev, api, cur);
  }, fileInfo);
  return result.source;
}
