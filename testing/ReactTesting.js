import * as Lookup from './Lookup';

import ReactDOM from 'react-dom';

const PASS_TO_KEY = Symbol('passTo');
const DATA_RENDER_CONTAINER_ID = 'data-render-container-id';

const map = {};
const renderContainers = {};

let lastID = 0;

function ref(tid, existingRef) {
  const id = ++lastID;
  return function(el) {
    if (el) {
      let node = ReactDOM.findDOMNode(el);
      if (node) {
        if (node.hasAttribute(DATA_RENDER_CONTAINER_ID)) {
          node =
            renderContainers[node.getAttribute(DATA_RENDER_CONTAINER_ID)]
              ._domContainer;
        }

        node.setAttribute('tid', tid);
        node.setAttribute('react-testing-id', id);
      }
      map[id] = { el, node, tid };
    } else if (map[id]) {
      const node = map[id].node;
      if (node) {
        node.removeAttribute('tid');
        node.removeAttribute('react-testing-id');
      }
      delete map[id];
    }
    existingRef && existingRef(el);
  };
}

function pass(component) {
  return function(el) {
    component[PASS_TO_KEY] = el;
  };
}

function addRenderContainer(id, instance) {
  renderContainers[id] = instance;
}

function removeRenderContainer(id) {
  delete renderContainers[id];
}

function findDOMNodes(path, parentNode = document.body) {
  return Lookup.findAll(path).map(element => {
    const node = element.node;
    node.lookupElement = element;
    return node;
  });
}

function call(node, method, args = []) {
  return Lookup.getAdapter(node.lookupElement)[method](...args);
}

export default {
  ref,
  pass,
  addRenderContainer,
  removeRenderContainer,

  findDOMNodes,
  call,

  _map: map
};
