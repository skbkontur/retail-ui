import React from 'react';

import { cx } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';
import { globalClasses } from './Clickable.styles';
import { buttonStyles } from './ClickableButton.styles';
import { ClickableButtonIcon, ClickableButtonIconProps } from './ClickableButtonIcon';
import { ClickableLoadingButtonIcon } from './ClickableLoadingButtonIcon';

export const ClickableButtonCaption = ({
  leftIcon,
  rightIcon,
  isDisabled,
  isLoading,
  size,
  children,
}: ClickableProps) => {
  const hasLoadingNode = isLoading && !leftIcon && !rightIcon;
  const iconProps: Omit<ClickableButtonIconProps, 'position' | 'icon'> = {
    size,
    isLoading,
    hasChildren: !!children,
  };

  return (
    <div
      className={cx(buttonStyles.buttonCaption(), globalClasses.caption, {
        [buttonStyles.buttonCaptionDisabled()]: isDisabled,
      })}
    >
      {hasLoadingNode && <ClickableLoadingButtonIcon size={size} />}
      {leftIcon && <ClickableButtonIcon {...iconProps} position="left" icon={leftIcon} />}
      <span
        className={cx(globalClasses.text, {
          [buttonStyles.buttonVisibilityHidden()]: hasLoadingNode,
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
