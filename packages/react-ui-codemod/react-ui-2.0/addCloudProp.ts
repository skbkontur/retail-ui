/* eslint-disable import/no-default-export */
import { API, FileInfo, JSXAttribute, JSXSpreadAttribute } from 'jscodeshift';

interface CustomJSXElement {
  name: string;
  attributes: Array<CustomAttributes>;
}

interface CustomAttributes {
  identifier: string;
  value: any;
}

const listOfAttributes = [
  {
    name: 'Loader',
    attributes: [{ identifier: 'cloud', value: true }],
  },
  {
    name: 'Spinner',
    attributes: [{ identifier: 'cloud', value: true }],
  },
];

const createAttribute = (api: API, identifier: string, value: any): JSXAttribute | JSXSpreadAttribute => {
  const j = api.jscodeshift;
  if (value === true) {
    return j.jsxAttribute(j.jsxIdentifier(identifier));
  }
  switch (typeof value) {
    case 'number':
      return j.jsxAttribute(j.jsxIdentifier(identifier), j.numericLiteral(value));
    case 'string':
    default:
      return j.jsxAttribute(j.jsxIdentifier(identifier), j.stringLiteral(value));
  }
};

function transform(file: FileInfo, api: API, JsxElement: CustomJSXElement) {
  const j = api.jscodeshift;
  let modified = false;

  const result = j(file.source)
    .findJSXElements(JsxElement.name)
    .forEach(element => {
      JsxElement.attributes.forEach(attr => {
        const attribute = createAttribute(api, attr.identifier, attr.value);
        element.value.openingElement.attributes.push(attribute);
        modified = true;
      });
    });
  if (modified) {
    file.source = result.toSource();
  }
  return file;
}

interface TransformOptions {
  /**
   * Имя компонента для добавления пропа. Если не передано, то проп добавится для всех релевантных компонентов
   */
  component: string;
}

export default function(fileInfo: FileInfo, api: API, options: TransformOptions) {
  const { component } = options;
  const originalSource = fileInfo.source;
  const componentsToTransform = component ? listOfAttributes.filter(c => c.name === component) : listOfAttributes;
  const result = componentsToTransform.reduce((prev, cur) => {
    return transform(prev, api, cur);
  }, fileInfo);
  return originalSource !== result.source ? result.source : null;
}
