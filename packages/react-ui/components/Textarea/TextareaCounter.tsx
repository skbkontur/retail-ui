import React, { SyntheticEvent, useEffect, useContext, useCallback, useImperativeHandle, useState } from 'react';
import cn from 'classnames';

import { HelpDotIcon } from '../../internal/icons/16px';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import { Nullable } from '../../typings/utility-types';

import { TextareaProps } from './Textarea';
import { jsStyles } from './Textarea.styles';

export type TextareaCounterProps = {
  value: TextareaProps['value'];
  length: number;
  help: TextareaProps['counterHelp'];
  onCloseHelp: () => void;
  textarea: Nullable<HTMLTextAreaElement>;
};

export interface TextareaCounterRef {
  reflow: () => void;
}

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

export const TextareaCounter = React.forwardRef<TextareaCounterRef, TextareaCounterProps>(function TeaxtareaCounter(
  { length, value, help, onCloseHelp, textarea },
  ref,
) {
  const theme = useContext(ThemeContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const reflow = () => {
    if (textarea) {
      const { clientWidth, clientHeight } = textarea;
      if (width !== clientWidth) {
        setWidth(clientWidth);
      }
      if (height !== clientHeight) {
        setHeight(clientHeight);
      }
    }
  };
  useEffect(reflow, [textarea]);
  useImperativeHandle(ref, () => ({ reflow }), [ref]);
  const renderTooltipContent = useCallback(() => help, [help]);
  const textareaValue = value ? value.toString().length : 0;
  const counterValue = length - textareaValue;
  const counterHelp = isFunction(help) ? (
    help()
  ) : (
    <Tooltip pos={'right bottom'} trigger={'click'} render={renderTooltipContent} onCloseClick={onCloseHelp}>
      <HelpDotIcon onMouseDown={handleHelpMouseDown} color={theme.textareaCounterHelpIconColor} />
    </Tooltip>
  );

  if (!width || !height) {
    return null;
  }

  return (
    <div className={jsStyles.counterContainer(theme)} style={{ width, height }}>
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
});
