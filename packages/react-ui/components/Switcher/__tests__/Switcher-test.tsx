import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switcher, SwitcherDataTids } from '../Switcher';


describe('Switcher', () => {
  const items = [
    {
      label: 'One',
      value: '111',
    },
    {
      label: 'Two',
      value: '222',
    },
    {
      label: 'Three',
      value: '333',
      buttonProps: {
        disabled: true,
      }
    },
    {
      label: 'Four',
      value: '444',
    }
  ];

  const Comp = (props = {}) => {
    const [value, setValue] = React.useState<string>();
    return (
      <Switcher items={items} value={value} onValueChange={setValue} {...props} />
    );
  };

  it('should render default Switcher', () => {
    const renderSwitcher = () => render(<Switcher items={['One', 'Two', 'Three']} />);
    expect(renderSwitcher).not.toThrow();
  });

  it('should select item', () => {
    render(<Comp />);

    const buttons = screen.getAllByRole('button');
    expect(screen.queryByTestId(SwitcherDataTids.selectedItem)).not.toBeInTheDocument();

    userEvent.click(buttons[1]);

    expect(screen.getByTestId(SwitcherDataTids.selectedItem)).toBeInTheDocument();
    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(buttons[1].textContent).toEqual(screen.getByTestId(SwitcherDataTids.selectedItem).textContent)
  });

  it('should select item if enter key is pressed and not buttonProps.disabled', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole('button');

    expect(screen.queryByTestId(SwitcherDataTids.selectedItem)).not.toBeInTheDocument();

    buttons[0].focus();
    userEvent.keyboard('{enter}');

    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(buttons[0].textContent).toEqual(screen.getByTestId(SwitcherDataTids.selectedItem).textContent)
  });

  it('should not select item if enter key is pressed and buttonProps.disabled', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole('button');

    expect(screen.queryByTestId(SwitcherDataTids.selectedItem)).not.toBeInTheDocument();

    buttons[2].focus();
    userEvent.keyboard('{enter}');

    expect(screen.queryByTestId(SwitcherDataTids.selectedItem)).not.toBeInTheDocument();
  });

  it('should handle focus', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
  });

  it('should handle blur', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
    buttons[0].blur();
    expect(buttons[0]).not.toHaveFocus();
  });
});
