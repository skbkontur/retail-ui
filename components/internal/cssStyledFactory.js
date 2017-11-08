// @flow
import * as React from 'react';

type Classes = { [string]: string };

type Props<T, C> = T & { innerRef?: (React.ElementRef<C> | null) => void };

export default function cssStyledFactory<T: {}, C: Class<React.Component<T>>>(
  Component: C,
  cssStyles: Classes
): Class<React.Component<Props<T, C>>> {
  return class Styled extends React.Component<
    T & { innerRef?: (React.ElementRef<C> | null) => void }
  > {
    render() {
      const { innerRef, ...rest } = this.props;
      return <Component {...rest} classes={cssStyles} ref={innerRef} />;
    }
  };
}
