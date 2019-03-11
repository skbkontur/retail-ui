function transformer(file, api) {
  const j = api.jscodeshift;

  const parsed = j(file.source);

  // x?.x => x.x
  parsed.find(j.MemberExpression).replaceWith(path => {
    path.value.optional = false;
    return path.value;
  });

  // [X, X] => Typle<X, X>
  parsed.find(j.TupleTypeAnnotation).replaceWith(path => {
    return j.genericTypeAnnotation(j.identifier('Tuple'), j.typeParameterInstantiation(path.value.types));
  });

  return parsed.toSource().replace(/type type /gi, 'type ');
}

export default transformer;
