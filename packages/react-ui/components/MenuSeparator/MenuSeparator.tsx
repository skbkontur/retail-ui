import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../../internal/CommonWrapper';

import { styles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;

/**
 * Добавляет разделительную линию между элементами меню.
 *
 * Сущности в которых может быть использован `MenuSeparator`: [`DropdownMenu`](#/Components/DropdownMenu), [`Kebab`](#/Components/Kebab), [`TooltipMenu`](#/Components/TooltipMenu) и [`Select`](#/Components/Select).
 */
export const MenuSeparator = forwardRefAndName<HTMLDivElement, MenuSeparatorProps>(
  'MenuSeparator',
  ({ className, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    return <div ref={ref} className={cx(styles.root(theme), className)} {...rest} />;
  },
);
