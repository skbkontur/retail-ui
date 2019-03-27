function patchIconToNamedIcon({ j, path, nameAttr, nameAttrIndex, iconName, consequentIconName, alternateIconName }) {
  if (isSimpleIcon(nameAttr)) {
    path.node.name.name = `${iconName}Icon`;
    path.node.attributes.splice(nameAttrIndex, 1);
  } else if (isTernaryIcon(nameAttr)) {
    path.node.attributes.splice(nameAttrIndex, 1);
    const conditionalExpression = j.conditionalExpression(
      nameAttr.value.expression.test,
      j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier(`${consequentIconName}Icon`), path.node.attributes, true)),
      j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier(`${alternateIconName}Icon`), path.node.attributes, true)),
    );
    if (path.parent.parent.node.type === 'JSXExpressionContainer') {
      path.parent.parent.node.expression = conditionalExpression;
    } else {
      const iconNodeIndex = path.parent.parent.node.children.findIndex(child => child === path.parent.node);

      path.parent.parent.node.children[iconNodeIndex] = j.jsxExpressionContainer(conditionalExpression);
    }
  }
}

function patchIconToNamespace({ j, path, nameAttr, nameAttrIndex, iconName }) {
  if (!nameAttr) return;

  if (isSimpleIcon(nameAttr)) {
    path.node.name = j.jsxMemberExpression(j.jsxIdentifier('Icon'), j.jsxIdentifier(iconName));
    path.node.attributes.splice(nameAttrIndex, 1);
  }
}

function patchIconPropToNamedIcon({ j, iconAttr, iconName, consequentIconName, alternateIconName }) {
  if (isSimpleIcon(iconAttr)) {
    iconAttr.value = j.jsxExpressionContainer(
      j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier(`${iconName}Icon`), [], true)),
    );
  } else if (isTernaryIcon(iconAttr)) {
    iconAttr.value.expression.consequent = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier(`${consequentIconName}Icon`), [], true),
    );
    iconAttr.value.expression.alternate = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier(`${alternateIconName}Icon`), [], true),
    );
  } else if (
    iconAttr.value &&
    iconAttr.value.expression &&
    iconAttr.value.expression.type === 'ConditionalExpression' &&
    iconAttr.value.expression.consequent &&
    (iconAttr.value.expression.consequent.type === 'StringLiteral' ||
      iconAttr.value.expression.consequent.type === 'Literal')
  ) {
    iconAttr.value.expression.consequent = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier(`${iconAttr.value.expression.consequent.value}Icon`), [], true),
    );
  } else if (
    iconAttr.value &&
    iconAttr.value.expression &&
    iconAttr.value.expression.type === 'ConditionalExpression' &&
    iconAttr.value.expression.alternate &&
    (iconAttr.value.expression.alternate.type === 'StringLiteral' ||
      iconAttr.value.expression.alternate.type === 'Literal')
  ) {
    iconAttr.value.expression.alternate = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier(`${iconAttr.value.expression.alternate.value}Icon`), [], true),
    );
  }
}

function patchIconPropToSimpleIcon({ j, iconAttr, iconName, expressionIconValue }) {
  if (isSimpleIcon(iconAttr)) {
    iconAttr.value = j.jsxExpressionContainer(
      j.jsxElement(
        j.jsxOpeningElement(j.jsxMemberExpression(j.jsxIdentifier('Icon'), j.jsxIdentifier(iconName)), [], true),
      ),
    );
  } else if (isTernaryIcon(iconAttr)) {
    iconAttr.value = j.jsxExpressionContainer(
      j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier('Icon'),
          [j.jsxAttribute(j.jsxIdentifier('name'), expressionIconValue)],
          true,
        ),
      ),
    );
  } else if (
    iconAttr.value &&
    iconAttr.value.expression &&
    iconAttr.value.expression.type === 'ConditionalExpression' &&
    iconAttr.value.expression.consequent &&
    (iconAttr.value.expression.consequent.type === 'StringLiteral' ||
      iconAttr.value.expression.consequent.type === 'Literal')
  ) {
    iconAttr.value.expression.consequent = j.jsxElement(
      j.jsxOpeningElement(
        j.jsxMemberExpression(j.jsxIdentifier('Icon'), j.jsxIdentifier(iconAttr.value.expression.consequent.value)),
        [],
        true,
      ),
    );
  } else if (
    iconAttr.value &&
    iconAttr.value.expression &&
    iconAttr.value.expression.type === 'ConditionalExpression' &&
    iconAttr.value.expression.alternate &&
    (iconAttr.value.expression.alternate.type === 'StringLiteral' ||
      iconAttr.value.expression.alternate.type === 'Literal')
  ) {
    iconAttr.value.expression.alternate = j.jsxElement(
      j.jsxOpeningElement(
        j.jsxMemberExpression(j.jsxIdentifier('Icon'), j.jsxIdentifier(iconAttr.value.expression.alternate.value)),
        [],
        true,
      ),
    );
  }
}

