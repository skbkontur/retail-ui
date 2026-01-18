import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { ResponsiveLayout } from '../ResponsiveLayout/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';

import { getStyles } from './MenuSeparator.styles.js';

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
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);

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
