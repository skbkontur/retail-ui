module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  return root
    .find(j.ClassDeclaration)
    .forEach(classPath => {
      const defaultPropsNames = [];
      j(classPath)
        .find(j.ClassProperty, {
          key: { name: "defaultProps" }
        })
        .forEach(classPropertyPath =>
          j(classPropertyPath)
            .find(j.ObjectProperty)
            .forEach(objectPropertyPath =>
              defaultPropsNames.push(objectPropertyPath.node.key.name)
            )
        );
      if (defaultPropsNames.length) {
        const superTypeParams = classPath.node.superTypeParameters;
        if (superTypeParams && superTypeParams.params.length) {
          const propsParam = superTypeParams.params[0];
          // process all possible "Props" argument Types
          // @see https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#362-type-argument-lists
          switch (propsParam.type) {
            case "TSTypeLiteral":
              j(propsParam)
                .find(j.TSPropertySignature)
                .forEach(propertyPath => {
                  const { node } = propertyPath;
                  if (
                    defaultPropsNames.includes(node.key.name) &&
                    !node.optional
                  ) {
                    node.optional = true;
                  }
                });
              break;
            case "TSTypeReference":
            case "TSIntersectionType":
            case "TSUnionType":
              break;
          }
        }
      }
    })
    .toSource();
};

module.exports.parser = "ts";
