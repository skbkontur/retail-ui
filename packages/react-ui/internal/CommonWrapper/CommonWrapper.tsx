import React from 'react';
import cn from 'classnames';

import { isFunction } from '../../lib/utils';

export interface CommonProps {
  className?: React.HTMLAttributes<HTMLElement>['className'];
  style?: React.HTMLAttributes<HTMLElement>['style'];
  /** На равне с data-tid транслируются любые data-атрибуты. Они попадают на корневой элемент. */
  'data-tid'?: string;
}

export type NotCommonProps<P> = Omit<P, keyof CommonProps>;

export type CommonWrapperProps<P> = P & {
  children: React.ReactNode | ((rest: CommonWrapperRestProps<P>) => React.ReactNode);
};
export type CommonWrapperRestProps<P> = Omit<NotCommonProps<P>, 'children'>;

export class CommonWrapper<P extends CommonProps> extends React.Component<CommonWrapperProps<P>> {
  render() {
    const [{ className, style, ...dataProps }, { children, ...rest }] = extractCommonProps(this.props);
    const child = isFunction(children) ? children(rest) : children;

    return React.isValidElement<CommonProps>(child)
      ? React.cloneElement(child, {
          className: cn(child.props.className, className),
          style: {
            ...child.props.style,
            ...style,
          },
          ...dataProps,
        })
      : child;
  }
}

type PartialRecord<T> = Partial<Record<keyof T, T[keyof T]>>;

const extractCommonProps = <P extends CommonProps>(props: P): [CommonProps, NotCommonProps<P>] => {
  const common: PartialRecord<CommonProps> = {};
  const rest: PartialRecord<NotCommonProps<P>> = {};

  for (const key in props) {
    if (isCommonProp(key)) {
      common[key] = props[key];
    } else {
      const notCommonKey = (key as unknown) as keyof NotCommonProps<P>;
      rest[notCommonKey] = props[notCommonKey];
    }
  }

  return [common as CommonProps, rest as NotCommonProps<P>];
};

const isCommonProp = (name: string): name is keyof CommonProps => {
  switch (true) {
    case name == 'className':
    case name == 'style':
    case name.indexOf('data-') === 0: // все data-атрибуты
      return true;
    default:
      return false;
  }
};
