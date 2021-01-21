import React from 'react';
import cn from 'classnames';

import { isFunction } from '../../lib/utils';

export interface CommonProps {
  className?: React.HTMLAttributes<HTMLElement>['className'];
  style?: React.HTMLAttributes<HTMLElement>['style'];
  /** На равне с data-tid транслируются любые data-атрибуты */
  'data-tid'?: string;
}

export type NotCommonProps<P> = Omit<P, keyof CommonProps>;

export type CommonWrapperProps<P> = P & {
  children:
    | React.ReactElement<CommonProps>
    | null
    | ((rest: CommonWrapperRestProps<P>) => React.ReactElement<CommonProps>);
};
export type CommonWrapperRestProps<P> = Omit<NotCommonProps<P>, 'children'>;

export const CommonWrapper = <P extends CommonProps>(props: CommonWrapperProps<P>) => {
  const [{ className, style, ...dataProps }, { children, ...rest }] = extractCommonProps(props);
  const child = React.Children.only(isFunction(props.children) ? props.children(rest) : props.children);

  return React.isValidElement(child)
    ? React.cloneElement(child, {
        className: cn(child.props.className, className),
        style: {
          ...child.props.style,
          ...style,
        },
        ...dataProps,
      })
    : null;
};

const extractCommonProps = <P extends CommonProps>(props: P): [CommonProps, NotCommonProps<P>] => {
  const common = {} as CommonProps;
  const rest = {} as NotCommonProps<P>;

  for (const key in props) {
    if (isCommonProp(key)) {
      // @ts-ignore
      common[key] = props[key];
    } else {
      // @ts-ignore
      rest[key] = props[key];
    }
  }

  return [common, rest];
};

const isCommonProp = (name: string) => {
  switch (true) {
    case name == 'className':
    case name == 'style':
    case name.indexOf('data-') === 0: // все data-атрибуты
      return true;
    default:
      return false;
  }
};
