import React, { useContext } from 'react';

import { Input, InputSize } from '../Input';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { UndoIcon } from '../../internal/icons/16px';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ArrowShapeDRadiusUpLeftLightIcon } from '../../internal/icons/16px/Icons2022';
import { Button } from '../Button';

import { FxInputProps } from './FxInput';

type FxInputRestoreBtnProps = Pick<FxInputProps, 'size' | 'onRestore' | 'borderless' | 'disabled'>;

export const FxInputRestoreBtn: React.FunctionComponent<FxInputRestoreBtnProps> = (props) => {
  const theme = useContext(ThemeContext);

  let iconUndo = <UndoIcon />;
  let buttonWidth = 'auto';
  let buttonCorners;

  if (isTheme2022(theme)) {
    const size = props.size || Input.defaultProps.size;

    const iconSizes: Record<InputSize, number> = {
      small: parseInt(theme.inputIconSizeSmall),
      medium: parseInt(theme.inputIconSizeMedium),
      large: parseInt(theme.inputIconSizeLarge),
    };
    const buttonWidths: Record<InputSize, string> = {
      small: `${iconSizes.small * 2}px`,
      medium: `${iconSizes.medium * 2}px`,
      large: `${iconSizes.large * 2}px`,
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
    buttonCorners = cornersSizes[size];
    buttonWidth = buttonWidths[size];
    iconUndo = <ArrowShapeDRadiusUpLeftLightIcon size={iconSizes[size]} />;
  }

  return (
    <Button
      width={buttonWidth}
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
