module.exports = function(file, api) {
  const { jscodeshift: j, report } = api;
  const root = j(file.source);
  let skip = false;

  const getPropertiesFromTSType = typeNode => {
    let properties = [];
    return properties;
  };

  const resolveTSTypeReference = typeNode => {
    return null;
  };

  root.find(j.ClassDeclaration).forEach(classPath => {
    const defaultPropsNames = [];
    const defaultProps = j(classPath)
      .find(j.ClassProperty, {
        key: { name: 'defaultProps' },
      })
      .nodes()[0];
    let hasDefaultProps = false;

    if (defaultProps) {
      hasDefaultProps = true;
      if (defaultProps.typeAnnotation) {
        const { typeAnnotation } = defaultProps.typeAnnotation;
        switch (typeAnnotation.type) {
          case 'TSTypeLiteral':
            typeAnnotation.members.forEach(member => defaultPropsNames.push(member.key.name));
            break;
          default:
            report('unhandled defaultProps typeAnnotation type: ' + typeAnnotation.type);
        }
      }
      if (!defaultPropsNames.length) {
        report('defaultProps names are missed');
        skip = true;
      }
    }

    if (defaultPropsNames.length) {
      const superTypeParams = classPath.node.superTypeParameters;
      if (superTypeParams && superTypeParams.params.length) {
        const propsParam = superTypeParams.params[0];
        // process all possible "Props" argument Types
        // @see https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#362-type-argument-lists
        switch (propsParam.type) {
          case 'TSTypeLiteral':
            j(propsParam)
              .find(j.TSPropertySignature)
              .forEach(propertyPath => {
                const { node } = propertyPath;
                if (defaultPropsNames.includes(node.key.name) && !node.optional) {
                  node.optional = true;
                }
              });
            break;
          case 'TSTypeReference':
            const typeName = propsParam.typeName.name;
            const typeIdentifiers = j(classPath)
              .closestScope()
              .find(j.Identifier, { name: typeName })
              .paths();
            let typeProperties = null;

            if (!typeIdentifiers.length) {
              report('type Identifier is not found for: ' + typeName);
              skip = true;
            }

            for (const id of typeIdentifiers) {
              if (id.parent && id.parent.node) {
                if (id.parent.node.type == 'TSInterfaceDeclaration') {
                  typeProperties = id.parent.node.body.body;
                  break;
                } else if (id.parent.node.type == 'TSTypeAliasDeclaration') {
                  typeProperties = id.parent.node.typeAnnotation.members;
                  break;
                } else {
                  report('unhandled TSTypeReference declaration: ' + id.parent.node.type);
                  skip = true;
                }
              }
            }

            if (!typeProperties) {
              report('type Identifier is not found for: ' + typeName);
              skip = true;
            } else {
              typeProperties.forEach(node => {
                if (defaultPropsNames.includes(node.key.name) && !node.optional) {
                  node.optional = true;
                }
              });
            }

            break;
          case 'TSIntersectionType':
          case 'TSUnionType':
          default:
            report('unhandled type of superTypeParam: ' + propsParam.type);
            skip = true;
            break;
        }
      }
    }
  });

  if (!skip) {
    return root.toSource();
  }
};

module.exports.parser = 'ts';
