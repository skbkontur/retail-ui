import * as React from 'react';
import { findDOMNode } from 'react-dom';

import LayoutEvents from '../../lib/LayoutEvents';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import RenderContainer from '../RenderContainer/RenderContainer';
import ZIndex from '../ZIndex';
import { Nullable } from '../../typings/utility-types';

type DOMNode = Element | Text | null;

export interface PageScroll {
  scrollX: number;
  scrollY: number;
}

export interface DropdownContainerPosition {
  top: number;
  left: number;
}

export interface DropdownContainerSize {
  width: number;
  height: number;
}

export interface DropdownContainerOffset {
  top: number;
  left: number;
}

export interface DropdownContainerAlign {
  alignY: 'top' | 'bottom';
  alignX: 'left' | 'right';
}

export interface DropdownContainerProps {
  align: DropdownContainerAlign['alignX'];
  getParent: () => DOMNode;
  children: React.ReactNode;
  disablePortal: boolean;
  offsetY: number;
  offsetX: number;
}

export interface DropdownContainerState {
  position: Nullable<DropdownContainerPosition>;
  minWidth: number;
  isDocumentElementRoot?: boolean;
}

export default class DropdownContainer extends React.Component<DropdownContainerProps, DropdownContainerState> {
  public static defaultProps = {
    align: 'left',
    disablePortal: false,
    offsetX: 0,
    offsetY: -1,
  };

  public state: DropdownContainerState = {
    position: null,
    minWidth: 0,
    isDocumentElementRoot: true,
  };

  private dom: DOMNode = null;
  private layoutSub: Nullable<ReturnType<typeof LayoutEvents.addListener>>;

  public componentDidMount() {
    this.position();
    this.layoutSub = LayoutEvents.addListener(this.position);
  }

  public componentWillUnmount() {
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
  }

  public render() {
    let style: React.CSSProperties = {
      position: 'absolute',
      top: '0',
    };
    if (this.state.position) {
      const { top, left } = this.state.position;
      style = {
        ...style,
        top,
        left,
        minWidth: this.state.minWidth,
      };
    }

    const content = (
      <ZIndex delta={1000} ref={this.ref} style={style}>
        {this.props.children}
      </ZIndex>
    );

    return this.props.disablePortal ? content : <RenderContainer>{content}</RenderContainer>;
  }

  private ref = (e: ZIndex | null) => {
    this.dom = e && findDOMNode(e);
  };

  private isElement = (node: DOMNode): node is Element => {
    return node instanceof Element;
  };

  private position = () => {
    const target = this.props.getParent();
    const dom = this.dom;

    if (this.isElement(target) && dom) {
      const { documentElement } = document;

      if (!documentElement) {
        throw Error('There is no "documentElement" in "document"');
      }

      const targetRect = target.getBoundingClientRect();
      const dropdownSize = this.getDropdownSize();
      const dropdownOffset = this.getDropdownOffset();
      const dropdownAlign = this.getDropdownAlign();
      const pageScroll = this.getPageScroll();

      this.setState({
        minWidth: this.getMinWidth(),
        position: !this.props.disablePortal
          ? this.getAbsolutePosition(targetRect, dropdownSize, dropdownOffset, dropdownAlign, pageScroll)
          : this.getRelativePosition(targetRect, dropdownSize, dropdownOffset, dropdownAlign),
      });
    }
  };

  private getDropdownSize = () => {
    const size = { width: 0, height: 0 };
    if (!this.isElement(this.dom)) {
      return size;
    }
    const child = this.dom.children.item(0);
    if (!child) {
      return size;
    }
    const { width, height } = child.getBoundingClientRect();
    return {
      width,
      height,
    };
  };

  private getDropdownOffset = (): DropdownContainerOffset => {
    const parentOffset = this.getAbsoluteParentOffset();
    const { alignX, alignY } = this.getDropdownAlign();
    const { offsetX, offsetY } = this.props;
    return {
      top: alignY === 'top' ? -offsetY - parentOffset.top : offsetY - parentOffset.top,
      left: alignX === 'right' ? -offsetX - parentOffset.left : offsetX - parentOffset.left,
    };
  };

  private getDropdownAlign = (): DropdownContainerAlign => {
    let alignY: DropdownContainerAlign['alignY'] = 'bottom';
    const target = this.props.getParent();
    if (this.isElement(target)) {
      const targetRect = target.getBoundingClientRect();
      const dropdownSize = this.getDropdownSize();
      const distanceToBottom = document.documentElement.clientHeight - targetRect.bottom;
      if (distanceToBottom < dropdownSize.height && targetRect.top > dropdownSize.height) {
        alignY = 'top';
      }
    }
    return {
      alignY,
      alignX: this.props.align,
    };
  };

  /**
   * Returns parent relative to which the dropdown in a portal gets positioned
   */
  private getAbsoluteParent = (): HTMLElement | null => {
    if (!this.props.disablePortal) {
      const { body, documentElement: html } = document;
      const htmlPosition = getComputedStyle(html).position;
      const bodyPosition = getComputedStyle(body).position;
      if (bodyPosition !== 'static') {
        return body;
      }
      if (htmlPosition !== 'static') {
        return html;
      }
    }
    return null;
  };

  /**
   * Returns offset of the AbsoluteParent from the document
   */
  private getAbsoluteParentOffset = (): {
    top: number;
    left: number;
  } => {
    const absoluteParent = this.getAbsoluteParent();
    if (!absoluteParent) {
      return {
        top: 0,
        left: 0,
      };
    }
    const rect = absoluteParent.getBoundingClientRect();
    const { scrollX, scrollY } = this.getPageScroll();
    return {
      top: rect.top + absoluteParent.clientTop + scrollY,
      left: rect.left + absoluteParent.clientLeft + scrollX,
    };
  };

  private getPageScroll = (): PageScroll => {
    const { documentElement } = document;
    return {
      scrollX: window.pageXOffset || documentElement.scrollLeft || 0,
      scrollY: window.pageYOffset || documentElement.scrollTop || 0,
    };
  };

  private getMinWidth = () => {
    const target = this.props.getParent();
    if (!this.isElement(target)) {
      return 0;
    }
    return target.getBoundingClientRect().width;
  };

  private getRelativePosition = (
    targetRect: ClientRect,
    dropdownSize: DropdownContainerSize,
    dropdownOffset: DropdownContainerOffset,
    dropdownAlign: DropdownContainerAlign,
  ): DropdownContainerPosition => {
    return {
      top:
        dropdownAlign.alignY === 'top'
          ? -dropdownSize.height + dropdownOffset.top
          : targetRect.height + dropdownOffset.top,
      left:
        dropdownAlign.alignX === 'left'
          ? dropdownOffset.left
          : targetRect.width - dropdownSize.width + dropdownOffset.left,
    };
  };

  private getAbsolutePosition = (
    targetRect: ClientRect,
    dropdownSize: DropdownContainerSize,
    dropdownOffset: DropdownContainerOffset,
    dropdownAlign: DropdownContainerAlign,
    pageScroll: PageScroll,
  ): DropdownContainerPosition => {
    return {
      top:
        dropdownAlign.alignY === 'top'
          ? targetRect.top - dropdownSize.height + pageScroll.scrollY + dropdownOffset.top
          : targetRect.bottom + pageScroll.scrollY + dropdownOffset.top,
      left:
        dropdownAlign.alignX === 'left'
          ? targetRect.left + pageScroll.scrollX + dropdownOffset.left
          : targetRect.right - dropdownSize.width + pageScroll.scrollX + dropdownOffset.left,
    };
  };
}
