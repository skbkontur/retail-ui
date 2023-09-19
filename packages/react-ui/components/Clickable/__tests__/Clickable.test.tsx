import React, { createRef, forwardRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      <Clickable>
        <div data-tid={dataTid}>test</div>
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

  it('should not be able to click on button', () => {
    const onClick = jest.fn();
    render(
      <Clickable>
        <button onClick={onClick}>test</button>
      </Clickable>,
    );

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be able to click on disabled button', () => {
    const onClick = jest.fn();
    render(
      <Clickable disabled>
        <button onClick={onClick}>test</button>
      </Clickable>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should add `data-disabled` attribute when disabled is passed', () => {
    const { container } = render(
      <Clickable disabled>
        <button>test</button>
      </Clickable>,
    );

    expect(container.querySelector('[data-disabled]')).toBeInTheDocument();
  });

  it('should add `disabled` attribute when disabled is passed to button', () => {
    render(
      <Clickable disabled>
        <button>test</button>
      </Clickable>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should add `aria-disabled` attribute when disabled is passed', () => {
    render(
      <Clickable disabled>
        <button>test</button>
      </Clickable>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});
