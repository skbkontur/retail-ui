import React, { AriaAttributes } from 'react';

import { Input } from '../Input';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Button } from '../Button';
import { UndoIcon } from '../../internal/icons/16px';
import { SizeProp } from '../../lib/types/props';
import { useTheme } from '../../lib/theming/useTheme';

import { UndoIcon as UndoIcon2022 } from './UndoIcon';
import { FxInputProps } from './FxInput';

interface FxInputRestoreBtnProps
  extends Pick<AriaAttributes, 'aria-label'>,
    Pick<FxInputProps, 'size' | 'onRestore' | 'borderless' | 'disabled'> {}

export const FxInputRestoreBtn: React.FunctionComponent<FxInputRestoreBtnProps> = (props) => {
  const theme = useTheme();

  let iconUndo = <UndoIcon />;
  let buttonCorners;

  if (isTheme2022(theme)) {
    const size = props.size || Input.defaultProps.size;

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
    buttonCorners = cornersSizes[size];
    iconUndo = <UndoIcon2022 size={iconSizes[size]} />;
  }

  return isTheme2022(theme) ? (
    <Button
      size={props.size}
      onClick={props.onRestore}
      borderless={props.borderless}
      disabled={props.disabled}
      corners={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        ...buttonCorners,
      }}
      icon={iconUndo}
      aria-label={props['aria-label']}
    />
  ) : (
    <Button
      size={props.size}
      narrow
      onClick={props.onRestore}
      borderless={props.borderless}
      disabled={props.disabled}
      corners={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        ...buttonCorners,
      }}
      aria-label={props['aria-label']}
    >
      {iconUndo}
    </Button>
  );
};
