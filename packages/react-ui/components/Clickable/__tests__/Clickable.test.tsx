import React, { createRef, forwardRef } from 'react';
import { render, screen } from '@testing-library/react';

import { Clickable, ClickableDataTids } from '../Clickable';

describe('Clickable', () => {
  it('should render <a> tag', () => {
    render(
      <Clickable>
        <a href="/">link</a>
      </Clickable>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should provide access to ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Clickable ref={ref}>
        <button>button</button>
      </Clickable>,
    );

    expect(ref.current).toBeDefined();
  });

  it('should have root data-tid', () => {
    render(
      <Clickable>
        <div>test</div>
      </Clickable>,
    );

    expect(screen.getByTestId(ClickableDataTids.root)).toBeInTheDocument();
  });

  it('should change default root data-tid', () => {
    const dataTid = 'test';
    render(
      <Clickable data-tid={dataTid}>
        <div>test</div>
      </Clickable>,
    );

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('ref can access custom component', () => {
    // eslint-disable-next-line react/display-name
    const CustomComp = forwardRef<HTMLButtonElement>((props, ref) => {
      return (
        <button ref={ref} {...props}>
          test
        </button>
      );
    });

    const ref = createRef<HTMLButtonElement>();
    render(
      <Clickable ref={ref}>
        <CustomComp />
      </Clickable>,
    );

    expect(ref.current).toBeDefined();
  });
});
