// @flow

import React, {PropTypes} from 'react';

import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer/RenderContainer';

type Props = {
  align: 'left' | 'right',
  getParent: () => HTMLElement,
  children?: any,
};

type State = {
  position: ?{
    top: number,
    left: ?number,
    right: ?number,
  },
};

export default class DropdownContainer extends React.Component {
  static contextTypes = {
    rt_inModal: PropTypes.bool,
  };

  static defaultProps = {
    align: 'left',
  };

  props: Props;
  state: State = {
    position: null,
  };

  _dom;
  _layoutSub;

  render() {
    let style = {
      position: 'absolute',
      top: '0',
      left: null,
      right: null,
      zIndex: this.context.rt_inModal ? 1100 : 900,
    };
    if (this.state.position) {
      style = {
        ...style,
        ...this.state.position,
      };
    }

    return (
      <RenderContainer>
        <div ref={this._ref} style={style}>{this.props.children}</div>
      </RenderContainer>
    );
  }

  _ref = (dom: ?HTMLElement) => {
    this._dom = dom;
  };

  componentDidMount() {
    this._position();
    this._layoutSub = LayoutEvents.addListener(this._position);
  }

  componentWillUnmount() {
    this._layoutSub.remove();
  }

  _position = () => {
    const target = this.props.getParent();
    const dom = this._dom;
    if (target && dom) {
      const targetRect = target.getBoundingClientRect();
      var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;

      let left = null;
      let right = null;
      if (this.props.align === 'right') {
        right = document.documentElement.offsetWidth -
          (targetRect.right + scrollX);
      } else {
        left = targetRect.left + scrollX;
      }

      const position = {
        // -1 because we need it in ComboBox. Should become configurable
        // eventually.
        top: targetRect.bottom + scrollY - 1,
        left,
        right,
        minWidth: targetRect.right - targetRect.left,
      };
      this.setState({position});
    }
  };
}
