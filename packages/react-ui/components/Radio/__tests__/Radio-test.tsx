import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from '../../RadioGroup';
import { Radio, RadioDataTids } from '../Radio';

describe('Radio', () => {
  it('should render radio', () => {
    render(<Radio value={'One'} />);
    expect(screen.getByTestId(RadioDataTids.root)).toBeInTheDocument();
  });

  it('should handle onMouseEnter event', () => {
    const onMouseEnter = jest.fn();

    render(<Radio value={'One'} onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(screen.getByRole('radio'));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should handle onMouseLeave event', () => {
    const onMouseLeave = jest.fn();

    render(<Radio value={'One'} onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByRole('radio'));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should handle onMouseOver event', () => {
    const onMouseOver = jest.fn();

    render(<Radio value={'One'} onMouseOver={onMouseOver} />);
    fireEvent.mouseOver(screen.getByRole('radio'));

    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('should handle onFocus event', () => {
    const onFocus = jest.fn();
    const radioRef = React.createRef<Radio<string>>();

    render(<Radio value={'One'} onFocus={onFocus} ref={radioRef} />);
    radioRef.current?.focus();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle onValueChange event', () => {
    const onValueChange = jest.fn();
    const radioRef = React.createRef<Radio<string>>();

    render(<Radio value={'One'} onValueChange={onValueChange} ref={radioRef} />);
    userEvent.click(screen.getByRole('radio'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('should focus by tab pressing', () => {
    render(<Radio value={'One'} />);
    userEvent.tab();
    expect(screen.getByRole('radio')).toHaveFocus();
  });

  it('should focus by method', () => {
    const radioRef = React.createRef<Radio<string>>();
    render(<Radio value={'One'} ref={radioRef} />);
    radioRef.current?.focus();
    expect(screen.getByRole('radio')).toHaveFocus();
  });

  it('should blur by method', () => {
    const radioRef = React.createRef<Radio<string>>();
    render(<Radio value={'One'} ref={radioRef} />);
    radioRef.current?.focus();
    expect(screen.getByRole('radio')).toHaveFocus();

    radioRef.current?.blur();
    expect(screen.getByRole('radio')).not.toHaveFocus();
  });

  it('should check radio in RadioGroup', () => {
    render(
      <RadioGroup>
        <Radio value={'One'} />
        <Radio value={'Two'} />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[0]);
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
  });
});
