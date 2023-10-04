import React, { AriaAttributes, ReactNode } from 'react';

import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { locale } from '../../lib/locale/decorators';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';
import { emptyHandler } from '../../lib/utils';

import { TokenColors, TokenDataTids, TokenProps, TokenSize } from './Token';
import { TokenLocale, TokenLocaleHelper } from './locale';
import { colorStyles, globalClasses, styles } from './Token.styles';

export interface TokenViewProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  textHOLDER?: ReactNode;
  hideCross?: boolean;
  disabled?: boolean;
  colors?: TokenColors;

  isActive?: boolean;
  error?: boolean;
  warning?: boolean;

  size?: TokenSize;
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

const getValidation = (error: TokenProps['error'], warning: TokenProps['warning']) => {
  if (error) {
    return 'error';
  } else if (warning) {
    return 'warning';
  }

  return null;
};

@rootNode
@locale('Token', TokenLocaleHelper)
export class TokenView extends React.Component<TokenViewProps> {
  private theme!: Theme;
  private setRootNode!: TSetRootNode;
  private readonly locale!: TokenLocale;
  private onRemoveClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { disabled, onRemove = emptyHandler } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onRemove(event);
  };
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private getSizeClassName(size: TokenSize) {
    switch (size) {
      case 'large':
        return styles.tokenLarge(this.theme);
      case 'medium':
        return styles.tokenMedium(this.theme);
      case 'small':
      default:
        return styles.tokenSmall(this.theme);
    }
  }

  private renderMain = (props: CommonWrapperRestProps<TokenViewProps>) => {
    const { textHOLDER, hideCross, size, disabled, error, warning, isActive, colors, ...rest } = props;
    const icon = isTheme2022(this.theme) ? (
      <CloseButtonIcon
        aria-label={this.locale.removeButtonAriaLabel}
        side={16}
        color="inherit"
        colorHover="inherit"
        tabbable={false}
        // hideCross ? сделать прозрачный стиль : не делать
      />
    ) : (
      <CrossIcon />
    );

    const validation = getValidation(error, warning);
    let classNames = '';
    if (isTheme2022(this.theme)) {
      classNames = cx(
        styles.tokenDefaultIdle2022(this.theme),
        !isActive && !warning && !error && !disabled && styles.tokenDefaultIdleHovering2022(this.theme),
        isActive && styles.tokenDefaultActive2022(this.theme),
        warning && styles.tokenWarning2022(this.theme),
        error && styles.tokenError2022(this.theme),
        disabled && styles.tokenDisabled2022(this.theme),
      );
    } else {
      classNames = cx(
        colors && colorStyles[colors.idle](this.theme, validation),
        !!isActive && colors && colorStyles[colors.active || colors.idle](this.theme, validation),
        !!disabled && styles.disabled(this.theme),
        !!disabled && colorStyles.defaultDisabled(this.theme),
        !!disabled && warning && colorStyles.defaultDisabledWarning(this.theme),
        !!disabled && error && colorStyles.defaultDisabledError(this.theme),
      );
    }

    const tokenClassNames = cx(this.getSizeClassName(size ? size : 'small'), classNames, {
      [styles.token(this.theme)]: true,
    });

    return (
      <div ref={this.setRootNode} data-tid={TokenDataTids.view} className={tokenClassNames} {...rest}>
        {textHOLDER}
        <span
          role={isTheme2022(this.theme) ? undefined : 'button'}
          aria-label={isTheme2022(this.theme) ? undefined : this.locale.removeButtonAriaLabel}
          className={cx(styles.removeIcon(this.theme), globalClasses.removeIcon)}
          onClick={this.onRemoveClick}
          data-tid={TokenDataTids.removeIcon}
        >
          {icon}
        </span>
      </div>
    );
  };
}
