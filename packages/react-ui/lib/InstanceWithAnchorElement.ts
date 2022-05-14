import { Nullable } from '../typings/utility-types';

import { hasOwnProperty } from './utils';

export interface InstanceWithAnchorElement {
  getAnchorElement: () => Nullable<HTMLElement>;
}

export const isInstanceWithAnchorElement = (instance: Nullable<object>): instance is InstanceWithAnchorElement => {
  return hasOwnProperty(instance, 'getAnchorElement');
};
