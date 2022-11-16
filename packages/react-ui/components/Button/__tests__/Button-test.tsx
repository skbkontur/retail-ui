import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button, ButtonType } from '../Button';

describe('Button', () => {
  it('Has correct label', () => {
    render(<Button>Foo</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Foo');
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach((type) => {
    it(`sets type ${type} when type=${type} specified`, () => {
      render(<Button type={type} />);
      expect(screen.getByRole('button')).toHaveProperty('type', type);
    });
  });

  it('Handels click event', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);
    userEvent.click(screen.getByRole('button'));

    expect(onClick.mock.calls).toHaveLength(1);
  });

  it('Handels onBlur event', () => {
    const onBlur = jest.fn();
    render(<Button onBlur={onBlur} />);

    userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  })

  it('Handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Button onFocus={onFocus} />);

    userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  })

  it('Handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Button onKeyDown={onKeyDown} />);
    userEvent.type(screen.getByRole('button'), '{enter}')

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  })
});


// title	string | undefined
// className	string | undefined
// data-tid	string | undefined
// onMouseEnter	MouseEventHandler<HTMLButtonElement> | undefined
// onMouseLeave	MouseEventHandler<HTMLButtonElement> | undefined
// onMouseOver	MouseEventHandler<HTMLButtonElement> | undefined
