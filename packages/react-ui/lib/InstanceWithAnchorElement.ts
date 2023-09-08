import { Nullable } from '../typings/utility-types';

import { Element } from './globalThat';

export interface InstanceWithAnchorElement {
  getAnchorElement: () => Nullable<Element>;
}

export const isInstanceWithAnchorElement = (instance: unknown): instance is InstanceWithAnchorElement => {
  return Boolean(instance) && Object.prototype.hasOwnProperty.call(instance, 'getAnchorElement');
};
