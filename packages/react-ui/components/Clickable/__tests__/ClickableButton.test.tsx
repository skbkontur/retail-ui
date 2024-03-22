import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Clickable, ClickableDataTids } from '../Clickable';
import { HTMLProps } from '../../../typings/html';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';

describe('ClickableButton', () => {
  it('should render <button> tag by default', () => {
    render(<Clickable>button</Clickable>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render <button> tag when explicitly passed', () => {
    render(<Clickable as="button">button</Clickable>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  (['submit', 'button', 'reset'] as Array<HTMLProps['button']['type']>).forEach((type) => {
    it(`sets type ${type} when type=${type} specified`, () => {
      render(<Clickable type={type} />);
      expect(screen.getByRole('button')).toHaveProperty('type', type);
    });
  });

  it('should be able to click on button', () => {
    const onClick = jest.fn();
    render(<Clickable onClick={onClick}>test</Clickable>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be able to click on disabled button', () => {
    const onClick = jest.fn();
    render(
      <Clickable onClick={onClick} disabled>
        test
      </Clickable>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('sets focus by default when autoFocus prop passed', () => {
    render(<Clickable autoFocus />);
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('has data-tid `Button__spinner` when component in loading state (THEME_2022)', () => {
    render(
      <ThemeContext.Provider value={THEME_2022}>
        <Clickable loading />
      </ThemeContext.Provider>,
    );

    expect(screen.getByTestId(ClickableDataTids.spinner)).toBeInTheDocument();
  });
});
