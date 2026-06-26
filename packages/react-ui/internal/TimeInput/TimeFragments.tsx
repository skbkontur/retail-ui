import React, { useCallback, useContext, useImperativeHandle, useRef } from 'react';

import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR } from '../../components/TimePicker/helpers/TimePicker.constants.js';
import { getDisplaySegments, getTimeSegments } from '../../components/TimePicker/helpers/TimePicker.shared.js';
import type { TimeFormat, TimeSegment } from '../../components/TimePicker/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { getStyles } from './TimeFragments.styles.js';

export interface TimeFragmentsRef {
  isFragment(el: HTMLElement | EventTarget | null): boolean;
  getSegment(el: HTMLElement | EventTarget | null): TimeSegment | null;
  getRootNode(): HTMLSpanElement | null;
}

export interface TimeFragmentsProps {
  value: string;
  format: TimeFormat;
  size: SizeProp;

  onSelectSegment?(segment: TimeSegment, event: React.MouseEvent<HTMLSpanElement>): void;
}

const getSeparatorSizeClassName = (styles: ReturnType<typeof getStyles>, theme: Theme, size: SizeProp): string => {
  switch (size) {
    case 'large':
      return styles.separatorLarge(theme);
    case 'medium':
      return styles.separatorMedium(theme);
    case 'small':
    default:
      return styles.separatorSmall(theme);
  }
};

export const TimeFragments = forwardRefAndName<TimeFragmentsRef, TimeFragmentsProps>('TimeFragments', (props, ref) => {
  const { value, format, size, onSelectSegment } = props;

  const theme = useContext(ThemeContext);

  const { cx } = useEmotion();

  const styles = useStyles(getStyles);

  const rootRef = useRef<HTMLSpanElement>(null);

  const rootClassName = cx(styles.root(), styles.selected(theme));
  const maskClassName = styles.mask(theme);
  const separatorSizeClassName = getSeparatorSizeClassName(styles, theme, size);

  const getSegment = useCallback(
    (el: HTMLElement | EventTarget | null): TimeSegment | null => {
      const rootNode = rootRef.current;

      if (!rootNode || !el) {
        return null;
      }

      const fragments: HTMLSpanElement[] = Array.from(rootNode.querySelectorAll('[data-fragment]'));
      const segments = getTimeSegments(format);

      const index = fragments.findIndex((fragment) => fragment === el || fragment.contains(el as HTMLSpanElement));

      return index >= 0 ? (segments[index] ?? null) : null;
    },
    [format],
  );

  const isFragment = useCallback(
    (el: HTMLElement | EventTarget | null): boolean => {
      return getSegment(el) !== null;
    },
    [getSegment],
  );

  useImperativeHandle(
    ref,
    () => ({
      isFragment,
      getSegment,
      getRootNode: () => rootRef.current,
    }),
    [getSegment, isFragment],
  );

  const segments = getTimeSegments(format);
  const displaySegments = getDisplaySegments(value, format);

  return (
    <span ref={rootRef} className={rootClassName}>
      {value
        ? segments.flatMap((segment, index) => {
            const segmentValue = displaySegments[index] ?? '';

            const valueMask = Array.from(segmentValue)
              .filter((char) => char !== TIME_PLACEHOLDER_CHAR)
              .join('');

            const placeholderLength = segmentValue.length - valueMask.length;

            const nodes = [
              <span
                key={segment}
                data-fragment={''}
                className={styles.segment()}
                onMouseUp={(event) => onSelectSegment?.(segment, event)}
              >
                {valueMask}
                <span className={maskClassName}>{Array(placeholderLength).fill(TIME_PLACEHOLDER_CHAR).join('')}</span>
              </span>,
            ];

            if (index < segments.length - 1) {
              nodes.push(
                <span
                  key={`separator-${index}`}
                  className={cx(maskClassName, styles.separator(), separatorSizeClassName, {
                    [styles.separatorFilled()]: !segmentValue.includes(TIME_PLACEHOLDER_CHAR),
                  })}
                >
                  {TIME_SEPARATOR}
                </span>,
              );
            }

            return nodes;
          })
        : null}
    </span>
  );
});
