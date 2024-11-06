import React, { useContext } from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;

export const MenuSeparatorDataTids = {
  root: 'MenuSeparator__root',
} as const;

/**
 * `MenuSeparator` добавляет разделительную линию между элементами меню.
 *
 * Сущности в которых может быть использован `MenuSeparator`: DropdownMenu, Kebab, TooltipMenu и Select.
 */
function MenuSeparator(props: MenuSeparatorProps) {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <CommonWrapper {...props}>
      <ResponsiveLayout>
        {({ isMobile }) => {
          return (
            <div
              data-tid={MenuSeparatorDataTids.root}
              className={emotion.cx({ [styles.root(theme)]: true, [styles.rootMobile(theme)]: isMobile })}
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
