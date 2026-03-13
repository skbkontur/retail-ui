import React, { type JSX } from 'react';
import warning from 'warning';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject, SafeTimer } from '../../lib/globalObject.js';
import { isNullable } from '../../lib/utils.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { PopupPositionsType, PopupProps, ShortPopupPositionsType } from '../../internal/Popup/index.js';
import { Popup } from '../../internal/Popup/index.js';
import type { RenderLayerProps } from '../../internal/RenderLayer/index.js';
import { RenderLayer } from '../../internal/RenderLayer/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { MouseEventType } from '../../typings/event-types.js';
import { containsTargetOrRenderContainer } from '../../lib/listenFocusOutside.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import type { SizeProp } from '../../lib/types/props.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Tooltip.styles.js';

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

export interface TooltipProps extends CommonProps {
  /** Указывает элемент, относительно которого позиционировать тултип. */
  anchorElement?: HTMLElement;

  /** @ignore */
  children?: React.ReactNode;

  /** Задает HTML-атрибут class. */
  className?: string;

  /** Отображает крестик для закрытия тултипа. По умолчанию крестик виден, если проп *trigger* не равен `hover` или `focus`. */
  closeButton?: boolean;

  /** Задает функцию, которая возвращает содержимое тултипа. Если функция вернула `null`, то тултип не показывается. */
  render?: Nullable<() => React.ReactNode>;

  /** Задает приоритетное расположение подсказки относительно текста. */
  pos?: ShortPopupPositionsType | PopupPositionsType;

  /** Задает размер тултипа.
   * @default 'small' */
  size?: SizeProp;

  /** Задает триггер открытия тултипа. */
  trigger?: TooltipTrigger;

  /** Задает хендлер, который вызывается при клике по крестику. */
  onCloseClick?: React.MouseEventHandler<HTMLElement>;

  /** Задает хендлер, который вызывается при клике по крестику или снаружи тултипа. */
  onCloseRequest?: (event?: Event | React.MouseEvent) => void;

  /** Задает хендлер, который вызывается при закрытии тултипа. */
  onClose?: () => void;

  /** Задает хендлер, который вызывается при открытии тултипа. */
  onOpen?: () => void;

  /** Задает список позиций, которые тултип будет занимать.
   * Если положение тултипа в определенной позиции будет выходить за край экрана, то будет выбрана следующая позиция.
   * Обязательно должен включать позицию указанную в `pos`. */
  allowedPositions?: PopupPositionsType[];

  /** Отключает анимацию.
   * @default false */
  disableAnimations?: boolean;

  /** Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`.
   * Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически. */
  useWrapper?: boolean;

  /** Устанавливает задержку в миллисекундах до появления лоадера. */
  delayBeforeShow?: number;
}

const DEFAULT_DELAY = 100;

export interface TooltipState {
  opened: boolean;
  focused: boolean;
}

export const TooltipDataTids = {
  root: 'Tooltip__root',
  content: 'Tooltip__content',
  crossIcon: 'Tooltip__crossIcon',
} as const;

