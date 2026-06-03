import type { SyntheticEvent } from 'react';
import React, { useCallback } from 'react';

import { Tooltip } from '../../../components/Tooltip/Tooltip.js';
import { QuestionCircleIcon16Light } from '../../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon16Light.js';
import { QuestionCircleIcon20Regular } from '../../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon20Regular.js';
import { QuestionCircleIcon24Regular } from '../../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon24Regular.js';
import { useEmotion, useStyles } from '../../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../../lib/types/props.js';
import { isFunction } from '../../../lib/utils.js';
import { InputDataTids, type InputProps } from '../Input.js';
import { getStylesLayout } from './InputLayout.styles.js';

export interface InputLayoutAsideCounterProps {
  length: number;
  inputValue: InputProps['value'];
  help: InputProps['counterHelp'];
  onCloseHelp?: () => void;
  size?: SizeProp;
}

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

export const InputLayoutAsideCounter: React.FunctionComponent<InputLayoutAsideCounterProps> = ({
  length,
  inputValue,
  help,
  onCloseHelp,
  size,
}) => {
  const theme = React.useContext(ThemeContext);
  const { cx } = useEmotion();
  const stylesLayout = useStyles(getStylesLayout);

  const renderTooltipContent = useCallback(() => {
    if (typeof help === 'function') {
      return help();
    }
    return help;
  }, [help]);

  const getHelpIcon = () => {
    switch (size) {
      case 'large':
        return <QuestionCircleIcon24Regular {...helpIconProps} />;
      case 'medium':
        return <QuestionCircleIcon20Regular {...helpIconProps} />;
      case 'small':
      default:
        return <QuestionCircleIcon16Light {...helpIconProps} />;
    }
  };
  const helpIconProps = {
    onMouseDown: handleHelpMouseDown,
    color: theme.inputCounterHelpIconColor,
    'data-tid': InputDataTids.counterHelpIcon,
    style: { cursor: 'pointer' },
  };
  const counterHelp = isFunction(help) ? (
    help()
  ) : (
    <Tooltip
      pos={'right bottom'}
      trigger={'click'}
      render={renderTooltipContent}
      onCloseClick={onCloseHelp}
      size={size}
    >
      {getHelpIcon()}
    </Tooltip>
  );

  const asideClassName = stylesLayout.aside();
  const getCounterSizeClassName = () => {
    switch (size) {
      case 'large':
        return stylesLayout.counterLarge(theme);
      case 'medium':
        return stylesLayout.counterMedium(theme);
      case 'small':
      default:
        return stylesLayout.counterSmall(theme);
    }
  };

  const inputValueLength = inputValue ? inputValue.length : 0;
  const counterValue = length - inputValueLength;
  const isNegativeValue = counterValue < 0;

  return (
    <span
      data-tid={InputDataTids.counter}
      className={cx(asideClassName, getCounterSizeClassName(), stylesLayout.counter(theme), {
        [stylesLayout.counterError(theme)]: isNegativeValue,
      })}
    >
      {isNegativeValue ? `–${-counterValue}` : counterValue}
      {help && <span className={stylesLayout.counterHelp(theme)}>{counterHelp}</span>}
    </span>
  );
};
