module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const components = ["Icon", "Link", "Button", "MenuItem"];
  const iconNames = new Set();

  let preserveIconImport = false;

  root
    .find(j.JSXOpeningElement, node => components.includes(node.name.name))
    .forEach(path => {
      if (path.node.name.name == "Icon") {
        const nameAttrIndex = path.node.attributes.findIndex(
          attr => attr.name && attr.name.name == "name"
        );
        const nameAttr = path.node.attributes[nameAttrIndex];

        if (!nameAttr) {
          preserveIconImport = true;
          return;
        }

        if (
          nameAttr.value.type == "Literal" ||
          nameAttr.value.expression.type == "Literal"
        ) {
          const iconName =
            nameAttr.value.value || nameAttr.value.expression.value;

          iconNames.add(iconName);
          path.node.name.name = `${iconName}Icon`;
          path.node.attributes.splice(nameAttrIndex, 1);
        } else if (
          nameAttr.value.expression.type == "ConditionalExpression" &&
          nameAttr.value.expression.consequent.type == "Literal" &&
          nameAttr.value.expression.alternate.type == "Literal"
        ) {
          const consequentIconName = nameAttr.value.expression.consequent.value;
          const alternateIconName = nameAttr.value.expression.alternate.value;
          iconNames.add(consequentIconName);
          iconNames.add(alternateIconName);

          const iconNodeIndex = path.parent.parent.node.children.findIndex(
            child => child == path.parent.node
          );

          path.node.attributes.splice(nameAttrIndex, 1);
          path.parent.parent.node.children[
            iconNodeIndex
          ] = j.jsxExpressionContainer(
            j.conditionalExpression(
              nameAttr.value.expression.test,
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxIdentifier(`${consequentIconName}Icon`),
                  path.node.attributes,
                  true
                )
              ),
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxIdentifier(`${alternateIconName}Icon`),
                  path.node.attributes,
                  true
                )
              )
            )
          );
        } else {
          preserveIconImport = true;
        }
      } else {
        const iconAttrIndex = path.node.attributes.findIndex(
          attr => attr.name && attr.name.name == "icon"
        );
        const iconAttr = path.node.attributes[iconAttrIndex];

        if (!iconAttr) return;

        if (
          iconAttr.value.type == "Literal" ||
          iconAttr.value.expression.type == "Literal"
        ) {
          const iconName =
            iconAttr.value.value || iconAttr.value.expression.value;
          iconNames.add(iconName);

          iconAttr.value = j.jsxExpressionContainer(
            j.jsxElement(
              j.jsxOpeningElement(j.jsxIdentifier(`${iconName}Icon`), [], true)
            )
          );
        } else if (
          iconAttr.value.expression.type == "ConditionalExpression" &&
          iconAttr.value.expression.consequent.type == "Literal" &&
          iconAttr.value.expression.alternate.type == "Literal"
        ) {
          const consequentIconName = iconAttr.value.expression.consequent.value;
          const alternateIconName = iconAttr.value.expression.alternate.value;
          iconNames.add(consequentIconName);
          iconNames.add(alternateIconName);

          iconAttr.value.expression.consequent = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier(`${consequentIconName}Icon`),
              [],
              true
            )
          );
          iconAttr.value.expression.alternate = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier(`${alternateIconName}Icon`),
              [],
              true
            )
          );
        }
      }
    });

  if (iconNames.size == 0) return root.toSource();

  let iconImportsInserted = false;
  const iconImports = [...iconNames].map(iconName =>
    j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(`${iconName}Icon`))],
      j.stringLiteral(`@skbkontur/react-icons/${iconName}`)
    )
  );

  const imports = root.find(j.ImportDeclaration);

  if (!preserveIconImport) {
    imports.replaceWith((path, index) => {
      const specifiers = path.node.specifiers;
      const filteredSpecifiers = specifiers.filter(
        spec => spec.local.name != "Icon"
      );

      if (specifiers.length == filteredSpecifiers.length) return path.node;

      iconImportsInserted = true;

      if (filteredSpecifiers.length == 0) return iconImports;

      path.node.specifiers = filteredSpecifiers;

      return [path.node, ...iconImports];
    });
  }

  if (!iconImportsInserted) imports.at(-1).insertAfter(iconImports);

  return root.toSource();
};
