import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { TimeFragments } from '../../../internal/TimeInput/TimeFragments.js';
import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR } from '../helpers/TimePicker.constants.js';

const getSeparatorNodes = (root: Element): HTMLSpanElement[] =>
  Array.from(root.children).filter(
    (node): node is HTMLSpanElement =>
      node instanceof HTMLSpanElement && !node.hasAttribute('data-fragment') && node.textContent === TIME_SEPARATOR,
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

    expect(window.getComputedStyle(separators[0]).color).toBe('inherit');
    expect(window.getComputedStyle(separators[1]).color).toBe(window.getComputedStyle(minutesMask as Element).color);
    expect(window.getComputedStyle(separators[1]).color).not.toBe('inherit');
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
