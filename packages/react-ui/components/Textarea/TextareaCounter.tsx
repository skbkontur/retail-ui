import React, { useCallback, useContext, useImperativeHandle, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { QuestionCircleIcon16Solid } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon16Solid.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import { isFunction } from '../../lib/utils.js';
import { Tooltip } from '../Tooltip/index.js';
import { TextareaDataTids } from './Textarea.js';
import type { TextareaProps } from './Textarea.js';
import { getStyles } from './Textarea.styles.js';

export interface TextareaCounterProps {
  value: TextareaProps['value'];
  length: number;
  help: TextareaProps['counterHelp'];
  onCloseHelp: () => void;
  textarea: HTMLTextAreaElement;
}

export interface TextareaCounterRef {
  reflow: () => void;
}

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

const getCounterOffsets = (textarea: HTMLTextAreaElement) => {
  const computedStyle = textarea.ownerDocument.defaultView?.getComputedStyle(textarea);

  return {
    right: computedStyle?.paddingRight ?? textarea.style.paddingRight ?? '0px',
    bottom: computedStyle?.paddingBottom ?? textarea.style.paddingBottom ?? '0px',
  };
};

export const TextareaCounter = forwardRefAndName<TextareaCounterRef, TextareaCounterProps>(
  'TextareaCounter',
  ({ length, value, help, onCloseHelp, textarea }, ref) => {
    const theme = useContext(ThemeContext);
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);
    const [width, setWidth] = useState(textarea.clientWidth);
    const [height, setHeight] = useState(textarea.clientHeight);
    const reflow = useCallback(() => {
      const { clientWidth, clientHeight } = textarea;
      setWidth(clientWidth);
      setHeight(clientHeight);
    }, [textarea]);
    useImperativeHandle(ref, () => ({ reflow }), [reflow]);
    const renderTooltipContent = useCallback(() => {
      if (typeof help === 'function') {
        return help();
      }
      return help;
    }, [help]);
    const textareaValue = value ? value.toString().length : 0;
    const counterValue = length - textareaValue;
    const counterOffsets = getCounterOffsets(textarea);

    const helpIconProps = {
      onMouseDown: handleHelpMouseDown,
      color: theme.textareaCounterHelpIconColor,
      'data-tid': TextareaDataTids.helpIcon,
    };
    const helpIcon = <QuestionCircleIcon16Solid {...helpIconProps} />;
    const counterHelp = isFunction(help) ? (
      help()
    ) : (
      <Tooltip pos={'right bottom'} trigger={'click'} render={renderTooltipContent} onCloseClick={onCloseHelp}>
        {helpIcon}
      </Tooltip>
    );

    const isNegativeValue = counterValue < 0;

    return (
      <div data-tid={TextareaDataTids.counter} className={cx(styles.counterContainer(theme))} style={{ width, height }}>
        <span
          style={counterOffsets}
          className={cx(styles.counter(theme), {
            [styles.counterError(theme)]: isNegativeValue,
          })}
        >
          {isThemeGTE(theme, '6.1') && isNegativeValue ? `–${-counterValue}` : counterValue}
          {help && <span className={styles.counterHelp()}>{counterHelp}</span>}
        </span>
      </div>
    );
  },
);
