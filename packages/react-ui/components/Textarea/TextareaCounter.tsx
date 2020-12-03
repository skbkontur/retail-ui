import React, { CSSProperties, FC, ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './Textarea.styles';
import { TextareaCounterHelp } from './TextareaCounterHelp';

type TextareaCounterProps = {
  value: Nullable<string | string[] | number>;
  textareaWidth: number;
  textareaHeight: number;
  length: number;
  counterHelp?: ReactNode | string;
};

export const TextareaCounter: FC<TextareaCounterProps> = props => {
  const { textareaWidth, length, value, counterHelp, textareaHeight } = props;

  const theme = useContext(ThemeContext);

  const textareaValue: number = value ? value.toString().length : 0;
  const counterValue: number = length - textareaValue;

  const isError = counterValue < 0;
  const counterStyle: CSSProperties = {
    right: parseInt(theme.textareaPaddingX, 10),
    bottom: parseInt(theme.textareaBorderWidth, 10),
    visibility: textareaWidth && textareaHeight ? 'visible' : 'hidden',
  };

  return (
    <div className={jsStyles.counterContainer()} style={{ width: textareaWidth, height: textareaHeight }}>
      <span
        className={cn({
          [jsStyles.counter(theme)]: true,
          [jsStyles.counterError(theme)]: isError,
        })}
        style={counterStyle}
      >
        <span>{counterValue}</span>
        {!!counterHelp && <TextareaCounterHelp counterHelp={counterHelp} />}
      </span>
    </div>
  );
};
