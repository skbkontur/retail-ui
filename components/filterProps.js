// @flow

// eslint-disable-next-line flowtype/no-weak-types
export default function filterProps<Props: { [string]: any }, Allowed: {}>(
  props: Props,
  allowed: Allowed
): $ObjMapi<Allowed, <K>(k: K) => $ElementType<Props, K>> {
  const ret = {};
  for (const key in props) {
    if (allowed[key]) {
      ret[key] = props[key];
    }
  }
  return ret;
}
