import React, { AriaAttributes, ReactNode, useContext } from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';
import { emptyHandler } from '../../lib/utils';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';

import { TokenColors, TokenDataTids, TokenProps, TokenSize } from './Token';
import { colorStyles, globalClasses, styles } from './Token.styles';
import { TokenLocaleHelper } from './locale';

export interface TokenViewProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  textHolder?: ReactNode;
  isEditing?: boolean;
  isHelper?: boolean;
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

export const TokenView = forwardRefAndName<HTMLDivElement, TokenViewProps>(
  'TokenView',
  (
    {
      textHolder,
      isEditing,
      isHelper,
      size,
      disabled,
      error,
      warning,
      isActive,
      colors,
      onRemove = emptyHandler,
      className,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const locale = useLocaleForControl('Token', TokenLocaleHelper);

    const onRemoveClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onRemove(event);
    };

    const getSizeClassName = (size: TokenSize) => {
      switch (size) {
        case 'large':
          return styles.tokenLarge(theme);
        case 'medium':
          return styles.tokenMedium(theme);
        case 'small':
        default:
          return styles.tokenSmall(theme);
      }
    };

    const getWidthHelperSizeClassName = (size: TokenSize) => {
      switch (size) {
        case 'large':
          return styles.helperContainerLarge(theme);
        case 'medium':
          return styles.helperContainerMedium(theme);
        case 'small':
        default:
          return styles.helperContainerSmall(theme);
      }
    };

    const icon = isTheme2022(theme) ? (
      <CloseButtonIcon
        aria-label={locale.removeButtonAriaLabel}
        side={16}
        color="inherit"
        colorHover="inherit"
        tabbable={false}
      />
    ) : (
      <CrossIcon />
    );
    const validation = getValidation(error, warning);
    let classNames = '';
    if (isTheme2022(theme)) {
      classNames = cx(
        isEditing && styles.transparentBorder(theme),
        !isEditing && styles.tokenDefaultIdle2022(theme),
        !isEditing && !isActive && !warning && !error && !disabled && styles.tokenDefaultIdleHovering2022(theme),
        isActive && styles.tokenDefaultActive2022(theme),
        warning && styles.tokenWarning2022(theme),
        error && styles.tokenError2022(theme),
        disabled && styles.tokenDisabled2022(theme),
      );
    } else {
      classNames = cx(
        colors && colorStyles[colors.idle](theme, validation),
        !!isActive && colors && colorStyles[colors.active || colors.idle](theme, validation),
        !!disabled && styles.disabled(theme),
        isEditing && !!disabled && colorStyles.defaultEditingDisabled(),
        !isEditing && !!disabled && colorStyles.defaultDisabled(theme),
        !!disabled && warning && colorStyles.defaultDisabledWarning(theme),
        !!disabled && error && colorStyles.defaultDisabledError(theme),
      );
    }

    return (
      <CommonWrapper
        textHolder={textHolder}
        isEditing={isEditing}
        isHelper={isHelper}
        size={size}
        disabled={disabled}
        error={error}
        warning={warning}
        isActive={isActive}
        colors={colors}
        onRemove={onRemove}
        className={className}
        {...rest}
      >
        <div
          ref={ref}
          className={cx(getSizeClassName(size ? size : 'small'), classNames, {
            [styles.token(theme)]: true,
            [styles.helperContainer()]: isHelper,
            [getWidthHelperSizeClassName(size ? size : 'small')]: isHelper,
          })}
          {...rest}
        >
          {textHolder}
          <span
            role={isTheme2022(theme) ? undefined : 'button'}
            aria-label={isTheme2022(theme) ? undefined : locale.removeButtonAriaLabel}
            className={cx(styles.removeIcon(theme), globalClasses.removeIcon, { [styles.hideCross()]: isEditing })}
            onClick={onRemoveClick}
            data-tid={TokenDataTids.removeIcon}
          >
            {icon}
          </span>
        </div>
      </CommonWrapper>
    );
  },
);
