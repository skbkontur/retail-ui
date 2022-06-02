import React, { SyntheticEvent, useContext, useCallback, useImperativeHandle, useState } from 'react';
import propTypes from 'prop-types';

import { HelpDotIcon } from '../../internal/icons/16px';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import { cx } from '../../lib/theming/Emotion';

import { TextareaDataTids, TextareaProps } from './Textarea';
import { styles } from './Textarea.styles';

export type TextareaCounterProps = {
  value: TextareaProps['value'];
  length: number;
  help: TextareaProps['counterHelp'];
  onCloseHelp: () => void;
  textarea: HTMLTextAreaElement;
};

export interface TextareaCounterRef {
  reflow: () => void;
}

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

export const TextareaCounter = React.forwardRef<TextareaCounterRef, TextareaCounterProps>(function TextareaCounter(
  { length, value, help, onCloseHelp, textarea },
  ref,
) {
  const theme = useContext(ThemeContext);
  const [width, setWidth] = useState(textarea.clientWidth);
  const [height, setHeight] = useState(textarea.clientHeight);
  const reflow = useCallback(() => {
    const { clientWidth, clientHeight } = textarea;
    setWidth(clientWidth);
    setHeight(clientHeight);
  }, [textarea]);
  useImperativeHandle(ref, () => ({ reflow }), [reflow]);
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

  return (
    <div data-tid={TextareaDataTids.counter} className={styles.counterContainer(theme)} style={{ width, height }}>
      <span
        className={cx(styles.counter(theme), {
          [styles.counterError(theme)]: counterValue < 0,
        })}
      >
        {counterValue}
        {help && <span className={styles.counterHelp()}>{counterHelp}</span>}
      </span>
    </div>
  );
});

TextareaCounter.propTypes = {
  length: propTypes.number.isRequired,
  value: propTypes.oneOf([propTypes.string, propTypes.number]),
  help: propTypes.oneOf([propTypes.node, propTypes.func]),
  onCloseHelp: propTypes.func.isRequired,
  textarea: propTypes.node.isRequired,
};
