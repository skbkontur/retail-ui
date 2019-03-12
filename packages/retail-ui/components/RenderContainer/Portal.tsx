import * as React from 'react';
import ReactDOM from 'react-dom';

interface PortalPros {
  rt_rootID: number;
}

export function NativePortal(props: PortalPros) {
  return <noscript data-render-container-id={props.rt_rootID} />;
}

// @ts-ignore
NativePortal.displayName = 'Portal';

export class CustomPortal extends React.Component<PortalPros> {
  public static displayName = 'Portal';

  public componentDidMount() {
    if (!this.props.children) {
      return;
    }

    const element = ReactDOM.findDOMNode(this);

    if (element && element instanceof Element) {
      const rootId = element.getAttribute('data-render-container-id');
      const rootIdAttribute = rootId ? `${rootId} ${this.props.rt_rootID}` : `${this.props.rt_rootID}`;

      element.setAttribute('data-render-container-id', rootIdAttribute);
    }
  }

  public render() {
    return this.props.children || <noscript data-render-container-id={this.props.rt_rootID} />;
  }
}
