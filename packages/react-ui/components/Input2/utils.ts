import { cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { InputIconType, InputProps, InputState } from './Input';
import { styles } from './Input.styles';
import { InputContextProps } from './InputContext';

export const getIconClassnames = ({
  size,
  focused,
  disabled,
  side,
  theme,
}: {
  size: InputProps['size'];
  focused: InputState['focused'];
  disabled: InputProps['disabled'];
  side: 'left' | 'right';
  theme: Theme;
}) => {
  const isLeft = side === 'left';
  const isRight = side === 'right';
  const isSmall = !size || size === 'small';
  const isMedium = size === 'medium';
  const isLarge = size === 'large';
  return {
    [styles.icon()]: true,
    [styles.useDefaultColor(theme)]: true,
    [styles.iconFocus(theme)]: focused,
    [styles.iconDisabled()]: disabled,
    [styles.leftIconSmall(theme)]: isLeft && isSmall,
    [styles.rightIconSmall(theme)]: isRight && isSmall,
    [styles.leftIconMedium(theme)]: isLeft && isMedium,
    [styles.rightIconMedium(theme)]: isRight && isMedium,
    [styles.leftIconLarge(theme)]: isLeft && isLarge,
    [styles.rightIconLarge(theme)]: isRight && isLarge,
  };
};

export const renderIcon = (icon: InputIconType) => {
  return icon instanceof Function ? icon() : icon;
};

export const isMaskVisible = ({ mask, focused, alwaysShowMask }: InputContextProps) => {
  return Boolean(mask && (focused || alwaysShowMask));
};

export const getInputProps = (context: InputContextProps, theme: Theme) => {
  const {
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onKeyDown,
    onKeyPress,
    onValueChange,
    width,
    error,
    warning,
    leftIcon,
    rightIcon,
    borderless,
    value,
    align,
    mask,
    maskChar,
    alwaysShowMask,
    size,
    placeholder,
    selectAllOnFocus,
    disabled,
    onUnexpectedInput,
    prefix,
    suffix,
    formatChars,
    focused,
    type,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleKeyPress,
    refInput,
    needsPolyfillPlaceholder,
    ...rest
  } = context;

  return {
    ...rest,
    className: cx(styles.input(theme), {
      [styles.inputFocus(theme)]: focused,
      [styles.inputDisabled(theme)]: disabled,
    }),
    value,
    onChange: handleChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyPress: handleKeyPress,
    onBlur: handleBlur,
    style: { textAlign: align },
    type: type === 'password' ? 'password' : 'text',
    ref: refInput,
    placeholder: !isMaskVisible && !needsPolyfillPlaceholder ? placeholder : undefined,
    disabled,
  };
};
