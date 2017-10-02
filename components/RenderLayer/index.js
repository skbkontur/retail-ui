// @flow
/* eslint-disable flowtype/no-weak-types */
import { Children, Component } from 'react';
import type { Node } from 'react';
import withFocusOutside from '../internal/withFocusOutside';

type Props = {
  children?: Node,
  onClickOutside: (e: Event) => mixed,
  onFocusOutside: (e: Event) => mixed,
  subscribeToOutsideFocus: (fn: (e: Event) => mixed) => () => void,
  subscribeToOutsideClicks: (fn: (e: Event) => mixed) => () => void,
  active?: boolean,
  innerRef?: void
};

class RenderLayer extends Component<Props> {
  unsibscribeFocusOutside: () => void;
  unsibscribeClickOutside: () => void;

  componentDidMount() {
    this.unsibscribeFocusOutside = this.props.subscribeToOutsideFocus(
      this.props.onFocusOutside
    );
    this.unsibscribeClickOutside = this.props.subscribeToOutsideClicks(
      this.props.onClickOutside
    );
  }

  componentWillUnmount() {
    if (this.unsibscribeFocusOutside) {
      this.unsibscribeFocusOutside();
    }
    if (this.unsibscribeClickOutside) {
      this.unsibscribeClickOutside();
    }
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

const EnhencedComponent: React.ComponentType<{
  children?: Node,
  onClickOutside: (e: Event) => mixed,
  onFocusOutside: (e: Event) => mixed,
  active?: boolean,
  innerRef?: void
}> = withFocusOutside(RenderLayer);

export default EnhencedComponent;
