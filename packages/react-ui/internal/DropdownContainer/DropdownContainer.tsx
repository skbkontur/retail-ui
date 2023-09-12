import React, { HTMLAttributes } from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { RenderContainer } from '../RenderContainer';
import { ZIndex } from '../ZIndex';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { isIE11 } from '../../lib/client';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { CommonProps } from '../CommonWrapper';
import { globalThat, isElement, HTMLDivElement, Element, isBrowser } from '../../lib/globalThat';

import { styles } from './DropdownContainer.styles';
import { getManualPosition, getTopAlignment } from './getManualPosition';

export interface DropdownContainerPosition {
  top: Nullable<number>;
  bottom: Nullable<number>;
  left: Nullable<number>;
  right: Nullable<number>;
}

export interface DropdownContainerProps
  extends Pick<CommonProps, 'data-tid'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  align?: 'left' | 'right';
  getParent: () => Nullable<Element>;
  children?: React.ReactNode;
  disablePortal?: boolean;
  offsetY?: number;
  offsetX?: number;
  hasFixedWidth?: boolean;
  /**
   * Позволяет вручную задать текущую позицию выпадающего окна
   */
  menuPos?: 'top' | 'bottom';
}

export interface DropdownContainerState {
  position: Nullable<DropdownContainerPosition>;
  minWidth: number;
  isDocumentElementRoot?: boolean;
}

type DefaultProps = Required<Pick<DropdownContainerProps, 'align' | 'disablePortal' | 'offsetY' | 'offsetX'>>;

export class DropdownContainer extends React.PureComponent<DropdownContainerProps, DropdownContainerState> {
  public static __KONTUR_REACT_UI__ = 'DropdownContainer';

  public static defaultProps: DefaultProps = {
    align: 'left',
    disablePortal: false,
    offsetX: 0,
    offsetY: -1,
  };

  private getProps = createPropsGetter(DropdownContainer.defaultProps);

  private dom: Nullable<HTMLDivElement>;
  private layoutSub: Nullable<ReturnType<typeof LayoutEvents.addListener>>;

  constructor(props: DropdownContainerProps) {
    super(props);

    this.state = { position: null, minWidth: 0, isDocumentElementRoot: getIsDocumentElementRoot() };
  }

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
      const { top, bottom, left, right } = this.state.position;
      style = {
        ...style,
        top: top !== null ? top : undefined,
        bottom: bottom !== null ? bottom : undefined,
        left: left !== null ? left : undefined,
        right: right !== null ? right : undefined,
        minWidth: this.state.minWidth,
        maxWidth: this.props.hasFixedWidth ? this.state.minWidth : undefined,
      };
    }

    const content = (
      <ZIndex
        data-tid={this.props['data-tid']}
        id={this.props.id}
        priority={'DropdownContainer'}
        wrapperRef={this.ZIndexRef}
        style={style}
        className={cx({
          [styles.alignRight()]: this.getProps().align === 'right' && !isIE11,
        })}
      >
        {this.props.children}
      </ZIndex>
    );

    return this.props.disablePortal ? content : <RenderContainer>{content}</RenderContainer>;
  }

  private ZIndexRef = (element: Nullable<HTMLDivElement>) => {
    this.dom = element;
  };

  public position = () => {
    const target = this.props.getParent();
    const dom = this.dom;

    if (target && isElement(target) && dom && isBrowser(globalThat)) {
      const targetRect = getDOMRect(target);
      const { body, documentElement: docEl } = globalThat.document;

      if (!docEl) {
        throw Error('There is no "documentElement" in "document"');
      }

      const scrollX = globalThat.pageXOffset || docEl.scrollLeft || 0;
      const scrollY = globalThat.pageYOffset || docEl.scrollTop || 0;

      let left = null;
      let right = null;

      if (this.getProps().align === 'right') {
        const docWidth = docEl.offsetWidth || 0;
        right = docWidth - (targetRect.right + scrollX) + this.getProps().offsetX;
      } else {
        left = targetRect.left + scrollX + this.getProps().offsetX;
      }

      const offsetY = this.getProps().offsetY || 0;
      let bottom = null;
      let top: number | null = targetRect.bottom + scrollY + offsetY;

      const distanceToBottom = docEl.clientHeight - targetRect.bottom;
      const dropdownHeight = this.getHeight();

      const clientHeight = this.state.isDocumentElementRoot ? docEl.clientHeight : body.scrollHeight;
      if (distanceToBottom < dropdownHeight && targetRect.top > dropdownHeight) {
        top = null;
        bottom = getTopAlignment({ clientHeight, offsetY, scrollY, target });
      }

      const position = {
        top,
        left,
        right,
        bottom,
        ...getManualPosition({ menuPos: this.props.menuPos, target, offsetY, clientHeight, scrollY }),
      };

      this.setState({
        minWidth: this.getMinWidth(),
        position: this.getProps().disablePortal ? this.convertToRelativePosition(position) : position,
      });
    }
  };

  private getHeight = () => {
    if (!isElement(this.dom)) {
      return 0;
    }
    const child = this.dom.children.item(0);
    return getDOMRect(child).height;
  };

  private getMinWidth = () => {
    const target = this.props.getParent();
    return getDOMRect(target).width;
  };

  private convertToRelativePosition = (position: DropdownContainerPosition): DropdownContainerPosition => {
    const target = this.props.getParent();
    const offsetX = this.getProps().offsetX || 0;
    const offsetY = this.getProps().offsetY || 0;
    const { top, bottom, left, right } = position;
    if (isElement(target)) {
      const targetHeight = getDOMRect(target).height;
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

const getIsDocumentElementRoot = () => {
  if (!isBrowser(globalThat)) {
    return;
  }
  const { body, documentElement } = globalThat.document;
  const htmlPosition = globalThat.getComputedStyle(documentElement).position;
  const bodyPosition = globalThat.getComputedStyle(body).position;

  const hasLimitedHeightRoot = body.scrollHeight > body.clientHeight;
  const hasStaticRoot = htmlPosition === 'static' && bodyPosition === 'static';
  return hasLimitedHeightRoot || hasStaticRoot;
};
