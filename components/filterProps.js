'use strict';
exports.__esModule = true;
function filterProps(props, allowed) {
  var ret = {};
  for (var key in props) {
    if (allowed[key]) {
      ret[key] = props[key];
    }
  }
  return ret;
}
exports['default'] = filterProps;
// TypeScript widens types, so `true` becomes `boolean`
function unwidenBool(obj) {
  return obj;
}
exports.unwidenBool = unwidenBool;
var a = unwidenBool({
  b: true,
  c: false
});
