import React from 'react';
import { findDOMNode } from 'react-dom';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { RenderContainer } from '../RenderContainer';
import { ZIndex } from '../ZIndex';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { mobileLayout, MobileLayoutState, LayoutMode } from '../../components/MobileLayout';
import { cx } from '../../lib/theming/Emotion';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './DropdownContainer.styles';

type DOMNode = Element | Text | null;

export interface DropdownContainerPosition {
  top: Nullable<number>;
  bottom: Nullable<number>;
  left: Nullable<number>;
  right: Nullable<number>;
}

export interface DropdownContainerProps {
  align?: 'left' | 'right';
  getParent: () => DOMNode;
  children?: React.ReactNode;
  disablePortal?: boolean;
  offsetY?: number;
  offsetX?: number;

  /**
   * Открыть на весь экран в мобильной версии
   */
  mobileUseFullHeight?: boolean;
  /**
   * Хэндлер закрытия в мобильной версии
   */
  mobileCloseHandler?: () => void;
  /**
   * Не использовать мобильную версию
   */
  renderDefault?: boolean;
}

export interface DropdownContainerState extends MobileLayoutState {
  position: Nullable<DropdownContainerPosition>;
  minWidth: number;
  isDocumentElementRoot?: boolean;

  mobileOpened: boolean;
}

@mobileLayout
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

    mobileOpened: false,
  };

  private theme!: Theme;

  private getProps = createPropsGetter(DropdownContainer.defaultProps);

  private dom: DOMNode = null;
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

  public componentDidUpdate(prevProps: DropdownContainerProps, prevState: DropdownContainerState) {
    if (this.state.layout === LayoutMode.Mobile && !prevState.mobileOpened) {
      this.setState({ mobileOpened: true });
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return this.getRenderer();
        }}
      </ThemeContext.Consumer>
    );
  }

  public getRenderer() {
    if (this.props.renderDefault) {
      return this.renderMain();
    }

    if (this.state.layout === LayoutMode.Mobile) {
      return this.renderMobile();
    }

    return this.renderMain();
  }

  public renderMain() {
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
      <ZIndex priority={'DropdownContainer'} ref={this.ref} style={style}>
        {this.props.children}
      </ZIndex>
    );

    return this.props.disablePortal ? content : <RenderContainer>{content}</RenderContainer>;
  }

  public renderMobile() {
    return (
      <RenderContainer>
        <div
          className={cx({
            [jsStyles.mobileMenu(this.theme)]: true,
            [jsStyles.mobileMenuOpened()]: this.state.mobileOpened,
          })}
        >
          {this.props.children}
        </div>
        <HideBodyVerticalScroll />
        <div onClick={this.closeMobile} className={jsStyles.bg()} />
      </RenderContainer>
    );
  }

  public closeMobile = () => {
    if (this.props.mobileCloseHandler) {
      this.setState({
        mobileOpened: false,
      });

      setTimeout(this.props.mobileCloseHandler, 250);
    }
  };

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
    if (!this.isElement(this.dom)) {
      return 0;
    }
    const child = this.dom.children.item(0);
    if (!child) {
      return 0;
    }
    return child.getBoundingClientRect().height;
  };

  private getMinWidth = () => {
    const target = this.props.getParent();
    if (!this.isElement(target)) {
      return 0;
    }
    return target.getBoundingClientRect().width;
  };

  private convertToRelativePosition = (position: DropdownContainerPosition): DropdownContainerPosition => {
    const target = this.props.getParent();
    const { offsetX = 0, offsetY = 0 } = this.props;
    const { top, bottom, left, right } = position;
    if (this.isElement(target)) {
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
