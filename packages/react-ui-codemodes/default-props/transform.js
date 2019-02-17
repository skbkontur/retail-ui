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