const DefaultPositions: PopupPositionsType[] = [
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

interface TooltipSizeVariables {
  closeButtonStyle: string;
  contentStyle: string;
  borderRadius: string;
  pinSize: string;
  pinOffsetX: string;
  pinOffsetY: string;
  margin: string;
}

type DefaultProps = Required<Pick<TooltipProps, 'trigger' | 'disableAnimations' | 'useWrapper' | 'delayBeforeShow'>>;

/**
 * `Tooltip` — это подсказка, которая объясняет состояние контрола или даёт контекстную справку.
 *
 * Открывается по клику, фокусом на элемент или по наведению. В отличие от `Hint`, `Tooltip` может содержать
 * изображения, кнопки, ссылки и прочие интерактивные элементы.
 */
@withRenderEnvironment
@rootNode
@withSize
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> implements InstanceWithAnchorElement {
  public static __KONTUR_REACT_UI__ = 'Tooltip';
  public static displayName = 'Tooltip';

  public static defaultProps: DefaultProps = {
    trigger: 'hover',
    disableAnimations: isTestEnv,
    useWrapper: false,
    delayBeforeShow: DEFAULT_DELAY,
  };

  private getProps = createPropsGetter(Tooltip.defaultProps);
  private validateProps(props: TooltipProps): void {
    warning(
      props.children || props.anchorElement,
      `[Tooltip]: you must provide either 'children' or 'anchorElement' prop for Tooltip to work properly`,
    );
  }

  public static delay = DEFAULT_DELAY;
  private static triggersWithoutCloseButton: TooltipTrigger[] = ['hover', 'hoverAnchor', 'focus', 'hover&focus'];

  public state: TooltipState = { opened: false, focused: false };
  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private size!: SizeProp;
  private sizeVariables!: TooltipSizeVariables;
  private hoverTimeout: SafeTimer;
  private contentElement: Nullable<HTMLElement> = null;
  private clickedOutside = true;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  private popupRef = React.createRef<Popup>();

  public getAllowedPositions(): string[] {
    return this.props.allowedPositions ? this.props.allowedPositions : DefaultPositions;
  }

  public componentDidMount(): void {
    this.validateProps(this.getProps());
  }

  public componentDidUpdate() {
    const { trigger } = this.getProps();

    this.validateProps(this.getProps());
    if (trigger === 'closed' && this.state.opened) {
      this.close();
    }
  }

  public componentWillUnmount() {
    this.clearHoverTimeout();
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          this.sizeVariables = this.getSizeVariables();
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupBackground: theme.tooltipBg,
                  popupBorder: theme.tooltipBorder,
                  popupBorderRadius: this.sizeVariables.borderRadius,
                  popupPinSize: this.sizeVariables.pinSize,
                  popupPinOffsetX: this.sizeVariables.pinOffsetX,
                  popupPinOffsetY: this.sizeVariables.pinOffsetY,
                  popupMargin: this.sizeVariables.margin,
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

  public renderContent = (): React.JSX.Element | null => {
    const content = this.props.render ? this.props.render() : null;
    if (isNullable(content)) {
      return null;
    }

    return (
      <div
        ref={this.refContent}
        className={this.cx(this.styles.tooltipContent(this.theme), this.sizeVariables.contentStyle)}
        data-tid={TooltipDataTids.content}
      >
        {content}
        {this.renderCloseButton()}
      </div>
    );
  };

  public renderCloseButton(): React.JSX.Element | null {
    const hasCross =
      this.props.closeButton === undefined
        ? !Tooltip.triggersWithoutCloseButton.includes(this.getProps().trigger)
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    const icon = (
      <CloseButtonIcon
        tabbable={false}
        side={parseInt(this.theme.tooltipCloseBtnSide)}
        color={this.theme.tooltipCloseBtnColor}
        colorHover={this.theme.tooltipCloseBtnHoverColor}
      />
    );

    return (
      <div
        className={this.cx(this.styles.closeButton(this.theme), this.sizeVariables.closeButtonStyle)}
        onClick={this.handleCloseButtonClick}
        data-tid={TooltipDataTids.crossIcon}
      >
        {icon}
      </div>
    );
  }

  public getAnchorElement = (): Nullable<Element> => {
    return this.popupRef.current?.anchorElement;
  };

  /**
   * Программно открывает тултип.
   * <p>Не действует если проп *trigger* `'opened'` или `'closed'`.</p>
   * @public
   */
  public show(): void {
    if (this.state.opened) {
      return;
    }
    const trigger = this.getProps().trigger;
    if (trigger === 'opened' || trigger === 'closed') {
      warning(false, `Function 'show' is not supported with trigger specified '${trigger}'`);
      return;
    }
    this.open();
  }

  /**
   * Программно закрывает тултип.
   * <p>Не действует если проп *trigger* `'opened'` или `'closed'`.</p>
   * @public
   */
  public hide(): void {
    const trigger = this.getProps().trigger;
    if (trigger === 'opened' || trigger === 'closed') {
      warning(false, `Function 'hide' is not supported with trigger specified '${trigger}'`);
      return;
    }
    this.close();
  }

  private renderMain() {
    const props = this.props;
    const content = this.renderContent();
    const { popupProps, layerProps = { active: false } } = this.getPopupAndLayerProps();
    const anchorElement = props.children || props.anchorElement;
    const popup = this.renderPopup(anchorElement, popupProps, content);

    return (
      <RenderLayer {...layerProps} getAnchorElement={this.getAnchorElement}>
        {popup}
      </RenderLayer>
    );
  }

  private renderPopup(
    anchorElement: React.ReactNode | HTMLElement,
    popupProps: Partial<PopupProps>,
    content: JSX.Element | null,
  ) {
    const { disableAnimations, trigger } = this.getProps();
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <Popup
          data-tid={TooltipDataTids.root}
          anchorElement={anchorElement}
          hasPin
          hasShadow
          maxWidth="none"
          opened={this.state.opened}
          disableAnimations={disableAnimations}
          positions={this.getPositions()}
          pos={this.props.pos}
          ignoreHover={trigger === 'hoverAnchor'}
          onOpen={this.props.onOpen}
          onClose={this.props.onClose}
          tryPreserveFirstRenderedPosition
          ref={this.popupRef}
          withoutMobile
          {...popupProps}
        >
          {content}
        </Popup>
      </CommonWrapper>
    );
  }

  private getPositions = (): PopupPositionsType[] =>
    this.props.allowedPositions
      ? this.props.allowedPositions.filter((item) => DefaultPositions.includes(item))
      : DefaultPositions;

  private refContent = (node: HTMLElement | null) => {
    this.contentElement = node;
  };

  private getPopupAndLayerProps(): {
    layerProps?: Partial<RenderLayerProps>;
    popupProps: Partial<PopupProps>;
  } {
    const props = this.props;
    const useWrapper = !!props.children && this.getProps().useWrapper;
    const trigger = this.getProps().trigger;

    const defaultPopupAndLayerProps: ReturnType<typeof this.getPopupAndLayerProps> = {
      popupProps: {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        useWrapper,
      },
    };

    switch (trigger) {
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

      case 'hoverAnchor':
      case 'hover':
        return defaultPopupAndLayerProps;
      default:
        warning(false, `Unknown trigger specified: ${trigger}. Returning default value.`);
        return defaultPopupAndLayerProps;
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
    const isHoverAnchor = this.getProps().trigger === 'hoverAnchor';
    if (isHoverAnchor && event.target === this.contentElement) {
      return;
    }

    this.clearHoverTimeout();
    this.hoverTimeout = setTimeout(this.open, this.getProps().delayBeforeShow);
  };

  private handleMouseLeave = (event: MouseEventType) => {
    const trigger = this.getProps().trigger;
    if (
      (trigger === 'hover&focus' && this.state.focused) ||
      (trigger === 'hover' && event.relatedTarget === this.contentElement)
    ) {
      return;
    }

    this.clearHoverTimeout();

    if (trigger === 'hoverAnchor') {
      this.close();
    } else {
      this.hoverTimeout = setTimeout(this.close, Tooltip.delay);
    }
  };

  private handleClick = () => {
    this.open();
  };

  private handleClickOutsideAnchor = (event: Event) => {
    this.clickedOutside = this.isClickOutsideContent(event);
    if (this.clickedOutside) {
      if (this.props.onCloseRequest) {
        this.props.onCloseRequest(event);
      }
      this.close();
    }
  };

  private isClickOutsideContent(event: Event) {
    if (this.contentElement && isInstanceOf(event.target, this.globalObject.Element)) {
      return !containsTargetOrRenderContainer(event.target)(this.contentElement);
    }

    return true;
  }

  private handleFocus = () => {
    this.setState({ focused: true });
    this.open();
  };

  private handleBlur = () => {
    const trigger = this.getProps().trigger;
    if (trigger === 'hover&focus' && this.clickedOutside) {
      this.close();
    }

    if (trigger === 'focus') {
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
      this.props.onCloseRequest(event);
    }

    this.close();
  };

  private getSizeVariables = (): TooltipSizeVariables => {
    switch (this.size) {
      case 'small':
        return {
          closeButtonStyle: this.styles.closeButtonSmall(this.theme),
          contentStyle: this.styles.tooltipContentSmall(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusSmall,
          pinSize: this.theme.tooltipPinSizeSmall,
          pinOffsetX: this.theme.tooltipPinOffsetXSmall,
          pinOffsetY: this.theme.tooltipPinOffsetYSmall,
          margin: this.theme.tooltipMarginSmall,
        };
      case 'medium':
        return {
          closeButtonStyle: this.styles.closeButtonMedium(this.theme),
          contentStyle: this.styles.tooltipContentMedium(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusMedium,
          pinSize: this.theme.tooltipPinSizeMedium,
          pinOffsetX: this.theme.tooltipPinOffsetXMedium,
          pinOffsetY: this.theme.tooltipPinOffsetYMedium,
          margin: this.theme.tooltipMarginMedium,
        };
      case 'large':
        return {
          closeButtonStyle: this.styles.closeButtonLarge(this.theme),
          contentStyle: this.styles.tooltipContentLarge(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusLarge,
          pinSize: this.theme.tooltipPinSizeLarge,
          pinOffsetX: this.theme.tooltipPinOffsetXLarge,
          pinOffsetY: this.theme.tooltipPinOffsetYLarge,
          margin: this.theme.tooltipMarginLarge,
        };
      default:
        warning(false, `Can't get size variables: invalid value in size prop '${this.props.size}'. Returning default`);
        return {
          closeButtonStyle: this.styles.closeButtonSmall(this.theme),
          contentStyle: this.styles.tooltipContentSmall(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusSmall,
          pinSize: this.theme.tooltipPinSizeSmall,
          pinOffsetX: this.theme.tooltipPinOffsetXSmall,
          pinOffsetY: this.theme.tooltipPinOffsetYSmall,
          margin: this.theme.tooltipMarginSmall,
        };
    }
  };
}
