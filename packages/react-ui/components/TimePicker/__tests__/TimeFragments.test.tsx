import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { TimeFragments } from '../../../internal/TimeInput/TimeFragments.js';
import { EMPTY_SEGMENT, TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR } from '../helpers/TimePicker.constants.js';

const getSeparatorNodes = (root: Element): HTMLSpanElement[] =>
  Array.from(root.children).filter(
    (node): node is HTMLSpanElement => node instanceof HTMLSpanElement && node.hasAttribute('data-separator'),
  );

describe('<TimeFragments />', () => {
  it('paints separator when previous segment is filled', () => {
    const { container } = render(
      <TimeFragments
        value={`12${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}34`}
        format={'HH:mm:ss'}
        size={'small'}
      />,
    );

    const root = container.firstElementChild;

    expect(root).not.toBeNull();

    const separators = getSeparatorNodes(root as Element);
    const segments = Array.from((root as Element).children).filter(
      (node): node is HTMLSpanElement => node instanceof HTMLSpanElement && node.hasAttribute('data-fragment'),
    );
    const minutesMask = segments[1]?.querySelector('span');

    expect(separators).toHaveLength(2);
    expect(segments).toHaveLength(3);
    expect(minutesMask).not.toBeNull();
    expect(separators[0].textContent).toBe(TIME_SEPARATOR);
    expect(separators[0].children).toHaveLength(1);
    expect(separators[0].firstElementChild?.textContent).toBe(TIME_SEPARATOR);
    expect(window.getComputedStyle(separators[0].firstElementChild as Element).color).toBe('rgba(0, 0, 0, 0)');

    expect(window.getComputedStyle(separators[0]).color).toBe('inherit');
    expect(window.getComputedStyle(separators[1]).color).toBe(window.getComputedStyle(minutesMask as Element).color);
    expect(window.getComputedStyle(separators[1]).color).not.toBe('inherit');
  });

  describe('reserved width for an empty value', () => {
    /** Ищет правило emotion для класса, приписанного элементу. */
    const getRulesFor = (element: Element): string => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((style) => style.textContent ?? '')
        .join('');

      return Array.from(element.classList)
        .flatMap((className) =>
          styles.split('.').filter((rule) => rule.startsWith(`${className}{`) || rule.startsWith(`${className}::`)),
        )
        .join('');
    };

    it.each([
      ['HH:mm' as const, `${EMPTY_SEGMENT}${TIME_SEPARATOR}${EMPTY_SEGMENT}`],
      ['HH:mm:ss' as const, `${EMPTY_SEGMENT}${TIME_SEPARATOR}${EMPTY_SEGMENT}${TIME_SEPARATOR}${EMPTY_SEGMENT}`],
    ])('reserves the width of a %s value', (format, placeholder) => {
      const { container } = render(<TimeFragments value={''} format={format} size={'small'} />);

      const root = container.firstElementChild as HTMLElement;

      expect(root.textContent).toBe('');
      expect(getRulesFor(root)).toContain(`content:'${placeholder}'`);
    });

    it('does not reserve the width when the value is filled', () => {
      const { container } = render(<TimeFragments value={'12:34'} format={'HH:mm'} size={'small'} />);

      expect(getRulesFor(container.firstElementChild as HTMLElement)).not.toContain('content:');
    });
  });

  it('calls onSelectSegment on mouse up over segment', () => {
    const onSelectSegment = vi.fn();
    const { container } = render(
      <TimeFragments value={'12:34'} format={'HH:mm'} size={'small'} onSelectSegment={onSelectSegment} />,
    );

    const root = container.firstElementChild as HTMLElement;
    const [hours, minutes] = Array.from(root.querySelectorAll('[data-fragment]'));

    fireEvent.mouseUp(minutes);

    expect(onSelectSegment).toHaveBeenCalledTimes(1);
    expect(onSelectSegment).toHaveBeenCalledWith('minutes', expect.any(Object));

    fireEvent.mouseUp(hours);

    expect(onSelectSegment).toHaveBeenLastCalledWith('hours', expect.any(Object));
  });
});
