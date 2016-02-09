import ReactDOM from 'react-dom';

const PASS_TO_KEY = Symbol('passTo');

const map = {};
let lastID = 0;

function ref(tid) {
  const id = ++lastID;
  return function(el) {
    if (el) {
      const node = ReactDOM.findDOMNode(el);
      if (node) {
        node.setAttribute('tid', tid);
      }
      map[id] = {el, tid};
    } else {
      delete map[id];
    }
  };
}

function pass(component) {
  return function(el) {
    component[PASS_TO_KEY] = el;
  }
}

function find(tid) {
  const ret = [];
  for (const key of Object.keys(map)) {
    const item = map[key];
    if (item.tid === tid) {
      let el = item.el;
      while (el[PASS_TO_KEY]) {
        el = el[PASS_TO_KEY];
      }
      if (el.constructor && el.constructor.__ADAPTER__) {
        el = new el.constructor.__ADAPTER__(el);
      }
      ret.push(el);
    }
  }
  return ret;
}

function findDOMNode(tid) {
  return find(tid).map((el) => ReactDOM.findDOMNode(el));
}

export default {
  ref,
  pass,
  find,
  findDOMNode,

  _map: map,
};
