import * as React from 'react';
import { findDOMNode } from 'react-dom';

import LayoutEvents from '../../lib/LayoutEvents';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import RenderContainer from '../RenderContainer/RenderContainer';
import ZIndex from '../ZIndex';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';

export interface DropdownContainerPosition {
  top: Nullable<number>;
  bottom: Nullable<number>;
  left: Nullable<number>;
  right: Nullable<number>;
  minWidth: Nullable<number>;
}

export interface DropdownContainerProps {
  align?: 'left' | 'right';
  getParent: () => null | Element | Text;
  children?: React.ReactNode;
  disablePortal?: boolean;
  offsetY?: number;
  offsetX?: number;
}

export interface DropdownContainerState {
  position: Nullable<DropdownContainerPosition>;
  hasStaticRoot?: boolean;
}

export default class DropdownContainer extends React.Component<
  DropdownContainerProps,
  DropdownContainerState
> {
  public static defaultProps = {
    align: 'left',
    disablePortal: false,
    offsetX: 0,
    offsetY: -1
  };

  public state: DropdownContainerState = {
    position: null,
    hasStaticRoot: true
  };

  private getProps = createPropsGetter(DropdownContainer.defaultProps);

  private _dom: Nullable<HTMLElement>;
  private _layoutSub: Nullable<ReturnType<typeof LayoutEvents.addListener>>;

  public componentDidMount() {
    this._position();
    this._layoutSub = LayoutEvents.addListener(this._position);
  }

  public componentWillMount() {
    const htmlPosition = getComputedStyle(document.documentElement).position;
    const bodyPosition = getComputedStyle(document.body).position;

    if (htmlPosition !== 'static' || bodyPosition !== 'static') {
      this.setState({ hasStaticRoot: false });
    }
  }

  public componentWillUnmount() {
    if (!this.props.disablePortal && this._layoutSub) {
      this._layoutSub.remove();
    }
  }

  public render() {
    let style: React.CSSProperties = {
      position: 'absolute'
    };
    if (this.state.position) {
      const { top, bottom, left, right, minWidth } = this.state.position;
      style = {
        ...style,
        top: top !== null ? top : undefined,
        bottom: bottom !== null ? bottom : undefined,
        left: left !== null ? left : undefined,
        right: right !== null ? right : undefined,
        minWidth: minWidth !== null ? minWidth : undefined
      };
    }

    const content = (
      <ZIndex delta={1000} ref={this._ref} style={style}>
        {this.props.children}
      </ZIndex>
    );

    return this.props.disablePortal ? (
      content
    ) : (
      <RenderContainer>{content}</RenderContainer>
    );
  }

  private _ref = (e: ZIndex | null) => {
    this._dom = e && (findDOMNode(e) as HTMLElement);
  };

  private _position = () => {
    const target = this.props.getParent() as Nullable<Element>;
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
        right =
          docWidth - (targetRect.right + scrollX) + this.getProps().offsetX;
      } else {
        left = targetRect.left + scrollX + this.getProps().offsetX;
      }

      const { offsetY = 0 } = this.props;
      let bottom = null;
      let top: number | null = targetRect.bottom + scrollY + offsetY;

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

      this.setState({
        position: this.props.disablePortal
          ? this._convertToRelativePosition(position)
          : position
      });
    }
  };

  private _getHeight = () => {
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

  private _convertToRelativePosition = (position: DropdownContainerPosition): DropdownContainerPosition => {
    const target = this.props.getParent() as Nullable<Element>;
    const { offsetX = 0, offsetY = 0 } = this.props;
    const { top, bottom, left, right, minWidth } = position;
    if (target) {
      const targetHeight = target.getBoundingClientRect().height;
      return {
        top: top !== null ? targetHeight + offsetY : null,
        bottom: bottom !== null ? targetHeight + offsetY : null,
        left: left !== null ? offsetX : null,
        right: right !== null ? offsetX : null,
        minWidth
      }
    }
    return {
      top: offsetY,
      bottom: null,
      left: offsetX,
      right: null,
      minWidth
    };
  };
}
