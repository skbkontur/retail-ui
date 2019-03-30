import * as React from 'react';
import shallow from 'fbjs/lib/shallowEqual';
import Popup, { PopupPosition, PopupProps } from '../Popup';
import RenderLayer, { RenderLayerProps } from '../RenderLayer';
import CROSS from '../internal/cross';
import { Nullable } from '../../typings/utility-types';
import styles from './Tooltip.less';
import warning from 'warning';
import { MouseEventType } from '../../typings/event-types';
import isEqual from 'lodash.isequal';
import { containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';

const POPUP_MARGIN = 15;
const POPUP_PIN_OFFSET = 17;

const Positions: PopupPosition[] = [
  'right bottom',
  'right middle',
  'right top',
  'top right',
  'top center',
  'top left',
  'left top',
  'left middle',
  'left bottom',
  'bottom left',
  'bottom center',
  'bottom right',
];

export type TooltipTrigger =
  /** Наведение на children и на тултип */
  | 'hover'
  /** Клик на children */
  | 'click'
  /** Фокус на children */
  | 'focus'
  /** Просто открыт */
  | 'opened'
  /** Просто закрыт */
  | 'closed'
  /** Наведение ТОЛЬКО на children, а не на тултип */
  | 'hoverAnchor';

export interface TooltipProps {
  /**
   * Относительно какого элемента позиционировать тултип
   */
  anchorElement?: HTMLElement;

  /**
   * Если не указан `anchorElement` то тултип будет позиционироваться
   * относительно дочерних элементов
   */
  children?: React.ReactNode;

  className?: string;

  /**
   * Показывать крестик для закрытия тултипа. По-умолчанию крестик
   * показывается если проп *trigger* не `hover` и не `focus`.
   */
  closeButton?: boolean;

  /**
   * Функция, которая возвращает содержимое тултипа.
   *
   * Если эта функция вернула `null`, то тултип не показывается.
   */
  render?: Nullable<() => React.ReactNode>;

  pos: PopupPosition;

  trigger: TooltipTrigger;

  /**
   * Хэндлер, вызываемый при клике по крестику
   */
  onCloseClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Хэндлер, вызываемый при клике по крестику или
   * снаружи тултипа
   */
  onCloseRequest?: () => void;

  /**
   * Список позиций, которые тултип будет занимать.
   * Если положение тултипа в определенной позиции
   * будет выходить за край экрана, то будет выбрана
   * следующая позиция. Обязательно должен включать
   * позицию указанную в `pos`
   *
   * ```ts
   * type PopupPosition =
   *   'right bottom',
   * | 'right middle',
   * | 'right top',
   * | 'top right',
   * | 'top center',
   * | 'top left',
   * | 'left top',
   * | 'left middle',
   * | 'left bottom',
   * | 'bottom left',
   * | 'bottom center',
   * | 'bottom right'
   * ```
   */
  allowedPositions: PopupPosition[];

  /**
   * Флаг отключения анимации.
   * @default false
   */
  disableAnimations: boolean;

  /**
   * Использовать обертку над children в виде <span />
   * @default true
   */
  useWrapper: boolean;
}

export interface TooltipState {
  opened: boolean;
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  public static propTypes = {
    children(props: TooltipProps, propName: keyof TooltipProps, componentName: string) {
      const children = props[propName];
      warning(
        children || props.anchorElement,
        `[${componentName}]: you must provide either 'children' or 'anchorElement' prop for ${componentName} to work properly`,
      );
      warning(
        !(Array.isArray(children) && props.useWrapper === false),
        `[${componentName}]: you provided multiple children, but useWrapper={false} - forcing wrapper <span/> for positioning to work correctly`,
      );
    },
  };

  public static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
    allowedPositions: Positions,
    disableAnimations: false,
    useWrapper: true,
    closeOnChildrenMouseLeave: false,
  };

  public static closeDelay = 100;

  private static triggersWithoutCloseButton: TooltipTrigger[] = ['hover', 'hoverAnchor', 'focus'];

  public state: TooltipState = { opened: false };

  private hoverTimeout: Nullable<number> = null;
  private contentElement: Nullable<HTMLElement> = null;
  private positions: Nullable<PopupPosition[]> = null;

  public componentWillReceiveProps(nextProps: TooltipProps) {
    if (nextProps.trigger === 'closed') {
      this.close();
    }

    const { allowedPositions, pos } = this.props;
    const posChanged = nextProps.pos !== pos;
    const allowedChanged = !isEqual(nextProps.allowedPositions, allowedPositions);

    if (posChanged || allowedChanged) {
      this.positions = null;
    }
  }

  public shouldComponentUpdate(nextProps: TooltipProps, nextState: TooltipState) {
    return !shallow(nextProps, this.props) || !shallow(nextState, this.state);
  }

  public render() {
    const props = this.props;
    const content = this.renderContent();
    const { popupProps, layerProps = { active: false } } = this.getProps();
    const anchorElement = props.children || props.anchorElement;
    const popup = this.renderPopup(anchorElement, popupProps, content);

    return <RenderLayer {...layerProps}>{popup}</RenderLayer>;
  }

  public renderContent = () => {
    const content = this.props.render ? this.props.render() : null;
    if (content == null) {
      return null;
    }

    return (
      <div ref={this.refContent} className={styles.tooltipContent}>
        {content}
        {this.renderCloseButton()}
      </div>
    );
  };

  public renderCloseButton() {
    const hasCross =
      this.props.closeButton === undefined
        ? Tooltip.triggersWithoutCloseButton.indexOf(this.props.trigger) === -1
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <span className={styles.cross} onClick={this.handleCloseButtonClick}>
        {CROSS}
      </span>
    );
  }

  private renderPopup(
    anchorElement: React.ReactNode | HTMLElement,
    popupProps: Partial<PopupProps>,
    content: JSX.Element | null,
  ) {
    return (
      <Popup
        anchorElement={anchorElement}
        hasPin
        hasShadow
        margin={POPUP_MARGIN}
        maxWidth="none"
        opened={this.state.opened}
        pinOffset={POPUP_PIN_OFFSET}
        disableAnimations={this.props.disableAnimations}
        positions={this.getPositions()}
        ignoreHover={this.props.trigger === 'hoverAnchor'}
        {...popupProps}
      >
        {content}
      </Popup>
    );
  }

  private refContent = (node: HTMLElement | null) => {
    this.contentElement = node;
  };

  private getPositions() {
    if (!this.positions) {
      const allowedPositions = this.props.allowedPositions;
      const index = allowedPositions.indexOf(this.props.pos);
      if (index === -1) {
        throw new Error('Unexpected position passed to Tooltip. Expected one of: ' + allowedPositions.join(', '));
      }

      this.positions = [...allowedPositions.slice(index), ...allowedPositions.slice(0, index)];
    }

    return this.positions;
  }

  private getProps(): {
    layerProps?: Partial<RenderLayerProps>;
    popupProps: Partial<PopupProps>;
  } {
    const props = this.props;
    const useWrapper = !!props.children && props.useWrapper;
    switch (props.trigger) {
      case 'opened':
        return {
          layerProps: {
            active: true,
            onClickOutside: this.handleClickOutsideAnchor,
          },
          popupProps: {
            opened: true,
            useWrapper,
          },
        };

      case 'closed':
        return {
          popupProps: {
            opened: false,
            useWrapper,
          },
        };

      case 'hoverAnchor':
      case 'hover':
        return {
          popupProps: {
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            useWrapper,
          },
        };

      case 'click':
        return {
          layerProps: {
            active: this.state.opened,
            onClickOutside: this.handleClickOutsideAnchor,
          },
          popupProps: {
            onClick: this.handleClick,
            useWrapper,
          },
        };

      case 'focus':
        return {
          popupProps: {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            useWrapper,
          },
        };

      default:
        throw new Error('Unknown trigger specified: ' + props.trigger);
    }
  }

  private open() {
    this.setState({ opened: true });
  }

  private close() {
    this.setState({ opened: false });
  }

  private handleMouseEnter = (event: MouseEventType) => {
    const isHoverAnchor = this.props.trigger === 'hoverAnchor';
    if (isHoverAnchor && event.target === this.contentElement) {
      return;
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.open();
  };

  private handleMouseLeave = (event: MouseEventType) => {
    const triggerIsHover = this.props.trigger === 'hover';
    if (triggerIsHover && event.relatedTarget === this.contentElement) {
      return;
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    if (this.props.trigger === 'hoverAnchor') {
      this.close();
    } else {
      this.hoverTimeout = window.setTimeout(() => {
        this.close();
      }, Tooltip.closeDelay);
    }
  };

  private handleClick = () => {
    this.open();
  };

  private handleClickOutsideAnchor = (event: Event) => {
    if (this.isClickOutsideContent(event)) {
      if (this.props.onCloseRequest) {
        this.props.onCloseRequest();
      }
      this.close();
    }
  };

  private isClickOutsideContent(event: Event) {
    if (this.contentElement && event.target instanceof Element) {
      return !containsTargetOrRenderContainer(event.target)(this.contentElement);
    }

    return true;
  }

  private handleFocus = () => {
    this.open();
  };

  private handleBlur = () => {
    this.close();
  };

  private handleCloseButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (this.props.onCloseClick) {
      this.props.onCloseClick(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }

    this.close();
  };
}

export default Tooltip;
