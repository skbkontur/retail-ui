/* eslint-disable flowtype/no-types-missing-file-annotation */
const injectGlobalHook = require('./react-devtools/backend/installGlobalHook');
injectGlobalHook(global);

const Agent = require('./react-devtools/agent/Agent');
const inject = require('./react-devtools/agent/inject');
const invariant = require('invariant');

const TID_HIDDEN = 'data-tid-auto';

const React = require('react');
const oldCreateElement = React.createElement;
// eslint-disable-next-line flowtype/no-weak-types
(React: any).createElement = (type, props, ...children) => {
  if (!props) {
    return oldCreateElement(type, props, ...children);
  }

  const newProps = {};
  for (const key of Object.keys(props)) {
    if (key !== 'tid' && key !== TID_HIDDEN) {
      newProps[key] = props[key];
    }
  }
  if (props.tid) {
    newProps[TID_HIDDEN] = props.tid;
    if (type.__ADAPTER__ === undefined) {
      newProps.tid = props.tid;
    }
  }
  return oldCreateElement(type, newProps, ...children);
};
// eslint-disable-next-line flowtype/no-weak-types
(React: any).createFactory = type =>
  // eslint-disable-next-line flowtype/no-weak-types
  (React: any).createElement.bind(null, type);

type Element = {
  _id: number,
  node: Node,
};

const hook = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

const agent = new Agent(global);
const roots: Array<string> = [];
const mounted = {};

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

// eslint-disable-next-line flowtype/no-weak-types
const findOne = (path: string, tree: any) => {
  return findAll(path, tree)[0];
};

// eslint-disable-next-line flowtype/no-weak-types
const findAll = (path: string, tree: any) => {
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

  return ids
    .map(id => {
      const comp = mounted[id];

      if (comp.props && comp.props.rt_rootID) {
        const root = getDetachedRoot(comp.props.rt_rootID);
        invariant(root, 'Detached react root not found.');
        return search([root], tokens);
      }

      const tid = comp.props && comp.props[TID_HIDDEN];
      if (tid === tokens[0]) {
        const resIds = search([id], tokens.slice(1));
        if (comp.props.tid === tid && Array.isArray(comp.children)) {
          resIds.push(...search(comp.children, tokens));
        }
        return resIds;
      }

      if (Array.isArray(comp.children)) {
        return search(comp.children, tokens);
      }

      return [];
    })
    .reduce((all, ids) => [...all, ...ids], []);
};

const getRoots = () => {
  return roots.filter(id => !mounted[id].props.rt_portalID);
};

const getDetachedRoot = portalID => {
  return roots.find(id => {
    const { props } = mounted[id].props.child || mounted[id].props;
    return props.rt_portalID === portalID;
  });
};

/* eslint-disable consistent-return */
// eslint-disable-next-line flowtype/no-weak-types
function getAdapter(element: Element | Element[]): any {
  const adapters = (Array.isArray(element) ? element : [element])
    .map(el => {
      const comp = mounted[el._id];
      invariant(comp, 'Cannot get adapter of unmounted component.');

      const instance = comp.publicInstance;
      const type = instance && instance.constructor;
      if (type && type.__ADAPTER__) {
        return objectMap(type.__ADAPTER__, func => func.bind(null, instance));
      }
    })
    .filter(Boolean);

  invariant(adapters.length, 'No adapter found.');

  return adapters.reduce((acc, obj) => ({ ...obj, ...acc }), {});
}
/* eslint-enable consistent-return */

const objectMap = (obj, fn) => {
  const ret = {};
  for (const key of Object.keys(obj)) {
    ret[key] = fn(obj[key], key);
  }
  return ret;
};

export {
  findOne,
  findAll,
  getAdapter,
  // For debugging.
  roots,
  mounted,
};

global.Lookup = {
  findOne,
  findAll,
  getAdapter,

  roots,
  mounted,
};
