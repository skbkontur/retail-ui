import type React from 'react';

import type { Nullable } from '../../typings/utility-types';

export interface CommonProps {
  /**
   * HTML-атрибут `class`.
   */
  className?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * HTML-атрибут `style`.
   */
  style?: React.HTMLAttributes<HTMLElement>['style'];
  /**
   * Наравне с data-tid транслируются любые data-атрибуты. Они попадают на корневой элемент.
   */
  'data-tid'?: string;
  children?: React.ReactNode;
}

export interface CommonPropsRootNodeRef {
  rootNodeRef?: (instance: Nullable<Element>) => void;
}

export type NotCommonProps<P> = Omit<P, keyof CommonProps>;
export type CommonWrapperProps<P> = P & {
  children: React.ReactNode | ((rest: CommonWrapperRestProps<P>) => React.ReactNode);
};
export type CommonWrapperRestProps<P> = Omit<NotCommonProps<P>, 'children'>;
