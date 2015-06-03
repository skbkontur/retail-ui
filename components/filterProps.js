module.exports = function(props, allowed) {
  let ret = {};
  for (let key in props) {
    if (allowed[key]) {
      ret[key] = props[key];
    }
  }
  return ret;
};
