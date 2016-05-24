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

exports.find = (path: string) => {
  const tokens = path.split(' ');
  return search(getRoots(), tokens).map(id => {
    const comp = mounted[id];
    return {
      node: agent.getNodeForID(id),
      instance: comp.publicInstance,
      call(methodName, args) {
        return call(comp.publicInstance, methodName, args);
      },
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
  }).reduce((ids, all) => [...all, ...ids], []);
};

const getRoots = () => {
  return roots.filter(id => !mounted[id].props.rt_portalID);
};

const getDetachedRoot = (portalID) => {
  return roots.find(id => mounted[id].props.props.rt_portalID);
};

const call = (reactInstance, methodName, args) => {
  const Adapter = getAdapter(reactInstance);
  const adapter = new Adapter(reactInstance);
  const method = adapter[methodName];

  invariant(method, 'Adapter function `%s` not found.', methodName);

  return method.call(adapter, ...args);
};

const getAdapter = reactInstance => {
  const type = reactInstance && reactInstance.constructor;
  if (type && type.__ADAPTER__) {
    return type.__ADAPTER__;
  }

  invariant(false, 'No adapter found.');

  return null;
};

global.Lookup = exports;
