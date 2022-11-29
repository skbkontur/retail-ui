import React, { useContext } from 'react';

import { Input, InputSize } from '../Input';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { UndoIcon } from '../../internal/icons/16px';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Button } from '../Button';
import { ArrowShapeDRadiusUpLeftIcon16Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon16Light';
import { ArrowShapeDRadiusUpLeftIcon20Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon20Light';
import { ArrowShapeDRadiusUpLeftIcon24Regular } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon24Regular';

import { FxInputProps } from './FxInput';

type FxInputRestoreBtnProps = Pick<FxInputProps, 'size' | 'onRestore' | 'borderless' | 'disabled'>;

export const FxInputRestoreBtn: React.FunctionComponent<FxInputRestoreBtnProps> = (props) => {
  const theme = useContext(ThemeContext);

  let iconUndo = <UndoIcon />;
  let buttonCorners;

  if (isTheme2022(theme)) {
    const size = props.size || Input.defaultProps.size;

    const iconSizes: Record<InputSize, number> = {
      small: parseInt(theme.inputIconSizeSmall),
      medium: parseInt(theme.inputIconSizeMedium),
      large: parseInt(theme.inputIconSizeLarge),
    };
    const cornersSizes: Record<InputSize, React.CSSProperties> = {
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
    const undoIcons = {
      small: ArrowShapeDRadiusUpLeftIcon16Light,
      medium: ArrowShapeDRadiusUpLeftIcon20Light,
      large: ArrowShapeDRadiusUpLeftIcon24Regular,
    };
    const IconIndo = undoIcons[size];
    buttonCorners = cornersSizes[size];
    iconUndo = <IconIndo size={iconSizes[size]} />;
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
    >
      {iconUndo}
    </Button>
  );
};
