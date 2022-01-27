import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MenuItem.styles';
import { getWrapper, getContent } from './utils';
import { MenuItemIcon } from './MenuItemIcon';
import { MenuItemComment } from './MenuItemComment';

export type MenuItemState = null | undefined | 'hover' | 'selected';

type MenuItemInterface = {
  /**
   * @ignore
   */
  _enableIconPadding?: boolean;
  /**
   * Добавляет описание для элемента меню.
   */
  comment?: React.ReactNode;
  /**
   * Отключенное состояние.
   */
  disabled?: boolean;
  /**
   * Добавляет элементу меню иконку.
   */
  icon?: React.ReactNode;
  /**
   * Меняет цвет текста на синий.
   */
  link?: boolean;
  /**
   * @ignore
   */
  loose?: boolean;
  /**
   * @ignore
   */
  state?: MenuItemState;
  /**
   * @ignore
   */
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);
  /**
   * Заменяет корневой элемент, на компонент переданный в проп.
   *
   * По умолчанию корневой элемент рендерится как `button`. <br />Если передан `href`, то вместо `button` рендерится `a`.
   */
  component?: React.ComponentType<any>;
};

export type MenuItemProps = CommonProps &
  Override<React.HTMLAttributes<HTMLElement>, MenuItemInterface> &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

/**
 * `MenuItem` - это вложенный компонент, задающий базовые стили для элемента меню и позволяющий навигироваться по элементам меню с помощью клавиатуры.
 *
 * Сущности в которых может быть использован `MenuItem`: [`DropdownMenu`](#/Components/DropdownMenu), [`Kebab`](#/Components/Kebab), [`TooltipMenu`](#/Components/TooltipMenu) и [`Select`](#/Components/Select).
 */
const MenuItemFC = forwardRefAndName<HTMLElement, MenuItemProps>('MenuItemFC', (props, ref) => {
  const {
    instanceRef,
    icon,
    disabled,
    link,
    _enableIconPadding,
    loose,
    state,
    component,
    comment,
    children,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;

  const theme = useContext(ThemeContext);

  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const isHovered = state === 'hover' && !disabled;
  const isSelected = state === 'selected';
  const hasIcon = !!icon || _enableIconPadding;

  /**
   * https://github.com/facebook/react/issues/10109
   *
   * `mouseenter` event is not triggered
   * when cursor moves away from disabled button.
   */
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasMouseEntered && onMouseEnter) {
      setHasMouseEntered(true);
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setHasMouseEntered(false);
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const Wrapper = getWrapper(disabled, component, rest.href);
  const content = getContent(children, state);

  return (
    <CommonWrapper {...props}>
      <Wrapper
        {...rest}
        ref={ref}
        state={state}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cx({
          [styles.root(theme)]: true,
          [styles.loose()]: loose,
          [styles.hover(theme)]: isHovered,
          [styles.selected(theme)]: isSelected,
          [styles.link(theme)]: link,
          [styles.withIcon(theme)]: hasIcon,
          [styles.disabled(theme)]: disabled,
        })}
        disabled={disabled}
        tabIndex={-1}
      >
        {icon && <MenuItemIcon>{icon}</MenuItemIcon>}
        {content}
        {comment && <MenuItemComment isHovered={isHovered}>{comment}</MenuItemComment>}
      </Wrapper>
    </CommonWrapper>
  );
});

MenuItemFC.propTypes = {
  comment: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loose: PropTypes.bool,
  onClick: PropTypes.func,
};

export const MenuItem = withClassWrapper(MenuItemFC);
export type MenuItem = InstanceType<typeof MenuItem>;

Object.assign(MenuItem, { __MENU_ITEM__: true });

export const isMenuItem = (child: React.ReactNode): child is React.ReactElement<MenuItemProps> => {
  // @ts-ignore
  return child?.type?.__KONTUR_REACT_UI__ === 'MenuItem';
};
