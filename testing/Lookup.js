const injectGlobalHook = require('./react-devtools/backend/installGlobalHook');
injectGlobalHook(global);

const Agent = require('./react-devtools/agent/Agent');
const inject = require('./react-devtools/agent/inject');
const invariant = require('invariant');

const React = require('react');
const oldCreateElement = React.createElement;
React.createElement = (type, props, ...children) => {
  if (!props) {
    return oldCreateElement(type, props, ...children);
  }

  let {
    tid,
    $$tid, // eslint-disable-line no-unused-vars
    ...newProps,
  } = props;
  if (tid) {
    newProps = {
      $$tid: tid,
      ...newProps,
    };
  }
  return oldCreateElement(type, newProps, ...children);
};

const hook = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

const agent = new Agent(global);
const roots = [];
const mounted = {};
exports.roots = roots;
exports.mounted = mounted;

agent.on('root', id => {
  if (!roots.includes(id)) {
    roots.push(id);
  }
});
agent.on('mount', comp => {
  mounted[comp.id] = comp;
});
agent.on('update', comp => {
  mounted[comp.id] = comp;
});
agent.on('unmount', id => {
  const index = roots.indexOf(id);
  if (index !== -1) {
    roots.splice(index, 1);
  }
  delete mounted[id];
});

inject(hook, agent);

export const findOne = (path: string, tree) => {
  return findAll(path, tree)[0];
};

export const findAll = (path: string, tree) => {
  const tokens = path.split(' ');

  let roots;
  if (tree) {
    if (!mounted[tree._id]) {
      throw new Error('Cannot search in unmounted component.');
    }

    roots = [tree._id];
  } else {
    roots = getRoots();
  }

  return search(roots, tokens).map(id => {
    const comp = mounted[id];
    return {
      _id: comp.id,
      node: agent.getNodeForID(id),
    };
  });
};

const search = (ids, tokens) => {
  if (tokens.length === 0) {
    return ids;
  }

  return ids.map(id => {
    const comp = mounted[id];

    if (comp.props && comp.props.rt_rootID) {
      return search([getDetachedRoot(comp.props.rt_rootID)], tokens);
    }

    const tid = comp.props && comp.props.$$tid;
    if (tid === tokens[0]) {
      return search([id], tokens.slice(1));
    }

    if (Array.isArray(comp.children)) {
      return search(comp.children, tokens);
    }

    return [];
  }).reduce((all, ids) => [...all, ...ids], []);
};

const getRoots = () => {
  return roots.filter(id => !mounted[id].props.rt_portalID);
};

const getDetachedRoot = (portalID) => {
  return roots.find(id => mounted[id].props.props.rt_portalID);
};

export const getAdapter = element => {
  const comp = mounted[element._id];
  invariant(comp, 'Cannot get adapter of unmounted component.');

  const instance = comp.publicInstance;
  const type = instance && instance.constructor;
  if (type && type.__ADAPTER__) {
    return objectMap(type.__ADAPTER__, func => func.bind(null, instance));
  }

  invariant(false, 'No adapter found.');

  return null;
};

export const objectMap = (obj, fn) => {
  const ret = {};
  for (const key of Object.keys(obj)) {
    ret[key] = fn(obj[key], key);
  }
  return ret;
};

global.Lookup = exports;
