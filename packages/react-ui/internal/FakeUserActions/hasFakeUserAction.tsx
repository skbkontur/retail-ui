import { Nullable } from '../../typings/utility-types';
import { getRootNode } from '../../lib/rootNode';

import { FAKE_USER_ACTION_ATTR, FakeUserAction } from './FakeUserActions';

export const hasFakeUserAction = (instance: Nullable<React.ReactInstance>, act: FakeUserAction): boolean => {
  const node = getRootNode(instance);
  return node ? node.hasAttribute(FAKE_USER_ACTION_ATTR[act]) : false;
};
