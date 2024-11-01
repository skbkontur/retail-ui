import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';

import { styles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;

export const MenuSeparatorDataTids = {
  root: 'MenuSeparator__root',
} as const;
/**
 * Добавляет разделительную линию между элементами меню.
 *
 * Сущности в которых может быть использован `MenuSeparator`: [DropdownMenu](#/Components/DropdownMenu), [Kebab](#/Components/Kebab), [TooltipMenu](#/Components/TooltipMenu) и [Select](#/Components/Select).
 */
function MenuSeparator(props: MenuSeparatorProps) {
  const theme = useContext(ThemeContext);

  return (
    <CommonWrapper {...props}>
      <ResponsiveLayout>
        {({ isMobile }) => {
          return (
            <div
              data-tid={MenuSeparatorDataTids.root}
              className={cx({ [styles.root(theme)]: true, [styles.rootMobile(theme)]: isMobile })}
            />
          );
        }}
      </ResponsiveLayout>
    </CommonWrapper>
  );
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';
MenuSeparator.displayName = 'MenuSeparator';

export { MenuSeparator };
