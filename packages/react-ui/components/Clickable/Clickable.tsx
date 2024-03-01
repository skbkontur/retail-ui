import React, { CSSProperties, useCallback, useContext, useState } from 'react';
import { HTMLProps } from 'react-ui/typings/html';
import { globalObject } from '@skbkontur/global-object';

import { SizeProp } from '../../lib/types/props';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
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
import { ClickableLink } from './ClickableLink';
import { ClickableButton } from './ClickableButton';
import { ClickableButtonWrapper } from './ClickableButtonWrapper';
import { getButtonSize, getButtonStyles } from './ClickableButton.styles';
import { getLinkStyles } from './ClickableLink.styles';

export const CLICKABLE_DEFAULT_ELEMENT = 'button';
const COMPONENT_NAME = 'Clickable';

export type ClickableUse = 'default' | 'success' | 'danger' | 'grayed' | 'primary' | 'pay' | 'text' | 'backless';
export type ClickableSize = SizeProp;

interface ClickableOwnProps
  extends CommonProps,
    Pick<HTMLProps['a'], 'rel' | 'href'>,
    Pick<HTMLProps['button'], 'type'> {
  /**
   * Стиль контрола.
   *
   * Возможные значения: `"default"`, `"success"`, `"danger"`, `"grayed"`, `"primary"`, `"pay"`, `"text"`, `"backless"`.
   */
  use?: ClickableUse;
  /**
   * Определяет как будет выглядеть контрол, не влияет на семантику.
   */
  view?: 'button' | 'link';
  /**
   * Размер контрола.
   *
   * Возможные значения: `"small"`, `"medium"`, `"large"`.
   */
  size?: SizeProp;
  /**
   * Позвоялет перевести контрол в состояние загрузки.
   */
  isLoading?: boolean;
  /**
   * Позволяет отключить контрол.
   */
  isDisabled?: boolean;
  /**
   * Применяет к кнопке стили псеводкласса :active.
   */
  isActive?: boolean;
  /**
   * Позволяет задать иконку слева от контрола.
   */
  leftIcon?: React.ReactNode;
  /**
   * Позволяет задать иконку справа от контрола.
   */
  rightIcon?: React.ReactNode;
  /**
   * Объект, в который можно передать переменные темы.
   * Он будет объединён с темой из контекста.
   */
  theme?: ThemeIn;
  /**
   * CSS-свойство `width`.
   */
  width?: CSSProperties['width'];
  /**
   * CSS-свойство `text-align`.
   */
  align?: CSSProperties['textAlign'];
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Превращает кнопку в кнопку со стрелкой.
   */
  arrow?: 'left' | 'right';
  /**
   * Сужает кнопку.
   */
  isNarrow?: boolean;
  /**
   * Убирает обводку у кнопки.
   */
  isBorderless?: boolean;
  /**
   * @ignore
   */
  corners?: CSSProperties;
}

export type ClickableProps<T extends React.ElementType = typeof CLICKABLE_DEFAULT_ELEMENT> = PolymorphicPropsWithRef<
  ClickableOwnProps,
  T
>;

export const ClickableDataTids = {
  root: 'Clickable__root',
  spinner: 'Clickable__spinner',
} as const;

/**
 * Это гибридный контрол, который позволяет рендерить элемент выглядящий как кнопка или как ссылка с любым тегом.
 */
export const Clickable: PolymorphicForwardRefExoticComponent<ClickableOwnProps, typeof CLICKABLE_DEFAULT_ELEMENT> =
  forwardRefAndName(COMPONENT_NAME, function Clickable<
    T extends React.ElementType = typeof CLICKABLE_DEFAULT_ELEMENT,
  >({ as, size, arrow, corners, use, rel, theme: userTheme, href, isNarrow, tabIndex, type = 'button', view, leftIcon, rightIcon, onClick, onFocus, onBlur, isLoading, isDisabled, isActive, isBorderless, width, warning, error, align, style, className, children, ...rest }: PolymorphicPropsWithoutRef<ClickableOwnProps, T>, ref: React.ForwardedRef<Element>) {
    const Root: React.ElementType = as ?? CLICKABLE_DEFAULT_ELEMENT;

    const contextTheme = useContext(ThemeContext);
    const theme = userTheme ? ThemeFactory.create(userTheme, contextTheme) : contextTheme;

    const buttonSize = getButtonSize({ size, leftIcon, rightIcon, children, theme });
    const currentView = getCurrentView(view, as);

    const isNotInteractive = isLoading || isDisabled;

    const [isFocused, setIsFocused] = useState(false);
    const isRootFocused = isFocused && !isNotInteractive;
    const handleFocus = useCallback(
      (e: React.FocusEvent) => {
        if (!isNotInteractive) {
          // focus event fires before keyDown eventlistener
          // so we should check tabPressed in async way
          globalObject.requestAnimationFrame?.(() => {
            if (keyListener.isTabPressed) {
              setIsFocused(true);
            }
          });
        }
        onFocus?.(e);
      },
      [isNotInteractive],
    );
    const handleBlur = useCallback((e: React.FocusEvent) => {
      setIsFocused(false);
      if (!isNotInteractive) {
        onBlur?.(e);
      }
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (onClick && !isNotInteractive) {
          onClick(e);
        }
      },
      [onClick, isNotInteractive],
    );

    const content = (
      <Root
        key={ClickableDataTids.root}
        className={cx(
          generalStyles.root(theme),
          currentView === 'link' && getLinkStyles({ use, isFocused, isNotInteractive, theme }),
          currentView === 'button' &&
            getButtonStyles({
              use,
              buttonSize,
              theme,
              arrow,
              size,
              isNarrow,
              isDisabled,
              isLoading,
              isBorderless,
              isFocused,
              isActive,
            }),
          className,
        )}
        type={Root === 'button' ? type : undefined}
        data-tid={ClickableDataTids.root}
        rel={getRel(rel, href)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        style={{ textAlign: align, ...corners, ...style }}
        tabIndex={isNotInteractive ? -1 : tabIndex}
        href={href}
        ref={ref}
        {...rest}
      >
        {currentView === 'link' && (
          <ClickableLink isLoading={isLoading} isFocused={isRootFocused} leftIcon={leftIcon} rightIcon={rightIcon}>
            {children}
          </ClickableLink>
        )}
        {currentView === 'button' && (
          <ClickableButton
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isFocused={isFocused}
            arrow={arrow}
            size={size}
          >
            {children}
          </ClickableButton>
        )}
      </Root>
    );

    if (currentView === 'button') {
      return (
        <ClickableButtonWrapper width={width} size={size}>
          {content}
        </ClickableButtonWrapper>
      );
    }

    return content;
  });

export const isClickable = isReactUIComponent<ClickableOwnProps>(COMPONENT_NAME);
