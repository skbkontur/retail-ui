import React, { CSSProperties, FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './Textarea.styles';
import { TextareaCounterHelp, TextareaCounterHelpProps } from './TextareaCounterHelp';

type TextareaCounterProps = {
  value: Nullable<string | string[] | number>;
  textareaWidth: number;
  maxAllowedCharsLength: number;
  bottom: number;
  counterHelp?: TextareaCounterHelpProps;
};

export const TextareaCounter: FC<TextareaCounterProps> = props => {
  const { textareaWidth, maxAllowedCharsLength, value, counterHelp, bottom } = props;
  const [counterWidth, setCounterWidth] = useState<number>(0);

  const theme = useContext(ThemeContext);
  const counterNode = useRef<HTMLElement>(null);

  const textareaValue: number = value ? value.toString().length : 0;
  const counterValue: number = maxAllowedCharsLength - textareaValue;

  const isError = counterValue < 0;
  const counterStyle: CSSProperties = {
    left: textareaWidth - counterWidth - parseInt(theme.textareaPaddingX),
    visibility: counterWidth && textareaWidth && !!counterNode.current ? 'visible' : 'hidden',
    bottom,
  };

  useEffect(() => {
    if (counterNode.current) {
      setCounterWidth(counterNode.current.offsetWidth);
    }
  }, [counterNode.current, counterWidth, textareaValue]);

  return (
    <section
      ref={counterNode}
      className={cn({
        [jsStyles.counter(theme)]: true,
        [jsStyles.counterError(theme)]: isError,
      })}
      style={counterStyle}
    >
      <span>{counterValue}</span>
      {!!counterHelp && <TextareaCounterHelp {...counterHelp} />}
    </section>
  );
};
