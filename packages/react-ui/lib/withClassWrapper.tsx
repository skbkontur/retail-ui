import React from 'react';

export function withClassWrapper<P>(name: string, RFC: React.FunctionComponent<P>) {
  return class ClassWrapper extends React.Component<P> {
    public static __KONTUR_REACT_UI__ = name;
    public static displayName = name;

    public static FC = RFC;

    render() {
      return <ClassWrapper.FC {...this.props} />;
    }
  };
}
