import React from 'react';
import warning from 'warning';
import isEqual from 'lodash.isequal';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { DefaultPosition, Popup, PopupProps, PopupPositionsType } from '../../internal/Popup';
import { RenderLayer, RenderLayerProps } from '../../internal/RenderLayer';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { Nullable } from '../../typings/utility-types';
import { MouseEventType } from '../../typings/event-types';
import { containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Tooltip.styles';

export type TooltipTrigger =
  /** Наведение на children и на тултип */
  | 'hover'
  /** Клик на children */
  | 'click'
  /** Фокус на children */
  | 'focus'
  /** Наведение на children и на тултип и фокус на children */
  | 'hover&focus'
  /** Просто открыт */
  | 'opened'
  /** Просто закрыт */
  | 'closed'
  /** Наведение ТОЛЬКО на children, а не на тултип */
  | 'hoverAnchor'
  /** Управление через публичные функции show и hide */
  | 'manual';

type TooltipInterface = {
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
   * Хэндлер, вызываемый при закрытии тултипа
   */
  onClose?: () => void;

  /**
   * Хэндлер, вызываемый при открытии тултипа
   */
  onOpen?: () => void;

  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper: boolean;
};

export type TooltipProps = TooltipInterface & CommonProps & Partial<DefaultProps>;

export type TooltipState = {
  opened: boolean;
  focused: boolean;
};

type DefaultProps = {
  pos: PopupPositionsType;
  /**
   * Триггер открытия тултипа
   * ```ts
   * type TooltipTrigger =
   * | 'hover'
   * | 'click'
   * | 'focus'
   * | 'hover&focus'
   * | 'opened'
   * | 'closed'
   * | 'hoverAnchor'
   * | 'manual';
   * ```
   */
  trigger: TooltipTrigger;
  /**
   * Список позиций, которые тултип будет занимать.
   * Если положение тултипа в определенной позиции
   * будет выходить за край экрана, то будет выбрана
   * следующая позиция. Обязательно должен включать
   * позицию указанную в `pos`
   */
  allowedPositions: PopupPositionsType[];
  /**
   * Флаг отключения анимации.
   * @default false
   */
  disableAnimations: boolean;
  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper: boolean;
};

type TooltipComponentProps = TooltipProps & DefaultProps;

const Positions: PopupPositionsType[] = [
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

@rootNode
export class Tooltip extends React.PureComponent<TooltipComponentProps, TooltipState> {
  public static __KONTUR_REACT_UI__ = 'Tooltip';

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

  public static defaultProps: DefaultProps = {
    pos: DefaultPosition,
    trigger: 'hover',
    allowedPositions: Positions,
    disableAnimations: isTestEnv,
    useWrapper: false,
  };

  public static delay = 100;
  private static triggersWithoutCloseButton: TooltipTrigger[] = ['hover', 'hoverAnchor', 'focus', 'hover&focus'];

  public state: TooltipState = { opened: false, focused: false };
  private theme!: Theme;
  private hoverTimeout: Nullable<number> = null;
  private contentElement: Nullable<HTMLElement> = null;
  private positions: Nullable<PopupPositionsType[]> = null;
  private clickedOutside = true;
  private setRootNode!: TSetRootNode;

  public componentDidUpdate(prevProps: TooltipProps) {
    if (this.props.trigger === 'closed' && this.state.opened) {
      this.close();
    }

    const { allowedPositions, pos } = this.props;
    const posChanged = prevProps.pos !== pos;
    const allowedChanged = !isEqual(prevProps.allowedPositions, allowedPositions);

    if (posChanged || allowedChanged) {
      this.positions = null;
    }
  }

  public componentWillUnmount() {
    this.clearHoverTimeout();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupPinOffset: theme.tooltipPinOffset,
                  popupMargin: theme.tooltipMargin,
                  popupBorder: theme.tooltipBorder,
                  popupBorderRadius: theme.tooltipBorderRadius,
                  popupPinSize: theme.tooltipPinSize,
                  popupPinOffsetX: theme.tooltipPinOffsetX,
                  popupPinOffsetY: theme.tooltipPinOffsetY,
                },
                theme,
              )}
            >
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderContent = () => {
    const content = this.props.render ? this.props.render() : null;
    if (content == null) {
      return null;
    }

    return (
      <div ref={this.refContent} className={styles.tooltipContent(this.theme)}>
        {content}
        {this.renderCloseButton()}
      </div>
    );
  };

  public renderCloseButton() {
    const hasCross =
      this.props.closeButton === undefined
        ? !Tooltip.triggersWithoutCloseButton.includes(this.props.trigger)
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <div className={styles.cross(this.theme)} onClick={this.handleCloseButtonClick}>
        <CrossIcon />
      </div>
    );
  }

  /**
   * Программно открывает тултип.
   * <p>Не действует если проп *trigger* `'opened'` или `'closed'`.</p>
   * @public
   */
  public show() {
    if (this.state.opened) return;
    if (this.props.trigger === 'opened' || this.props.trigger === 'closed') {
      warning(true, `Function 'show' is not supported with trigger specified '${this.props.trigger}'`);
      return;
    }
    this.open();
  }

  /**
   * Программно закрывает тултип.
   * <p>Не действует если проп *trigger* `'opened'` или `'closed'`.</p>
   * @public
   */
  public hide() {
    if (this.props.trigger === 'opened' || this.props.trigger === 'closed') {
      warning(true, `Function 'hide' is not supported with trigger specified '${this.props.trigger}'`);
      return;
    }
    this.close();
  }

  private renderMain() {
    const props = this.props;
    const content = this.renderContent();
    const { popupProps, layerProps = { active: false } } = this.getProps();
    const anchorElement = props.children || props.anchorElement;
    const popup = this.renderPopup(anchorElement, popupProps, content);

    return (
      <RenderLayer {...layerProps} getAnchorElement={this.getRenderLayerAnchorElement}>
        {popup}
      </RenderLayer>
    );
  }

  private getRenderLayerAnchorElement = () => {
    return getRootNode(this);
  };

  private renderPopup(
    anchorElement: React.ReactNode | HTMLElement,
    popupProps: Partial<PopupProps>,
    content: JSX.Element | null,
  ) {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <Popup
          anchorElement={anchorElement}
          hasPin
          hasShadow
          maxWidth="none"
          opened={this.state.opened}
          disableAnimations={this.props.disableAnimations}
          positions={this.getPositions()}
          ignoreHover={this.props.trigger === 'hoverAnchor'}
          onOpen={this.props.onOpen}
          onClose={this.props.onClose}
          tryPreserveFirstRenderedPosition
          {...popupProps}
        >
          {content}
        </Popup>
      </CommonWrapper>
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
      case 'manual':
        return {
          popupProps: {
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

      case 'hover&focus':
        return {
          layerProps: {
            active: this.state.opened,
            onClickOutside: this.handleClickOutsideAnchor,
          },
          popupProps: {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            useWrapper,
          },
        };

      default:
        throw new Error('Unknown trigger specified: ' + props.trigger);
    }
  }

  private open = () => this.setState({ opened: true });

  private close = () => this.setState({ opened: false });

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  private handleMouseEnter = (event: MouseEventType) => {
    const isHoverAnchor = this.props.trigger === 'hoverAnchor';
    if (isHoverAnchor && event.target === this.contentElement) {
      return;
    }

    this.clearHoverTimeout();

    this.hoverTimeout = window.setTimeout(this.open, Tooltip.delay);
  };

  private handleMouseLeave = (event: MouseEventType) => {
    if (
      (this.props.trigger === 'hover&focus' && this.state.focused) ||
      (this.props.trigger === 'hover' && event.relatedTarget === this.contentElement)
    ) {
      return;
    }

    this.clearHoverTimeout();

    if (this.props.trigger === 'hoverAnchor') {
      this.close();
    } else {
      this.hoverTimeout = window.setTimeout(this.close, Tooltip.delay);
    }
  };

  private handleClick = () => {
    this.open();
  };

  private handleClickOutsideAnchor = (event: Event) => {
    this.clickedOutside = this.isClickOutsideContent(event);
    if (this.clickedOutside) {
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
    this.setState({ focused: true });
    this.open();
  };

  private handleBlur = () => {
    if (this.props.trigger === 'hover&focus' && this.clickedOutside) {
      this.close();
    }

    if (this.props.trigger === 'focus') {
      this.close();
    }

    this.clickedOutside = true;
    this.setState({ focused: false });
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
