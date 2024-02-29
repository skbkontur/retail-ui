import React, { useCallback, useContext, useState } from 'react';
import { HTMLProps } from 'react-ui/typings/html';
import { globalObject } from '@skbkontur/global-object';

import { SizeProp } from '../../lib/types/props';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { isDarkTheme } from '../../lib/theming/ThemeHelpers';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from '../../typings/react-ref';
import { isReactUIComponent } from '../../lib/utils';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonProps } from '../../internal/CommonWrapper';
import { ThemeIn } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';

import { generalStyles } from './Clickable.styles';
import { getCurrentView, getRel } from './utils';
import { useButtonSize } from './hooks';
import { ClickableLink } from './ClickableLink';
import { ClickableButton } from './ClickableButton';
import { linkStyles } from './ClickableLink.styles';
import { buttonStyles } from './ClickableButton.styles';

export const CLICKABLE_DEFAULT_ELEMENT = 'button';
const COMPONENT_NAME = 'Clickable';

interface ClickableOwnProps
  extends CommonProps,
    Pick<HTMLProps['a'], 'rel' | 'href'>,
    Pick<HTMLProps['button'], 'type'> {
  use?: 'default' | 'success' | 'danger' | 'grayed' | 'primary' | 'pay' | 'text' | 'backless';
  view?: 'button' | 'link';
  size?: SizeProp;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  theme?: ThemeIn;
}

export type ClickableProps<T extends React.ElementType = typeof CLICKABLE_DEFAULT_ELEMENT> = PolymorphicPropsWithRef<
  ClickableOwnProps,
  T
>;

export const ClickableDataTids = {
  root: 'Clickable__root',
} as const;

export const Clickable: PolymorphicForwardRefExoticComponent<ClickableOwnProps, typeof CLICKABLE_DEFAULT_ELEMENT> =
  forwardRefAndName(COMPONENT_NAME, function Clickable<
    T extends React.ElementType = typeof CLICKABLE_DEFAULT_ELEMENT,
  >({ as, size, use, rel, theme: userTheme, href, tabIndex, type = 'button', view, leftIcon, onClick, isLoading, isDisabled, children, ...rest }: PolymorphicPropsWithoutRef<ClickableOwnProps, T>, ref: React.ForwardedRef<Element>) {
    const Root: React.ElementType = as ?? CLICKABLE_DEFAULT_ELEMENT;

    const contextTheme = useContext(ThemeContext);
    const theme = userTheme ? ThemeFactory.create(userTheme, contextTheme) : contextTheme;

    const buttonSize = useButtonSize(size, leftIcon, children); // TODO: leftIcon || rightIcon
    const currentView = getCurrentView(view, as);

    const isNotInteractive = isLoading || isDisabled;

    const [isFocused, setIsFocused] = useState(false);
    const isRootFocused = isFocused && !isNotInteractive;
    const handleFocus = useCallback(() => {
      if (!isNotInteractive) {
        // focus event fires before keyDown eventlistener
        // so we should check tabPressed in async way
        globalObject.requestAnimationFrame?.(() => {
          if (keyListener.isTabPressed) {
            setIsFocused(true);
          }
        });
      }
    }, [isNotInteractive]);
    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (onClick && !isNotInteractive) {
          onClick(e);
        }
      },
      [onClick, isNotInteractive],
    );

    const linkStyle = cx(
      linkStyles.linkRoot(),
      (use === 'default' || use === undefined) && linkStyles.linkDefault(theme),
      use === 'success' && linkStyles.linkSuccess(theme),
      use === 'danger' && linkStyles.linkDanger(theme),
      use === 'grayed' && linkStyles.linkGrayed(theme),
      isFocused && use === 'default' && linkStyles.linkLineFocus(theme),
      isFocused && use === 'success' && linkStyles.linkLineFocusSuccess(theme),
      isFocused && use === 'danger' && linkStyles.linkLineFocusDanger(theme),
      isFocused && use === 'grayed' && linkStyles.linkLineFocusGrayed(theme),
      isNotInteractive && linkStyles.linkDisabled(theme),
      isNotInteractive && isDarkTheme(theme) && linkStyles.linkDisabledDark(theme),
    );

    const buttonStyle = cx(
      buttonStyles.buttonRoot(theme),
      buttonSize,
      (use === 'default' || use === undefined) && buttonStyles.buttonDefault(theme),
      use === 'primary' && buttonStyles.buttonPrimary(theme),
      use === 'success' && buttonStyles.buttonSuccess(theme),
      use === 'danger' && buttonStyles.buttonDanger(theme),
      use === 'pay' && buttonStyles.buttonPay(theme),
      use === 'text' && buttonStyles.buttonText(theme),
      use === 'backless' && buttonStyles.buttonBackless(theme),
    );

    return (
      <Root
        className={cx(
          generalStyles.root(theme),
          currentView === 'link' && linkStyle,
          currentView === 'button' && buttonStyle,
        )}
        type={Root === 'button' ? type : undefined}
        data-tid={ClickableDataTids.root}
        rel={getRel(rel, href)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={isNotInteractive ? -1 : tabIndex}
        href={href}
        ref={ref}
        {...rest}
      >
        {currentView === 'link' && (
          <ClickableLink isLoading={isLoading} isFocused={isRootFocused} leftIcon={leftIcon}>
            {children}
          </ClickableLink>
        )}
        {currentView === 'button' && <ClickableButton>{children}</ClickableButton>}
      </Root>
    );
  });

export const isClickable = isReactUIComponent<ClickableOwnProps>(COMPONENT_NAME);
