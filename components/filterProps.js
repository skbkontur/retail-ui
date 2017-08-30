export default function(props, allowed) {
  const ret = {};
  for (const key in props) {
    if (allowed[key]) {
      ret[key] = props[key];
    }
  }
  return ret;
}
