import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Text } from '../src/Text';

describe('Text', () => {
  it('should render correct tag', () => {
    render(
      <Text as="p" size={16} data-tid="text-root">
        Hello
      </Text>
    );

    const element = screen.getByTestId('text-root');
    expect(element.tagName).toBe('P');
  });

  it('should assign the exact <span> DOM node to the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text as="span" size={14} ref={ref} data-tid="text-ref">
        Ref test
      </Text>
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(screen.getByTestId('text-ref'));
  });

  it('should assign the exact <div> DOM node to the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text as="div" size={14} ref={ref} data-tid="text-ref">
        Ref test
      </Text>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId('text-ref'));
  });
});
