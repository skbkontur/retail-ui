import React, { useContext } from 'react';
import { HTMLProps } from 'react-ui/typings/html';

import { SizeProp } from '../../lib/types/props';
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
import { cx } from '../../lib/theming/Emotion';

import { generalStyles } from './Clickable.styles';
import { getCurrentView, getRel } from './utils';
import { useButtonSize } from './hooks';
import { ClickableLink } from './ClickableLink';
import { ClickableButton } from './ClickableButton';
import { linkStyles } from './ClickableLink.styles';
import { buttonStyles } from './ClickableButton.styles';

export const CLICKABLE_DEFAULT_ELEMENT = 'button';
const COMPONENT_NAME = 'Clickable';

interface ClickableOwnProps extends CommonProps, Pick<HTMLProps['a'], 'rel' | 'href'> {
  use?: 'default' | 'success' | 'danger' | 'grayed' | 'primary' | 'pay' | 'text' | 'backless';
  view?: 'button' | 'link';
  size?: SizeProp;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
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
  >({ as, size, use, rel, href, view, leftIcon, isLoading, disabled, children, ...rest }: PolymorphicPropsWithoutRef<ClickableOwnProps, T>, ref: React.ForwardedRef<Element>) {
    const Root: React.ElementType = as ?? CLICKABLE_DEFAULT_ELEMENT;

    const theme = useContext(ThemeContext);
    const buttonSize = useButtonSize(size, leftIcon, children); // TODO: leftIcon || rightIcon
    const currentView = getCurrentView(view, as);
    const isLinkFocused = false; // TODO: реализовать состояние

    const linkStyle = cx(
      linkStyles.linkRoot(),
      (use === 'default' || use === undefined) && linkStyles.linkDefault(theme),
      use === 'success' && linkStyles.linkSuccess(theme),
      use === 'danger' && linkStyles.linkDanger(theme),
      use === 'grayed' && linkStyles.linkGrayed(theme),
      isLinkFocused && use === 'default' && linkStyles.linkLineFocus(theme),
      isLinkFocused && use === 'success' && linkStyles.linkLineFocusSuccess(theme),
      isLinkFocused && use === 'danger' && linkStyles.linkLineFocusDanger(theme),
      isLinkFocused && use === 'grayed' && linkStyles.linkLineFocusGrayed(theme),
      disabled && linkStyles.linkDisabled(theme),
      disabled && isDarkTheme(theme) && linkStyles.linkDisabledDark(theme),
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
        rel={getRel(rel, href)}
        href={href}
        data-tid={ClickableDataTids.root}
        ref={ref}
        {...rest}
      >
        {currentView === 'link' && (
          <ClickableLink isLoading={isLoading} leftIcon={leftIcon} isFocused={isLinkFocused}>
            {children}
          </ClickableLink>
        )}
        {currentView === 'button' && <ClickableButton>{children}</ClickableButton>}
      </Root>
    );
  });

export const isClickable = isReactUIComponent<ClickableOwnProps>(COMPONENT_NAME);
