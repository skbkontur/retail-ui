// @flow
/* eslint-disable flowtype/no-weak-types */
import { mount, ReactWrapper } from 'enzyme';
import flatten from 'lodash/flatten';
import unique from 'lodash/uniq';
import compact from 'lodash/compact';

export const findRenderContainer = (wrapper: ReactWrapper) =>
  mount(wrapper.find('RenderContainer').get(0).props.children);

export const findWithRenderContainer = (
  selector: any,
  wrapper: ReactWrapper
): ReactWrapper => {
  const wrapperFinds = wrapper.find(selector);
  const containerFinds = findRenderContainer(wrapper).find(selector);
  const nodes = [...wrapperFinds.getNodes(), ...containerFinds.getNodes()];
  const flattened = flatten(nodes, true);
  const uniques = unique(flattened);
  const compacted = compact(uniques);
  // $FlowIgnore
  return wrapper.wrap(compacted);
};
