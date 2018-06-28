function transformer(file, api) {
  const j = api.jscodeshift;

  const parsed = j(file.source);

  // import type = > import
  parsed.find(j.ImportDeclaration).replaceWith(x => {
    return j.importDeclaration(
      x.value.specifiers.map(x => {
        x.importKind = null;
        return x;
      }),
      x.value.source
    );
  });

  // ?XXX => Nullable<XXX>
  parsed.find(j.NullableTypeAnnotation).replaceWith(path => {
    if (
      path.parent.value.type === 'FunctionTypeAnnotation' &&
      path.parent.parent.value.type === 'ObjectTypeProperty' &&
      path.parent.parent.value.method
    ) {
      console.log('Skipped Nullable: ' + file.path);
      return path.value;
    }
    return j.genericTypeAnnotation(
      j.identifier('Nullable'),
      j.typeParameterInstantiation([path.value.typeAnnotation])
    );
  });

  // ?XXX => Nullable<XXX>
  parsed.find(j.ExportNamedDeclaration).replaceWith(path => {
    if (path.value.exportKind !== 'value') {
      path.value.exportKind = 'value';
    }
    return path.value;
  });

  // React.Node => JSX.Element, React.ReactNode, React.ReactChild, React.Element<T>
  parsed.find(j.QualifiedTypeIdentifier).replaceWith(path => {
    if (
      path.value.qualification.name === 'React' &&
      path.value.id.name === 'Node'
    ) {
      path.value.qualification.name = 'React';
      path.value.id.name = 'ReactNode';
      return path.value;
    }
    return path.value;
  });

  // <any>
  parsed.find(j.TypeParameterInstantiation).replaceWith(path => {
    if (path.value.params.length === 0) {
      path.value.params = [j.anyTypeAnnotation()];
      return path.value;
    }
    return path.value;
  });

  // * => any
  parsed.find(j.ExistsTypeAnnotation).replaceWith(path => {
    return j.anyTypeAnnotation();
  });

  // Drop +, -
  parsed.find(j.TypeParameterDeclaration).replaceWith(path => {
    if ((path.value.params || []).some(x => x.variance != null)) {
      return j.typeParameterDeclaration(
        path.value.params.map(x => {
          x.variance = null;
          return x;
        })
      );
    }
    return path.value;
  });

  // Drop +, -
  parsed.find(j.Variance).replaceWith(path => {
    return null;
  });

  // (X, Y) => T => (x0: X, x1: Y) => T
  parsed.find(j.FunctionTypeAnnotation).replaceWith(path => {
    if (path.value.params.some(x => x.name == null)) {
      if (
        path.parent.value.type === 'ObjectTypeProperty' &&
        path.parent.value.method
      ) {
        console.log('Skipped param names: ' + file.path);
        return path.value;
      }
      return j.functionTypeAnnotation(
        (path.value.params || []).map((x, i) => {
          if (x.name != null) {
            return x;
          }
          x.name = j.identifier('x' + i);
          return x;
        }),
        path.value.returnType,
        path.value.rest,
        path.value.typeParameters
      );
    }
    return path.value;
  });

  // : => extends в generic-ах
  parsed.find(j.TypeParameter).replaceWith(path => {
    if (path.value.bound != null) {
      path.value.bound = j.genericTypeAnnotation(
        j.identifier(
          ' extends ' + j(path.value.bound.typeAnnotation).toSource()
        ),
        null
      );
      path.value.default = null;
      return path.value;
    }
    return path.value;
  });

  // (x: Y) => cast<Y>(x);
  parsed.find(j.TypeCastExpression).replaceWith(path => {
    const result = j.callExpression(
      j.identifier(
        'cast<' + j(path.value.typeAnnotation.typeAnnotation).toSource() + '>'
      ),
      [path.value.expression]
    );
    return result;
  });

  // {| ... |} => { ... }
  parsed.find(j.ObjectTypeAnnotation).replaceWith(path => {
    if (path.value.exact) {
      path.value.exact = false;
      return path.value;
    }
    return path.value;
  });

  // return parsed.toSource();
  return parsed
    .toSource()
    .replace(/: :/gi, ':')
    .replace(/\( :/gi, '(')
    .replace(/\(: /gi, '(')
    .replace(/\= :/gi, '=')
    .replace(/, :/gi, ',')
    .replace(/<: /gi, '<')
    .replace(/\[:/gi, '[')
    .replace(/\= <T>\(/gi, '= <T extends any>(')
    .replace(/: <T>\(\(/gi, ': <T extends any>(');
}

export default transformer;
