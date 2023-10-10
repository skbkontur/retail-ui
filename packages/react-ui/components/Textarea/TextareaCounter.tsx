import React, { SyntheticEvent, useContext, useCallback, useImperativeHandle, useState } from 'react';
import propTypes from 'prop-types';

import { safePropTypesInstanceOf } from '../../lib/SSRSafe';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { HelpDotIcon } from '../../internal/icons/16px';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { QuestionCircleIcon16Solid } from '../../internal/icons2022/QuestionCircleIcon/QuestionCircleIcon16Solid';
import { SizeType } from '../../internal/ThemePlayground/constants';

import { TextareaDataTids, TextareaProps } from './Textarea';
import { styles } from './Textarea.styles';

export interface TextareaCounterProps {
  value: TextareaProps['value'];
  length: number;
  help: TextareaProps['counterHelp'];
  onCloseHelp: () => void;
  textarea: HTMLTextAreaElement;
  size: SizeType;
}

export interface TextareaCounterRef {
  reflow: () => void;
}

const handleHelpMouseDown = (e: SyntheticEvent) => e.preventDefault();

export const TextareaCounter = forwardRefAndName<TextareaCounterRef, TextareaCounterProps>(
  'TextareaCounter',
  ({ length, value, help, onCloseHelp, textarea, size }, ref) => {
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

    const helpIconProps = {
      onMouseDown: handleHelpMouseDown,
      color: theme.textareaCounterHelpIconColor,
      'data-tid': TextareaDataTids.helpIcon,
    };
    const helpIcon = isTheme2022(theme) ? (
      <QuestionCircleIcon16Solid {...helpIconProps} />
    ) : (
      <HelpDotIcon {...helpIconProps} />
    );
    const counterHelp = isFunction(help) ? (
      help()
    ) : (
      <Tooltip pos={'right bottom'} trigger={'click'} render={renderTooltipContent} onCloseClick={onCloseHelp}>
        {helpIcon}
      </Tooltip>
    );

    const getCounterSizeClassName = () => {
      switch (size) {
        case 'large':
          return styles.counterLarge(theme);
        case 'medium':
          return styles.counterMedium(theme);
        case 'small':
        default:
          return styles.counterSmall(theme);
      }
    };

    return (
      <div data-tid={TextareaDataTids.counter} className={cx(styles.counterContainer(theme))} style={{ width, height }}>
        <span
          className={cx(getCounterSizeClassName(), styles.counter(theme), {
            [styles.counterError(theme)]: counterValue < 0,
          })}
        >
          {counterValue}
          {help && <span className={styles.counterHelp()}>{counterHelp}</span>}
        </span>
      </div>
    );
  },
);

TextareaCounter.propTypes = {
  length: propTypes.number.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  help: propTypes.oneOfType([propTypes.node, propTypes.func]),
  onCloseHelp: propTypes.func.isRequired,
  textarea: safePropTypesInstanceOf(() => HTMLElement).isRequired,
};