function isSimpleIcon(attr) {
  return (
    (attr.value && (attr.value.type === 'StringLiteral' || attr.value.type === 'Literal')) ||
    (attr.value &&
      attr.value.expression &&
      (attr.value.expression.type === 'StringLiteral' || attr.value.expression.type === 'Literal'))
  );
}

function isTernaryIcon(attr) {
  return (
    attr.value &&
    attr.value.expression &&
    (attr.value.expression.type === 'ConditionalExpression' &&
      (attr.value.expression.consequent.type === 'StringLiteral' ||
        attr.value.expression.consequent.type === 'Literal') &&
      (attr.value.expression.alternate.type === 'StringLiteral' || attr.value.expression.alternate.type === 'Literal'))
  );
}

module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const componentNames = ['Icon', 'Link', 'Button', 'MenuItem'];
  const iconNames = new Set();
  const iconComponents = [];
  const componentsWithIconProp = [];

  let preserveIconImport = false;

  root.find(j.JSXOpeningElement, node => componentNames.includes(node.name.name)).forEach(path => {
    if (path.node.name.name === 'Icon') {
      const nameAttrIndex = path.node.attributes.findIndex(attr => attr.name && attr.name.name === 'name');
      const nameAttr = path.node.attributes[nameAttrIndex];
      const iconComponent = { j, path, nameAttr, nameAttrIndex };

      if (nameAttr && isSimpleIcon(nameAttr)) {
        iconComponent.iconName = nameAttr.value.value || nameAttr.value.expression.value;

        iconNames.add(iconComponent.iconName);
      } else if (nameAttr && isTernaryIcon(nameAttr)) {
        iconComponent.consequentIconName = nameAttr.value.expression.consequent.value;
        iconComponent.alternateIconName = nameAttr.value.expression.alternate.value;

        iconNames.add(iconComponent.consequentIconName);
        iconNames.add(iconComponent.alternateIconName);
      } else {
        preserveIconImport = true;
      }
      iconComponents.push(iconComponent);
    } else {
      const iconAttrIndex = path.node.attributes.findIndex(attr => attr.name && attr.name.name === 'icon');
      const iconAttr = path.node.attributes[iconAttrIndex];
      const component = { j, iconAttr };

      if (!iconAttr) return;

      if (isSimpleIcon(iconAttr)) {
        component.iconName = iconAttr.value.value || iconAttr.value.expression.value;

        iconNames.add(component.iconName);
      } else if (isTernaryIcon(iconAttr)) {
        component.expressionIconValue = iconAttr.value;
        component.consequentIconName = iconAttr.value.expression.consequent.value;
        component.alternateIconName = iconAttr.value.expression.alternate.value;

        iconNames.add(component.consequentIconName);
        iconNames.add(component.alternateIconName);
      }
      componentsWithIconProp.push(component);
    }
  });

  iconComponents.forEach(iconComponent => {
    if (preserveIconImport) {
      patchIconToNamespace(iconComponent);
    } else {
      patchIconToNamedIcon(iconComponent);
    }
  });

  componentsWithIconProp.forEach(component => {
    if (preserveIconImport) {
      patchIconPropToSimpleIcon(component);
    } else {
      patchIconPropToNamedIcon(component);
    }
  });

  let iconImportsInserted = false;
  const imports = root.find(j.ImportDeclaration);
  const iconImports = preserveIconImport
    ? []
    : [...iconNames].map(iconName =>
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(`${iconName}Icon`))],
          j.stringLiteral(`@skbkontur/react-icons/${iconName}`),
        ),
      );

  imports.replaceWith(path => {
    const specifiers = path.node.specifiers;
    const filteredSpecifiers = specifiers.filter(spec => spec.local.name !== 'Icon');

    if (specifiers.length === filteredSpecifiers.length) return path.node;

    if (preserveIconImport && filteredSpecifiers.length === 0) return null;

    iconImportsInserted = true;

    if (filteredSpecifiers.length === 0) return iconImports;

    path.node.specifiers = filteredSpecifiers;

    return [path.node, ...iconImports];
  });

  if (preserveIconImport) {
    imports
      .at(-1)
      .insertAfter(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('Icon'))],
          j.stringLiteral('@skbkontur/react-icons'),
        ),
      );
  }

  if (iconNames.size === 0) return root.toSource();

  if (!preserveIconImport) {
    if (!iconImportsInserted) imports.at(-1).insertAfter(iconImports);
  }

  return root.toSource();
};
