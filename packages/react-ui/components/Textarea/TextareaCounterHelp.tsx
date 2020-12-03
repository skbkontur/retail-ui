import React, { FC, ReactNode, useContext } from 'react';
import { HelpDot } from '@skbkontur/react-icons';

import { ThemeContext, Tooltip } from '../..';

import { jsStyles } from './Textarea.styles';

type TextareaCounterHelpProps = {
  counterHelp: ReactNode | string;
};

export const TextareaCounterHelp: FC<TextareaCounterHelpProps> = ({ counterHelp }) => {
  const { textareaCounterDefaultHelpColor } = useContext(ThemeContext);
  const defaultHelp = (
    <Tooltip pos={'right bottom'} trigger={'click'} render={() => counterHelp}>
      <HelpDot color={textareaCounterDefaultHelpColor} />
    </Tooltip>
  );
  const isString = typeof counterHelp === 'string';

  return <span className={jsStyles.counterHelp()}>{isString ? defaultHelp : counterHelp}</span>;
};
