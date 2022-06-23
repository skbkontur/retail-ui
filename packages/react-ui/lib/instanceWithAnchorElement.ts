import { Nullable } from '../typings/utility-types';

export interface InstanceWithAnchorElement {
  getAnchorElement: () => Nullable<HTMLElement>;
}

export const isInstanceWithAnchorElement = (instance: unknown): instance is InstanceWithAnchorElement => {
  return Boolean(instance) && Object.prototype.hasOwnProperty.call(instance, 'getAnchorElement');
};
