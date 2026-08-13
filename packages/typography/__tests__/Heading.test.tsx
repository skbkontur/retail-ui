import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Heading } from '../Heading.js';

describe('Text', () => {
  it('should render correct tag', () => {
    render(
      <Heading as="h2" use="heading-xl" data-tid="text-ref">
        Hello
      </Heading>,
    );

    const element = screen.getByTestId('text-ref');
    expect(element.tagName).toBe('H2');
  });

  it('should assign the exact <span> DOM node to the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Heading as="span" use="heading-xs" ref={ref} data-tid="text-ref">
        Ref test
      </Heading>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
