// @flow
import { Children, Component } from 'react';
import withFocusOutside from '../internal/withFocusOutside';

class RenderLayer extends Component {

  props: {
    children?: any,
    onClickOutside: (e: Event) => any,
    onFocusOutside: (e: Event) => any,
    subscribeToOutsideFocus: (fn: (e: Event) => any) => any,
    subscribeToOutsideClicks: (fn: (e: Event) => any) => any
  };

  unsibscribeFocusOutside: Function;
  unsibscribeClickOutside: Function;

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

export default withFocusOutside(RenderLayer);
