import React from 'react';

import { getRootNode } from '../../lib/rootNode';

export type FakeUserAction = 'hover' | 'active' | 'focus';

export const FAKE_USER_ACTION_ATTR: Record<FakeUserAction, string> = {
  hover: 'data-style-hover',
  active: 'data-style-active',
  focus: 'data-style-focus',
};

export const FakeUserActions: React.FunctionComponent<{ children: React.ReactElement; acts?: FakeUserAction[] }> = ({
  children,
  acts = [],
}) => {
  const ref = React.useRef<React.Component>();
  const setProp = (node: HTMLElement) => {
    acts.forEach((act) => node.setAttribute(FAKE_USER_ACTION_ATTR[act], 'true'));
  };
  React.useEffect(() => {
    const node = getRootNode(ref.current);
    if (node instanceof HTMLElement) {
      setProp(node);
      ref.current?.forceUpdate();
    }
  });
  return React.cloneElement(children, { ref });
};
