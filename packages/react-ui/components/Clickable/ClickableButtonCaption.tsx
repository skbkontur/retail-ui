import React from 'react';

import { cx } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';
import { ClickableButtonIcon, ClickableButtonIconProps } from './ClickableButtonIcon';
import { ClickableButtonLoadingIcon } from './ClickableButtonLoadingIcon';
import { buttonCaptionStyles } from './ClickableButtonCaption.styles';
import { clickableGlobalClasses } from './Clickable.styles';

export const ClickableButtonCaption = ({
  leftIcon,
  rightIcon,
  isDisabled,
  isLoading,
  size,
  children,
}: ClickableProps) => {
  const iconProps: Omit<ClickableButtonIconProps, 'position' | 'icon'> = {
    size,
    isLoading,
    hasChildren: !!children,
  };

  return (
    <div
      className={cx({
        [buttonCaptionStyles.buttonCaption()]: true,
        [buttonCaptionStyles.buttonCaptionDisabled()]: isDisabled,
      })}
    >
      {!leftIcon && !rightIcon && isLoading && <ClickableButtonLoadingIcon size={size} />}
      {leftIcon && <ClickableButtonIcon {...iconProps} position="left" icon={leftIcon} />}
      <span
        data-tid="test"
        aria-live="assertive"
        className={cx({
          [clickableGlobalClasses.text]: true,
          [buttonCaptionStyles.buttonVisibilityHidden()]: isLoading,
        })}
      >
        {children}
      </span>
      {rightIcon && (
        <ClickableButtonIcon
          {...iconProps}
          position="right"
          icon={rightIcon}
          hasBothIcons={!!leftIcon && !!rightIcon}
        />
      )}
    </div>
  );
};
