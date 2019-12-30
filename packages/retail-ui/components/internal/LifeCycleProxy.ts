import React from 'react';

export interface LifeCycleProxyProps<T> {
  onDidMount?: (props: T) => void;
  onDidUpdate?: (prevProps: T, props: T) => void;
  onWillUnmount?: (props: T) => void;
  props: T;
}

// NOTE You can extends props and arguments if necessary
export class LifeCycleProxy<T> extends React.Component<LifeCycleProxyProps<T>> {
  public componentDidMount() {
    if (this.props.onDidMount) {
      this.props.onDidMount(this.props.props);
    }
  }
  public componentDidUpdate(prevProps: LifeCycleProxyProps<T>) {
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(prevProps.props, this.props.props);
    }
  }
  public componentWillUnmount() {
    if (this.props.onWillUnmount) {
      this.props.onWillUnmount(this.props.props);
    }
  }
  public render() {
    return this.props.children;
  }
}
