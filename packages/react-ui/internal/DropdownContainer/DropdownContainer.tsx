import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { RenderContainer } from '../RenderContainer';
import { ZIndex } from '../ZIndex';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';

export interface DropdownContainerPosition {
  top: Nullable<number>;
  bottom: Nullable<number>;
  left: Nullable<number>;
  right: Nullable<number>;
}

export interface DropdownContainerProps {
  align?: 'left' | 'right';
  getParent: () => Nullable<HTMLElement>;
  children?: React.ReactNode;
  disablePortal?: boolean;
  offsetY?: number;
  offsetX?: number;
}

export interface DropdownContainerState {
  position: Nullable<DropdownContainerPosition>;
  minWidth: number;
  isDocumentElementRoot?: boolean;
}

export class DropdownContainer extends React.Component<DropdownContainerProps, DropdownContainerState> {
  public static __KONTUR_REACT_UI__ = 'DropdownContainer';

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

  private getProps = createPropsGetter(DropdownContainer.defaultProps);

  private static dom: Nullable<HTMLDivElement>;
  private layoutSub: Nullable<ReturnType<typeof LayoutEvents.addListener>>;

  public componentDidMount() {
    this.position();
    this.layoutSub = LayoutEvents.addListener(this.position);
  }

  public UNSAFE_componentWillMount() {
    const { body, documentElement: docEl } = document;
    const htmlPosition = getComputedStyle(docEl).position;
    const bodyPosition = getComputedStyle(body).position;

    const hasLimitedHeightRoot = body.scrollHeight > body.clientHeight;
    const hasStaticRoot = htmlPosition === 'static' && bodyPosition === 'static';

    this.setState({ isDocumentElementRoot: hasLimitedHeightRoot || hasStaticRoot });
  }

  public componentWillUnmount() {
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
  }

  public static getDerivedStateFromProps(props: DropdownContainerProps, state: DropdownContainerState) {
    if (state.position !== null) return state;
    const target = props.getParent();

    if (target) {
      const targetRect = target.getBoundingClientRect();
      const { body, documentElement: docEl } = document;

      if (!docEl) {
        throw Error('There is no "documentElement" in "document"');
      }

      const scrollX = window.pageXOffset || docEl.scrollLeft || 0;
      const scrollY = window.pageYOffset || docEl.scrollTop || 0;

      let left = null;
      let right = null;

      if (props.align === 'right') {
        const docWidth = docEl.offsetWidth || 0;
        right = docWidth - (targetRect.right + scrollX) + DropdownContainer.defaultProps.offsetX;
      } else {
        left = targetRect.left + scrollX + DropdownContainer.defaultProps.offsetX;
      }

      const { offsetY = 0 } = props;
      let bottom = null;
      let top: number | null = targetRect.bottom + scrollY + offsetY;

      const distanceToBottom = docEl.clientHeight - targetRect.bottom;
      const child = DropdownContainer.dom?.children.item(0);
      const dropdownHeight = !child ? 0 : child.getBoundingClientRect().height;

      if (distanceToBottom < dropdownHeight && targetRect.top > dropdownHeight) {
        const clientHeight = state.isDocumentElementRoot ? docEl.clientHeight : body.scrollHeight;

        top = null;
        bottom = clientHeight + offsetY - scrollY - targetRect.top;
      }

      const minWidth = !target || !(target instanceof Element) ? 0 : target.getBoundingClientRect().width;
      return {
        minWidth,
        position: {
          top,
          left,
          right,
          bottom,
        },
      };
    }
    return state;
  }

  public render() {
    let style: React.CSSProperties = {
      position: 'absolute',
      top: '0',
    };
    if (this.state.position) {
      const { top, bottom, left, right } = this.state.position;
      style = {
        ...style,
        top: top !== null ? top : undefined,
        bottom: bottom !== null ? bottom : undefined,
        left: left !== null ? left : undefined,
        right: right !== null ? right : undefined,
        minWidth: this.state.minWidth,
      };
    }

    const content = (
      <ZIndex priority={'DropdownContainer'} wrapperRef={this.ZIndexRef} style={style}>
        {this.props.children}
      </ZIndex>
    );

    return this.props.disablePortal ? content : <RenderContainer>{content}</RenderContainer>;
  }

  private ZIndexRef = (element: Nullable<HTMLDivElement>) => {
    DropdownContainer.dom = element;
  };

  private isElement = (node: Nullable<Element>): node is Element => {
    return node instanceof Element;
  };

  private position = () => {
    const target = this.props.getParent();
    const dom = DropdownContainer.dom;

    if (target && this.isElement(target) && dom) {
      const targetRect = target.getBoundingClientRect();
      const { body, documentElement: docEl } = document;

      if (!docEl) {
        throw Error('There is no "documentElement" in "document"');
      }

      const scrollX = window.pageXOffset || docEl.scrollLeft || 0;
      const scrollY = window.pageYOffset || docEl.scrollTop || 0;

      let left = null;
      let right = null;

      if (this.props.align === 'right') {
        const docWidth = docEl.offsetWidth || 0;
        right = docWidth - (targetRect.right + scrollX) + this.getProps().offsetX;
      } else {
        left = targetRect.left + scrollX + this.getProps().offsetX;
      }

      const { offsetY = 0 } = this.props;
      let bottom = null;
      let top: number | null = targetRect.bottom + scrollY + offsetY;

      const distanceToBottom = docEl.clientHeight - targetRect.bottom;
      const dropdownHeight = this.getHeight();

      if (distanceToBottom < dropdownHeight && targetRect.top > dropdownHeight) {
        const clientHeight = this.state.isDocumentElementRoot ? docEl.clientHeight : body.scrollHeight;

        top = null;
        bottom = clientHeight + offsetY - scrollY - targetRect.top;
      }

      const position = {
        top,
        left,
        right,
        bottom,
      };

      this.setState({
        minWidth: this.getMinWidth(),
        position: this.props.disablePortal ? this.convertToRelativePosition(position) : position,
      });
    }
  };

  private getHeight = () => {
    if (!this.isElement(DropdownContainer.dom)) {
      return 0;
    }
    const child = DropdownContainer.dom.children.item(0);
    if (!child) {
      return 0;
    }
    return child.getBoundingClientRect().height;
  };

  private getMinWidth = () => {
    const target = this.props.getParent();
    if (!target || !this.isElement(target)) {
      return 0;
    }
    return target.getBoundingClientRect().width;
  };

  private convertToRelativePosition = (position: DropdownContainerPosition): DropdownContainerPosition => {
    const target = this.props.getParent();
    const { offsetX = 0, offsetY = 0 } = this.props;
    const { top, bottom, left, right } = position;
    if (target && this.isElement(target)) {
      const targetHeight = target.getBoundingClientRect().height;
      return {
        top: top !== null ? targetHeight + offsetY : null,
        bottom: bottom !== null ? targetHeight + offsetY : null,
        left: left !== null ? offsetX : null,
        right: right !== null ? offsetX : null,
      };
    }
    return {
      top: offsetY,
      bottom: null,
      left: offsetX,
      right: null,
    };
  };
}
