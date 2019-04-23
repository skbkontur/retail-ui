module.exports = function(file, api) {
  const { jscodeshift: j, report } = api;
  const root = j(file.source);
  let skip = false;

  const getPropertiesFromTSType = typeNode => {
    if (!typeNode) {
      return [];
    }

    // @see https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#362-type-argument-lists
    switch (typeNode.type) {
      case 'TSTypeLiteral':
        return typeNode.members;
      case 'TSTypeAliasDeclaration':
        return getPropertiesFromTSType(typeNode.typeAnnotation);
      case 'TSInterfaceDeclaration':
        return typeNode.body.body;
      case 'TSTypeReference':
        return getPropertiesFromTSType(resolveTSTypeReference(typeNode));
      case 'TSIntersectionType':
      case 'TSUnionType':
      default:
        report('unhandled TSType: ' + typeNode.type);
        skip = true;
        return [];
    }
  };

  const resolveTSTypeReference = typeNode => {
    const typeName = typeNode.typeName.name;

    if (typeName === 'Override') {
      return typeNode.typeParameters.params[1];
    }

    const typeIdentifiers = root.find(j.Identifier, { name: typeName }).paths();

    if (!typeIdentifiers.length) {
      report('type Identifier is not found for: ' + typeName);
    }

    for (const id of typeIdentifiers) {
      if (id.parent && id.parent.node) {
        return id.parent.node;
      }
    }

    return null;
  };

  root.find(j.ClassDeclaration).forEach(classPath => {
    let defaultProps = [];
    j(classPath)
      .find(j.ClassProperty, {
        key: { name: 'defaultProps' },
      })
      .nodes()
      .forEach(classProperty => {
        const { typeAnnotation } = classProperty.typeAnnotation;
        defaultProps = getPropertiesFromTSType(typeAnnotation).map(prop => prop.key.name);
      });

    if (defaultProps.length) {
      const { superTypeParameters } = classPath.node;
      if (superTypeParameters) {
        const [propsParam] = superTypeParameters.params;

        getPropertiesFromTSType(propsParam).forEach(propertyNode => {
          if (propertyNode) {
            if (defaultProps.includes(propertyNode.key.name) && !propertyNode.optional) {
              propertyNode.optional = true;
            }
          }
        });
      }
    }
  });

  if (!skip) {
    return root.toSource();
  }
};

module.exports.parser = 'ts';
