import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { styles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;
/**
 * Добавляет разделительную линию между элементами меню.
 *
 * Сущности в которых может быть использован `MenuSeparator`: [`DropdownMenu`](https://tech.skbkontur.ru/react-ui/#/Components/DropdownMenu), [`Kebab`](https://tech.skbkontur.ru/react-ui/#/Components/Kebab) и [`TooltipMenu`](https://tech.skbkontur.ru/react-ui/#/Components/TooltipMenu).
 */
function MenuSeparator(props: MenuSeparatorProps) {
  const theme = useContext(ThemeContext);

  return (
    <CommonWrapper {...props}>
      <div className={styles.root(theme)} />
    </CommonWrapper>
  );
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';

export { MenuSeparator };
