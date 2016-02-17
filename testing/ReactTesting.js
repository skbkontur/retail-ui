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
        node.setAttribute('react-testing-id', id);
      }
      map[id] = {el, node, tid};
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

function findDOMNodes(path, parentNode = document) {
  const query = path.split(' ').map((tid) => `[tid="${tid}"]`).join(' ');
  return parentNode.querySelectorAll(query);
}

function call(node, method, args = []) {
  const item = map[node.getAttribute('react-testing-id')];
  if (item) {
    let el = item.el;
    while (el[PASS_TO_KEY]) {
      el = el[PASS_TO_KEY];
    }
    if (el.constructor && el.constructor.__ADAPTER__) {
      const adapter = new el.constructor.__ADAPTER__(el);
      return adapter[method](...args);
    }
  }

  throw new Error(`Failed to call method ${method}.`);
}

export default {
  ref,
  pass,
  findDOMNodes,
  call,

  _map: map,
};
