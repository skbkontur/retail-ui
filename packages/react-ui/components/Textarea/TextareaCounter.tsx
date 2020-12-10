import React, { FC, SyntheticEvent, useContext } from 'react';
import cn from 'classnames';

import { HelpDotIcon } from '../../internal/icons/16px';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { Tooltip } from '../Tooltip';

import { TextareaProps } from './Textarea';
import { jsStyles } from './Textarea.styles';

type TextareaCounterProps = {
  value: TextareaProps['value'];
  width: number;
  height: number;
  length: number;
  help: TextareaProps['counterHelp'];
  onCloseHelp: () => void;
};

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

export const TextareaCounter: FC<TextareaCounterProps> = ({ width, height, length, value, help, onCloseHelp }) => {
  const theme = useContext(ThemeContext);
  const textareaValue = value ? value.toString().length : 0;
  const counterValue = length - textareaValue;
  const counterHelp = isFunction(help) ? (
    help()
  ) : (
    <Tooltip pos={'right bottom'} trigger={'click'} render={() => help} onCloseRequest={onCloseHelp}>
      <HelpDotIcon onMouseDown={handleHelpMouseDown} color={theme.linkColor} />
    </Tooltip>
  );

  return (
    <div className={jsStyles.counterContainer()} style={{ width, height }}>
      <span
        className={cn(jsStyles.counter(theme), {
          [jsStyles.counterError(theme)]: counterValue < 0,
        })}
      >
        {counterValue}
        {help && <span className={jsStyles.counterHelp()}>{counterHelp}</span>}
      </span>
    </div>
  );
};

export const calcTextareaWidth = (node: HTMLTextAreaElement): number => {
  const { clientWidth, offsetWidth } = node;
  const borderRightWidth = parseFloat(getComputedStyle(node).getPropertyValue('border-right-width'));
  const scrollWidth = offsetWidth - clientWidth - borderRightWidth;

  return offsetWidth - scrollWidth;
};
