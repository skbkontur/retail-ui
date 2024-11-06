import React from 'react';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { ButtonLinkAllowedValues } from '../../lib/types/button-link';
import { resetButton } from '../../lib/styles/Mixins';
import { PolymorphicPropsWithoutRef } from '../../lib/types/polymorphic-component';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { isExternalLink } from '../../lib/utils';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Link.styles';
import { LinkIcon } from './LinkIcon';

export interface LinkInnerProps extends CommonProps {
  /**
   * Отключенное состояние.
   */
  disabled?: boolean;
  /**
   * Добавляет ссылке иконку слева.
   */
  icon?: React.ReactElement;
  /**
   * Добавляет ссылке иконку справа.
   */
  rightIcon?: React.ReactElement;
  /**
   * Тема ссылки.
   */
  use?: 'default' | 'success' | 'danger' | 'grayed';
  /**
   * @ignore
   */
  _button?: boolean;
  /**
   * @ignore
   */
  _buttonOpened?: boolean;
  /**
   * HTML-атрибут `tabindex`.
   */
  tabIndex?: number;
  /**
   * Переводит ссылку в состояние загрузки.
   */
  loading?: boolean;
  /**
   * Обычный объект с переменными темы.
   * Он будет объединён с темой из контекста.
   */
  theme?: ThemeIn;
  /**
   * @ignore
   */
  focused?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
}

const LINK_DEFAULT_COMPONENT = 'a';

export type LinkProps<C extends ButtonLinkAllowedValues = typeof LINK_DEFAULT_COMPONENT> = PolymorphicPropsWithoutRef<
  LinkInnerProps,
  C
>;
export interface LinkState {
  focusedByTab: boolean;
}

export const LinkDataTids = {
  root: 'Link__root',
} as const;

type DefaultProps = Required<Pick<LinkProps<ButtonLinkAllowedValues>, 'use' | 'component'>>;
type DefaultizedLinkProps = DefaultizedProps<LinkProps<ButtonLinkAllowedValues>, DefaultProps>;

/**
 * Элемент ссылки из HTML.
 */
@rootNode
export class Link<C extends ButtonLinkAllowedValues = typeof LINK_DEFAULT_COMPONENT> extends React.Component<
  LinkProps<C>,
  LinkState
> {
  public static __KONTUR_REACT_UI__ = 'Link';
  public static displayName = 'Link';

  public static defaultProps: DefaultProps = {
    use: 'default',
    component: LINK_DEFAULT_COMPONENT,
  };

  private getProps = createPropsGetter(Link.defaultProps);

  public state: LinkState = {
    focusedByTab: false,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;

  public render(): JSX.Element {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = this.props.theme ? ThemeFactory.create(this.props.theme as Theme, theme) : theme;
                return (
                  <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
                    {this.renderMain}
                  </CommonWrapper>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private getTabIndex = ({
    nonInteractive,
    tabIndex = 0,
  }: {
    nonInteractive: boolean | undefined;
    tabIndex: number | undefined;
  }) => {
    return nonInteractive ? -1 : tabIndex;
  };

  private getRel = () => {
    if (isAnchorProps(this.props)) {
      const { rel, href } = this.props;
      if (!rel && href) {
        return `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
      }
      return rel;
    }

    return undefined;
  };

  private renderMain = (props: CommonWrapperRestProps<DefaultizedLinkProps>) => {
    const {
      disabled,
      icon,
      rightIcon,
      use,
      loading,
      _button,
      _buttonOpened,
      component: Root,
      focused = false,
      error,
      warning,
      tabIndex,
      theme,
      ...rest
    } = props;
    const styles = this.styles;

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow()} />;
    }

    const isFocused = !disabled && (this.state.focusedByTab || focused);

    const leftIconElement = icon && <LinkIcon icon={icon} loading={loading} position="left" />;
    const rightIconElement = rightIcon && (
      <LinkIcon hasBothIcons={!!icon && !!rightIcon} icon={rightIcon} loading={loading} position="right" />
    );
    const nonInteractive = disabled || loading;

    const rootProps = {
      ...rest,
      className: this.emotion.cx({
        [styles.root(this.theme)]: true,
        [resetButton(this.emotion)]: Root === 'button',
        [styles.focus(this.theme)]: isFocused,
        [styles.disabled(this.theme)]: disabled || loading,
        [styles.useDefault(this.theme)]: use === 'default',
        [styles.useSuccess(this.theme)]: use === 'success',
        [styles.useDanger(this.theme)]: use === 'danger',
        [styles.useGrayed(this.theme)]: use === 'grayed',
        [styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        [styles.button(this.theme)]: !!_button,
        [styles.buttonOpened(this.theme)]: !!_buttonOpened,
        [styles.warning(this.theme)]: warning,
        [styles.error(this.theme)]: error,
        [styles.lineFocus(this.theme)]: isFocused && use === 'default',
        [styles.lineFocusSuccess(this.theme)]: isFocused && use === 'success',
        [styles.lineFocusDanger(this.theme)]: isFocused && use === 'danger',
        [styles.lineFocusGrayed(this.theme)]: isFocused && use === 'grayed',
      }),
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.getTabIndex({ nonInteractive, tabIndex }),
      rel: this.getRel(),
    };

    return (
      <Root data-tid={LinkDataTids.root} {...rootProps} {...getVisualStateDataAttributes({ disabled })}>
        {leftIconElement}
        {this.props.children}
        {rightIconElement}
        {arrow}
      </Root>
    );
  };

  private handleFocus = () => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      globalObject.requestAnimationFrame?.(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private handleClick = (event: React.MouseEvent) => {
    const { onClick, disabled, loading } = this.props;

    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };
}

const isAnchorProps = (props: LinkProps<any>): props is LinkProps<'a'> => {
  return props.component === 'a';
};
