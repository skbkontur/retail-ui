import React, { AriaAttributes, ElementType, useCallback, useEffect, useState } from 'react';

import { isReactUIComponent } from '../../lib/utils';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';

import { clickableStyles as styles } from './Clickable.styles';

export interface ClickableProps extends Pick<CommonProps, 'children'> {
  disabled?: boolean;
}

interface ClickableRootProps
  extends Omit<CommonProps, 'children'>,
    Pick<React.DOMAttributes<HTMLButtonElement>, 'onKeyDown' | 'onClick' | 'onMouseDown'>,
    Pick<HTMLElement, 'tabIndex' | 'role'>,
    Pick<AriaAttributes, 'aria-disabled'> {
  disabled?: boolean;
}

export const ClickableDataTids = {
  root: 'Clickable__root',
} as const;

const COMPONENT_NAME = 'Clickable';

const isTag = (tagName: ElementType) => {
  return (children: React.ReactElement): boolean => {
    return children.type === tagName;
  };
};

const isLinkTag = isTag('a');
const isButtonTag = isTag('button');

const getTabIndex = (isInteractive: boolean, tabIndex: number, disabled?: boolean) => {
  if (disabled) {
    return -1;
  }

  if (!isInteractive) {
    return tabIndex ?? 0;
  }

  return tabIndex;
};

const getRole = (isInteractive: boolean, role: HTMLElement['role']) => {
  if (!isInteractive) {
    return role ?? 'button';
  }

  return role;
};

export const Clickable = forwardRefAndName<HTMLElement, ClickableProps>(
  COMPONENT_NAME,
  ({ children, disabled }: ClickableProps, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const {
      className,
      role,
      tabIndex = 0,
      'aria-disabled': ariaDisabled,
      'data-tid': dataTid,
      onKeyDown,
      onMouseDown,
      disabled: disabledRoot,
    } = children.props as ClickableRootProps;

    const isLink = isLinkTag(children);
    const isButton = isButtonTag(children);
    const isButtonOrLink = isLink || isButton;

    const [isInteractive, setIsInteractive] = useState(isButtonOrLink);
    useEffect(() => {
      setIsInteractive(isButtonOrLink);
    }, [children.type]);

    const onKeyDownHandler = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const isEnter = e.key === 'Enter';
        const isSpace = e.key === ' ';
        if (!isInteractive && (isEnter || isSpace)) {
          if (isSpace) {
            // Preventing an attempt to scroll the page when a non-interactive element is being focused
            e.preventDefault();
          }

          const element = e.currentTarget;
          element.click();
        }

        if (onKeyDown) {
          onKeyDown(e);
        }
      },
      [onKeyDown, isInteractive],
    );

    const onMouseDownHandler = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isInteractive && e.detail > 1) {
          e.preventDefault();
        }
      },
      [onMouseDown, isInteractive],
    );

    return React.cloneElement(children as React.ReactElement, {
      className: cx(
        {
          [styles.root()]: true,
          [styles.disabled()]: disabled,
          [styles.disabledLink()]: disabled && isLink,
        },
        className,
      ),
      'data-tid': dataTid ?? ClickableDataTids.root,
      'aria-disabled': ariaDisabled ?? disabled,
      tabIndex: getTabIndex(isInteractive, tabIndex, disabled),
      role: getRole(isInteractive, role),
      onKeyDown: onKeyDownHandler,
      onMouseDown: onMouseDownHandler,
      disabled: disabledRoot ?? disabled,
      'data-disabled': disabled,
      ref,
    });
  },
);

export const isClickable = isReactUIComponent<ClickableProps>(COMPONENT_NAME);
