import React from 'react';
import warning from 'warning';
import { globalObject, SafeTimer } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { isNullable } from '../../lib/utils';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup, PopupPositionsType, PopupProps, ShortPopupPositionsType } from '../../internal/Popup';
import { RenderLayer, RenderLayerProps } from '../../internal/RenderLayer';
import { Nullable } from '../../typings/utility-types';
import { MouseEventType } from '../../typings/event-types';
import { clickOutsideContent } from '../../lib/listenFocusOutside';
import { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import {
  getFullReactUIFlagsContext,
  ReactUIFeatureFlags,
  ReactUIFeatureFlagsContext,
} from '../../lib/featureFlagsContext';
import { isShadowRoot } from '../../lib/shadowDom/isShadowRoot';

import { getStyles } from './Tooltip.styles';

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
   * Приоритетное расположение подсказки относительно текста.
   *
   * **Допустимые значения**: `"top"`, `"right"`, `"bottom"`, `"left"`, `"top left"`, `"top center"`, `"top right"`, `"right top"`, `"right middle"`, `"right bottom"`, `"bottom left"`, `"bottom center"`, `"bottom right"`, `"left top"`, `"left middle"`, `"left bottom"`.
   */
  pos?: ShortPopupPositionsType | PopupPositionsType;

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
  trigger?: TooltipTrigger;

  /**
   * Хэндлер, вызываемый при клике по крестику
   */
  onCloseClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Хэндлер, вызываемый при клике по крестику или
   * снаружи тултипа
   */
  onCloseRequest?: (event?: Event | React.MouseEvent) => void;

  /**
   * Хэндлер, вызываемый при закрытии тултипа
   */
  onClose?: () => void;

  /**
   * Хэндлер, вызываемый при открытии тултипа
   */
  onOpen?: () => void;

  /**
   * Список позиций, которые тултип будет занимать.
   * Если положение тултипа в определенной позиции
   * будет выходить за край экрана, то будет выбрана
   * следующая позиция. Обязательно должен включать
   * позицию указанную в `pos`
   */
  allowedPositions?: PopupPositionsType[];

  /**
   * Флаг отключения анимации.
   * @default false
   */
  disableAnimations?: boolean;

  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper?: boolean;

  /**
   * Задержка перед появлением тултипа в миллисекундах
   * Значение по умолчанию: `100`
   */
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

type DefaultProps = Required<Pick<TooltipProps, 'trigger' | 'disableAnimations' | 'useWrapper' | 'delayBeforeShow'>>;

@rootNode
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> implements InstanceWithAnchorElement {
  public static __KONTUR_REACT_UI__ = 'Tooltip';
  public static displayName = 'Tooltip';

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
    trigger: 'hover',
    disableAnimations: isTestEnv,
    useWrapper: false,
    delayBeforeShow: DEFAULT_DELAY,
  };

  private getProps = createPropsGetter(Tooltip.defaultProps);

  public static delay = DEFAULT_DELAY;
  private static triggersWithoutCloseButton: TooltipTrigger[] = ['hover', 'hoverAnchor', 'focus', 'hover&focus'];

  public state: TooltipState = { opened: false, focused: false };
  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  public featureFlags!: ReactUIFeatureFlags;
  private hoverTimeout: SafeTimer;
  private contentElement: Nullable<HTMLElement> = null;
  private clickedOutside = true;
  private setRootNode!: TSetRootNode;

  private popupRef = React.createRef<Popup>();

  public getAllowedPositions() {
    return this.props.allowedPositions ? this.props.allowedPositions : OldPositions;
  }

  public componentDidUpdate() {
    const { trigger } = this.getProps();
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
            <EmotionConsumer>
              {(emotion) => {
                this.emotion = emotion;
                this.styles = getStyles(this.emotion);
                return (
                  <ThemeContext.Consumer>
                    {(theme) => {
                      this.theme = theme;
                      return (
                        <ThemeContext.Provider
                          value={ThemeFactory.create(
                            {
                              popupMargin: theme.tooltipMargin,
                              popupBorder: theme.tooltipBorder,
                              popupBorderRadius: theme.tooltipBorderRadius,
                              popupPinSize: theme.tooltipPinSize,
                              popupPinOffsetX: theme.tooltipPinOffsetX,
                              popupPinOffsetY: theme.tooltipPinOffsetY,
                              popupBackground: theme.tooltipBg,
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
            </EmotionConsumer>
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
      <div ref={this.refContent} className={this.styles.tooltipContent(this.theme)} data-tid={TooltipDataTids.content}>
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
        className={this.styles.cross(this.theme)}
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

  private isClickOutsideContent(event: Event): boolean {
    const node = this.contentElement;
    const isShadowRootElement = isShadowRoot(this.emotion.sheet.container.getRootNode());
    return clickOutsideContent(event, node, isShadowRootElement);
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
}
