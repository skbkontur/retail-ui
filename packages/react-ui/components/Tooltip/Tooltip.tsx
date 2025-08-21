import React from 'react';
import warning from 'warning';
import type { SafeTimer } from '@skbkontur/global-object';
import { globalObject } from '@skbkontur/global-object';
import type { SizeProp } from 'react-ui/lib/types/props';

import { isNullable } from '../../lib/utils';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { PopupProps, PopupPositionsType, ShortPopupPositionsType } from '../../internal/Popup';
import { Popup } from '../../internal/Popup';
import type { RenderLayerProps } from '../../internal/RenderLayer';
import { RenderLayer } from '../../internal/RenderLayer';
import type { Nullable } from '../../typings/utility-types';
import type { MouseEventType } from '../../typings/event-types';
import { containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import type { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { isInstanceOf } from '../../lib/isInstanceOf';
import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext, ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext';
import { cx } from '../../lib/theming/Emotion';

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

export interface TooltipProps extends CommonProps {
  /** Указывает элемент, относительно которого позиционировать тултип. */
  anchorElement?: HTMLElement;

  /** @ignore */
  children?: React.ReactNode;

  /** Задает HTML-атрибут class. */
  className?: string;

  /** Отображает крестик для закрытия тултипа. По-умолчанию крестик виден, если проп *trigger* не равен `hover` или `focus`. */
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

const OldPositions: PopupPositionsType[] = [
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

type DefaultProps = Required<
  Pick<TooltipProps, 'size' | 'trigger' | 'disableAnimations' | 'useWrapper' | 'delayBeforeShow'>
>;

/**
 * `Tooltip` — это подсказка, которая объясняет состояние контрола или даёт контекстную справку.
 *
 * Открывается по клику, фокусом на элемент или по наведению. В отличие от `Hint`, `Tooltip` может содержать
 * изображения, кнопки, ссылки и прочие интерактивные элементы.
 */
@rootNode
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> implements InstanceWithAnchorElement {
  public static __KONTUR_REACT_UI__ = 'Tooltip';
  public static displayName = 'Tooltip';

  public static defaultProps: DefaultProps = {
    size: 'small',
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
  private theme!: Theme;
  private sizeVariables!: TooltipSizeVariables;
  public featureFlags!: ReactUIFeatureFlags;
  private hoverTimeout: SafeTimer;
  private contentElement: Nullable<HTMLElement> = null;
  private clickedOutside = true;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  private popupRef = React.createRef<Popup>();

  public getAllowedPositions() {
    return this.props.allowedPositions ? this.props.allowedPositions : OldPositions;
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

  public render() {
    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
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
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  public renderContent = () => {
    const content = this.props.render ? this.props.render() : null;
    if (isNullable(content)) {
      return null;
    }

    return (
      <div
        ref={this.refContent}
        className={cx(styles.tooltipContent(this.theme), this.sizeVariables.contentStyle)}
        data-tid={TooltipDataTids.content}
      >
        {content}
        {this.renderCloseButton()}
      </div>
    );
  };

  public renderCloseButton() {
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
        className={cx(styles.closeButton(this.theme), this.sizeVariables.closeButtonStyle)}
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
  public show() {
    if (this.state.opened) {
      return;
    }
    const trigger = this.getProps().trigger;
    if (trigger === 'opened' || trigger === 'closed') {
      warning(true, `Function 'show' is not supported with trigger specified '${trigger}'`);
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
    const trigger = this.getProps().trigger;
    if (trigger === 'opened' || trigger === 'closed') {
      warning(true, `Function 'hide' is not supported with trigger specified '${trigger}'`);
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

  private getPositions = (): PopupPositionsType[] | undefined => {
    return this.props.allowedPositions;
  };

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
        throw new Error('Unknown trigger specified: ' + trigger);
    }
  }

  private open = () => this.setState({ opened: true });

  private close = () => this.setState({ opened: false });

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      globalObject.clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  private handleMouseEnter = (event: MouseEventType) => {
    const isHoverAnchor = this.getProps().trigger === 'hoverAnchor';
    if (isHoverAnchor && event.target === this.contentElement) {
      return;
    }

    this.clearHoverTimeout();
    this.hoverTimeout = globalObject.setTimeout(this.open, this.getProps().delayBeforeShow);
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
      this.hoverTimeout = globalObject.setTimeout(this.close, Tooltip.delay);
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
    if (this.contentElement && isInstanceOf(event.target, globalObject.Element)) {
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
    switch (this.props.size) {
      case 'small':
        return {
          closeButtonStyle: styles.closeButtonSmall(this.theme),
          contentStyle: styles.tooltipContentSmall(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusSmall,
          pinSize: this.theme.tooltipPinSizeSmall,
          pinOffsetX: this.theme.tooltipPinOffsetXSmall,
          pinOffsetY: this.theme.tooltipPinOffsetYSmall,
          margin: this.theme.tooltipMarginSmall,
        };
      case 'medium':
        return {
          closeButtonStyle: styles.closeButtonMedium(this.theme),
          contentStyle: styles.tooltipContentMedium(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusMedium,
          pinSize: this.theme.tooltipPinSizeMedium,
          pinOffsetX: this.theme.tooltipPinOffsetXMedium,
          pinOffsetY: this.theme.tooltipPinOffsetYMedium,
          margin: this.theme.tooltipMarginMedium,
        };
      case 'large':
        return {
          closeButtonStyle: styles.closeButtonLarge(this.theme),
          contentStyle: styles.tooltipContentLarge(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusLarge,
          pinSize: this.theme.tooltipPinSizeLarge,
          pinOffsetX: this.theme.tooltipPinOffsetXLarge,
          pinOffsetY: this.theme.tooltipPinOffsetYLarge,
          margin: this.theme.tooltipMarginLarge,
        };
      default:
        console.error(`Can't get size variables: invalid value in size prop '${this.props.size}'. Returning default`);
        return {
          closeButtonStyle: styles.closeButtonSmall(this.theme),
          contentStyle: styles.tooltipContentSmall(this.theme),
          borderRadius: this.theme.tooltipBorderRadiusSmall,
          pinSize: this.theme.tooltipPinSizeSmall,
          pinOffsetX: this.theme.tooltipPinOffsetXSmall,
          pinOffsetY: this.theme.tooltipPinOffsetYSmall,
          margin: this.theme.tooltipMarginSmall,
        };
    }
  };
}
