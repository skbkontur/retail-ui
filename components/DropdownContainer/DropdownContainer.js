// @flow

import React, {PropTypes} from 'react';

import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer/RenderContainer';

type Props = {
  align: 'left' | 'right',
  getParent: () => HTMLElement,
  children?: any,
  noUsePortal?: bool,
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
    noUsePortal: false,
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
    if (this.props.noUsePortal){
      style = {
        ...style,
        ...{
          top: null,
          minWidth: '100%',
        },
      };
    }

    let context = <div ref={this._ref} style={style}>
      {this.props.children}
    </div>;

    return this.props.noUsePortal
      ? context
      : (<RenderContainer>{context}</RenderContainer>);
  }

  _ref = (dom: ?HTMLElement) => {
    this._dom = dom;
  };

  componentDidMount() {
    if (!this.props.noUsePortal){
      this._position();
      this._layoutSub = LayoutEvents.addListener(this._position);
    }
  }

  componentWillUnmount() {
    if (!this.props.noUsePortal){
      this._layoutSub.remove();
    }
  }

  _position = () => {
    const target = this.props.getParent();
    const dom = this._dom;
    if (target && dom) {
      const targetRect = target.getBoundingClientRect();
      const docEl = document.documentElement;
      const scrollX = window.pageXOffset || docEl.scrollLeft || 0;
      const scrollY = window.pageYOffset || docEl.scrollTop || 0;

      let left = null;
      let right = null;
      if (this.props.align === 'right') {
        const docWidth = document.documentElement.offsetWidth || 0;
        right = docWidth - (targetRect.right + scrollX);
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
