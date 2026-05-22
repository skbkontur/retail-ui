import React, { useCallback, useContext, useImperativeHandle, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { QuestionCircleIcon16Light } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon16Light.js';
import { QuestionCircleIcon16Solid } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon16Solid.js';
import { QuestionCircleIcon20Regular } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon20Regular.js';
import { QuestionCircleIcon24Regular } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon24Regular.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import type { SizeProp } from '../../lib/types/props.js';
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
  size: SizeProp;
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
  ({ length, value, help, onCloseHelp, textarea, size }, ref) => {
    const theme = useContext(ThemeContext);
    const isThemeGTE6_1 = isThemeGTE(theme, '6.1');

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
      color: theme.textareaCounterHelpIconColor,
      'data-tid': TextareaDataTids.helpIcon,
    };
    const helpIcon = isThemeGTE6_1 ? getHelpIcon() : <QuestionCircleIcon16Solid {...helpIconProps} />;
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
            [styles.counter6_1(theme)]: isThemeGTE6_1,
            [styles.counterError(theme)]: isNegativeValue,
          })}
        >
          {isThemeGTE6_1 && isNegativeValue ? `–${-counterValue}` : counterValue}
          {help && <span className={styles.counterHelp()}>{counterHelp}</span>}
        </span>
      </div>
    );
  },
);
