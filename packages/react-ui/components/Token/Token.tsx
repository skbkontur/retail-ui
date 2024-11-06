import React, { AriaAttributes } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { locale } from '../../lib/locale/decorators';
import { emptyHandler } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { SizeProp } from '../../lib/types/props';
import { reactGetTextContent } from '../../lib/reactGetTextContent';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Token.styles';
import { TokenLocale, TokenLocaleHelper } from './locale';
import { TokenView } from './TokenView';

export type TokenSize = SizeProp;

export interface TokenProps extends Pick<AriaAttributes, 'aria-describedby'>, CommonProps {
  isActive?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  disabled?: boolean;
  /**
   * Размер
   */
  size?: TokenSize;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const TokenDataTids = {
  root: 'Token__root',
  removeIcon: 'Token__removeIcon',
} as const;

@rootNode
@locale('Token', TokenLocaleHelper)
export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';
  public static displayName = 'Token';

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;
  private readonly locale!: TokenLocale;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private renderMain() {
    const {
      size,
      children,
      isActive,
      error,
      warning,
      disabled,
      'aria-describedby': ariaDescribedby,
      onClick = emptyHandler,
      onDoubleClick = emptyHandler,
      onMouseEnter = emptyHandler,
      onMouseLeave = emptyHandler,
      onFocus = emptyHandler,
      onBlur = emptyHandler,
    } = this.props;

    const theme = this.theme;

    const removeButtonAriaLabel = this.locale.removeButtonAriaLabel + ' ' + reactGetTextContent(children);

    const icon = (
      <CloseButtonIcon
        side={16}
        color="inherit"
        colorHover="inherit"
        aria-label={removeButtonAriaLabel}
        tabbable={false}
      />
    );

    const styles = this.styles;
    const classNames = this.emotion.cx(
      styles.tokenIdle(theme),
      !isActive && !warning && !error && !disabled && styles.tokenHover(theme),
      isActive && styles.tokenActive(theme),
      warning && styles.tokenWarning(theme),
      error && styles.tokenError(theme),
      disabled && styles.tokenDisabled(theme),
    );

    const textholder = <span className={styles.text()}>{children}</span>;

    const closeButton = (
      <span onClick={this.onRemoveClick} data-tid={TokenDataTids.removeIcon}>
        {icon}
      </span>
    );

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props} {...getVisualStateDataAttributes({ disabled })}>
        <TokenView
          className={classNames}
          size={size}
          closeButton={closeButton}
          data-tid={TokenDataTids.root}
          aria-describedby={ariaDescribedby}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {textholder}
        </TokenView>
      </CommonWrapper>
    );
  }

  private onRemoveClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { disabled, onRemove = emptyHandler } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onRemove(event);
  };
}
