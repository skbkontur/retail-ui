import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { useTheme } from '../../lib/theming/useTheme';
import { useEmotion } from '../../lib/theming/Emotion';

import { getStyles } from './MenuSeparator.styles';

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
  const theme = useTheme();
  const emotion = useEmotion();
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
