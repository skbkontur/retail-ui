import type { AriaAttributes } from 'react';
import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Button } from '../Button';
import type { SizeProp } from '../../lib/types/props';
import { useSizeControl } from '../../lib/size/useSizeControl';

import { UndoIcon } from './UndoIcon';
import type { FxInputProps } from './FxInput';

interface FxInputRestoreBtnProps
  extends Pick<AriaAttributes, 'aria-label'>,
    Pick<FxInputProps, 'size' | 'onRestore' | 'borderless' | 'disabled'> {
  /** @ignore */
  corners?: React.CSSProperties;
}

export const FxInputRestoreBtn: React.FunctionComponent<FxInputRestoreBtnProps> = (props) => {
  const theme = useContext(ThemeContext);
  const size = useSizeControl(props.size);

  const iconSizes: Record<SizeProp, number> = {
    small: parseInt(theme.inputIconSizeSmall),
    medium: parseInt(theme.inputIconSizeMedium),
    large: parseInt(theme.inputIconSizeLarge),
  };
  const cornersSizes: Record<SizeProp, React.CSSProperties> = {
    small: {
      borderTopLeftRadius: theme.inputBorderRadiusSmall,
      borderBottomLeftRadius: theme.inputBorderRadiusSmall,
    },
    medium: {
      borderTopLeftRadius: theme.inputBorderRadiusMedium,
      borderBottomLeftRadius: theme.inputBorderRadiusMedium,
    },
    large: {
      borderTopLeftRadius: theme.inputBorderRadiusLarge,
      borderBottomLeftRadius: theme.inputBorderRadiusLarge,
    },
  };
  const buttonCorners = cornersSizes[size];
  const iconUndo = <UndoIcon size={iconSizes[size]} />;

  return (
    <Button
      size={props.size}
      onClick={props.onRestore}
      borderless={props.borderless}
      disabled={props.disabled}
      corners={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        ...buttonCorners,
        ...props.corners,
      }}
      icon={iconUndo}
      aria-label={props['aria-label']}
    />
  );
};
