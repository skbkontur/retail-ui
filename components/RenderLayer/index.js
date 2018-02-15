// @flow
/* eslint-disable flowtype/no-weak-types */
import { Children, Component } from 'react';
import type { Node } from 'react';
import withFocusOutside from '../internal/withFocusOutside';

type Props = {|
  children?: Node,
  onClickOutside: (e: Event) => mixed,
  onFocusOutside: (e: Event) => mixed,
  subscribeToOutsideFocus: (fn: (e: Event) => mixed) => () => void,
  subscribeToOutsideClicks: (fn: (e: Event) => mixed) => () => void,
  active?: boolean,
  innerRef?: void
|};

class RenderLayer extends Component<Props> {
  unsubscribeFocusOutside: () => void;
  unsubscribeClickOutside: () => void;

  componentDidMount() {
    if (this.props.onFocusOutside) {
      this.unsubscribeFocusOutside = this.props.subscribeToOutsideFocus(
        this.props.onFocusOutside
      );
    }
    if (this.props.onClickOutside) {
      this.unsubscribeClickOutside = this.props.subscribeToOutsideClicks(
        this.props.onClickOutside
      );
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeFocusOutside) {
      this.unsubscribeFocusOutside();
    }
    if (this.unsubscribeClickOutside) {
      this.unsubscribeClickOutside();
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
