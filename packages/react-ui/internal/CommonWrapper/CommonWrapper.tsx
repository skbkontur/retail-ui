import React from 'react';

import { isFunction } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';

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
          className: cx(child.props.className, className),
          style: {
            ...child.props.style,
            ...style,
          },
          ...dataProps,
        })
      : child;
  }
}

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
