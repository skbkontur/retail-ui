import React from 'react';

import { cx } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';
import { ClickableButtonIcon } from './ClickableButtonIcon';
import { ClickableButtonLoadingIcon } from './ClickableButtonLoadingIcon';
import { buttonCaptionStyles } from './ClickableButtonCaption.styles';
import { clickableGlobalClasses } from './Clickable.styles';

export const ClickableButtonCaption = ({ leftIcon, rightIcon, disabled, loading, size, children }: ClickableProps) => {
  const isLoadingWithoutIcons = !leftIcon && !rightIcon && loading;

  return (
    <div
      className={cx({
        [buttonCaptionStyles.buttonCaption()]: true,
        [buttonCaptionStyles.buttonCaptionDisabled()]: disabled,
      })}
    >
      {isLoadingWithoutIcons && <ClickableButtonLoadingIcon size={size} />}
      {leftIcon && (
        <ClickableButtonIcon size={size} loading={loading} position="left" icon={leftIcon}>
          {children}
        </ClickableButtonIcon>
      )}
      <span
        data-tid="test"
        aria-live="assertive"
        className={cx({
          [clickableGlobalClasses.text]: true,
          [buttonCaptionStyles.buttonVisibilityHidden()]: isLoadingWithoutIcons,
        })}
      >
        {children}
      </span>
      {rightIcon && (
        <ClickableButtonIcon
          size={size}
          loading={loading}
          position="right"
          icon={rightIcon}
          hasBothIcons={!!leftIcon && !!rightIcon}
        >
          {children}
        </ClickableButtonIcon>
      )}
    </div>
  );
};
