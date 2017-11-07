// @flow

import * as React from 'react';

import PropTypes from 'prop-types';

import LayoutEvents from '../../lib/LayoutEvents';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import RenderContainer from '../RenderContainer/RenderContainer';

type Props = {
  align: 'left' | 'right',
  getParent: () => null | Element | Text,
  children?: React.Node,
  disablePortal?: boolean,
  offsetY?: number,
  offsetX?: number
};

type State = {
  position: ?{
    top: ?number,
    bottom: ?number,
    left: ?number,
    right: ?number
  },
  hasStaticRoot?: boolean
};

export default class DropdownContainer extends React.Component<Props, State> {
  static contextTypes = {
    rt_inModal: PropTypes.bool
  };

  static defaultProps = {
    align: 'left',
    disablePortal: false,
    offsetX: 0,
    offsetY: -1
  };

  state: State = {
    position: null,
    hasStaticRoot: true
  };

  _dom;
  _layoutSub;

  render() {
    let style = {
      position: 'absolute',
      top: '0',
      left: null,
      right: null,
      zIndex: this.context.rt_inModal ? 1100 : 900
    };
    if (this.state.position) {
      style = {
        ...style,
        ...this.state.position
      };
    }
    if (this.props.disablePortal) {
      style = {
        ...style,
        ...{
          top: null,
          bottom: null,
          minWidth: '100%'
        }
      };
    }

    const content = (
      <div ref={this._ref} style={style}>
        {this.props.children}
      </div>
    );

    return this.props.disablePortal ? (
      content
    ) : (
      <RenderContainer>{content}</RenderContainer>
    );
  }

  _ref = (dom: ?HTMLElement) => {
    this._dom = dom;
  };

  componentDidMount() {
    if (!this.props.disablePortal) {
      this._position();
      this._layoutSub = LayoutEvents.addListener(this._position);
    }
  }

  componentWillMount() {
    let htmlPosition = getComputedStyle(document.documentElement).position;
    let bodyPosition = getComputedStyle(document.body).position;

    if (htmlPosition !== 'static' || bodyPosition !== 'static') {
      this.setState({hasStaticRoot: false})
    }
  }

  componentWillUnmount() {
    if (!this.props.disablePortal && this._layoutSub) {
      this._layoutSub.remove();
    }
  }

  _position = () => {
    // $FlowIssue
    const target: ?Element = this.props.getParent();
    const dom = this._dom;

    if (target && dom) {
      const targetRect = target.getBoundingClientRect();
      const docEl = document.documentElement;

      if (!docEl) {
        throw Error('There is no "documentElement" in "document"');
      }

      const scrollX = window.pageXOffset || docEl.scrollLeft || 0;
      const scrollY = window.pageYOffset || docEl.scrollTop || 0;

      let left = null;
      let right = null;

      if (this.props.align === 'right') {
        const docWidth = docEl.offsetWidth || 0;
        right = docWidth - (targetRect.right + scrollX) + this.props.offsetX;
      } else {
        left = targetRect.left + scrollX + this.props.offsetX;
      }

      const { offsetY = 0 } = this.props;
      let bottom = null;
      let top = targetRect.bottom + scrollY + offsetY;

      const distanceToBottom = docEl.clientHeight - targetRect.bottom;
      const distanceToTop = targetRect.top;
      const dropdownHeight = this._getHeight();

      if (distanceToBottom < dropdownHeight && distanceToTop > dropdownHeight) {

        top = null;

        if (this.state.hasStaticRoot) {
          bottom =
            distanceToBottom -
            scrollY +
            offsetY +
            targetRect.bottom -
            targetRect.top;
        } else {

          let bodyScrollHeight = 0;
          if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
          }

          bottom =
            bodyScrollHeight -
            docEl.clientHeight -
            scrollY +
            distanceToBottom +
            targetRect.bottom -
            targetRect.top +
            offsetY;
        }
      }

      const position = {
        top,
        left,
        right,
        bottom,
        minWidth: targetRect.right - targetRect.left
      };
      this.setState({ position });
    }
  };

  _getHeight = () => {
    if (!this._dom) {
      return 0;
    }
    const child = this._dom.children.item(0);
    if (!child) {
      return 0;
    }
    const rect = child.getBoundingClientRect();
    return rect.height ? rect.height : rect.bottom - rect.top;
  };
}
