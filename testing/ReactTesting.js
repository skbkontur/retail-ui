import ReactDOM from 'react-dom';

const PASS_TO_KEY = Symbol('passTo');
const DATA_RENDER_CONTAINER_ID = 'data-render-container-id';

const map = {};
const renderContainers = {};

let lastID = 0;

function ref(tid) {
  const id = ++lastID;
  return function(el) {
    if (el) {
      let node = ReactDOM.findDOMNode(el);
      if (node) {
        if (node.hasAttribute(DATA_RENDER_CONTAINER_ID)) {
          node = renderContainers[node.getAttribute(DATA_RENDER_CONTAINER_ID)].
            _domContainer;
        }

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

function addRenderContainer(id, instance) {
  renderContainers[id] = instance;
}

function removeRenderContainer(id) {
  delete renderContainers[id];
}

function findDOMNodes(path, parentNode = document.body) {
  return _findDOMNodes(path.split(' '), [parentNode]);
}

function _findDOMNodes(tokens, parentNodes) {
  if (tokens.length === 0) {
    return parentNodes;
  }

  const token = tokens[0];
  return parentNodes.reduce((all, parentNode) => {
    return [
      ...all,
      ..._findDOMNodes(tokens.slice(1), queryByTid(parentNode, token)),
      ..._findDOMNodes(tokens, queryContainers(parentNode)),
    ];
  }, []);
}

function queryByTid(node, tid) {
  const ret = [];

  if (node.getAttribute('tid') === tid) {
    ret.push(node);
  }

  ret.push(...node.querySelectorAll(`[tid="${tid}"]`));

  return ret;
}

function queryContainers(node) {
  const links = node.querySelectorAll('[data-render-container-id]');
  return Array.from(links).map(link => {
    const id = link.getAttribute(DATA_RENDER_CONTAINER_ID);
    return renderContainers[id]._domContainer;
  });
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
  addRenderContainer,
  removeRenderContainer,

  findDOMNodes,
  call,

  _map: map,
};
