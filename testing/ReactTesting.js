import ReactDOM from 'react-dom';

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

function find(tid) {
  const ret = [];
  for (const key of Object.keys(map)) {
    const item = map[key];
    if (item.tid === tid) {
      ret.push(item.el);
    }
  }
  return ret;
}

function findDOMNode(tid) {
  return find(tid).map((el) => ReactDOM.findDOMNode(el));
}

export default {
  ref,
  find,
  findDOMNode,

  _map: map,
};
