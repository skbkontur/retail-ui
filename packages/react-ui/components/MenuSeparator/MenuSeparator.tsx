import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;

export const MenuSeparatorDataTids = {
  root: 'MenuSeparator__root',
} as const;

/**
 * `MenuSeparator` добавляет разделительную линию между элементами меню.
 *
 * Сущности в которых может быть использован `MenuSeparator`: DropdownMenu, Kebab, TooltipMenu и Select.
 */
const MenuSeparator = forwardRefAndName(
  'MenuSeparator',
  function MenuSeparator(props: MenuSeparatorProps, ref: React.Ref<HTMLDivElement>) {
    const theme = useContext(ThemeContext);

    return (
      <CommonWrapper {...props}>
        <ResponsiveLayout>
          {({ isMobile }) => {
            return (
              <div
                ref={ref}
                data-tid={MenuSeparatorDataTids.root}
                className={cx({ [styles.root(theme)]: true, [styles.rootMobile(theme)]: isMobile })}
              />
            );
          }}
        </ResponsiveLayout>
      </CommonWrapper>
    );
  },
);

export { MenuSeparator };
