import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switcher } from '../Switcher';

describe('Switcher', () => {
  const switchDefaultRole = 'switch';

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
      },
    },
    {
      label: 'Four',
      value: '444',
    },
  ];

  const Comp = (props = {}) => {
    const [value, setValue] = React.useState<string>();
    return <Switcher items={items} value={value} onValueChange={setValue} {...props} />;
  };

  it('should render default Switcher', () => {
    const renderSwitcher = () => render(<Switcher items={['One', 'Two', 'Three']} />);
    expect(renderSwitcher).not.toThrow();
  });

  it('should select item', async () => {
    render(<Comp />);

    const buttons = screen.getAllByRole(switchDefaultRole);
    expect(buttons[1]).not.toBeChecked();

    await userEvent.click(buttons[1]);
    expect(buttons[1]).toBeChecked();
  });

  it('should select item if enter key is pressed and not buttonProps.disabled', async () => {
    render(<Comp />);
    const buttons = screen.getAllByRole(switchDefaultRole);

    expect(buttons[0]).not.toBeChecked();

    buttons[0].focus();
    await userEvent.keyboard('{enter}');

    expect(buttons[0]).toBeChecked();
  });

  it('should not select item if enter key is pressed and buttonProps.disabled', async () => {
    render(<Comp />);
    const buttons = screen.getAllByRole(switchDefaultRole);

    expect(buttons[2]).not.toBeChecked();

    buttons[2].focus();
    await userEvent.keyboard('{enter}');

    expect(buttons[2]).not.toBeChecked();
  });

  it('should handle focus', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole(switchDefaultRole);
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
  });

  it('should handle blur', () => {
    render(<Comp />);
    const buttons = screen.getAllByRole(switchDefaultRole);
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
    buttons[0].blur();
    expect(buttons[0]).not.toHaveFocus();
  });

  describe('a11y', () => {
    it('has correct default role', () => {
      render(<Switcher items={['One']} />);

      expect(screen.getByRole(switchDefaultRole)).toBeInTheDocument();
    });

    it('passes correct value to `role` attribute', () => {
      const role = 'link';
      render(<Switcher items={['One']} role={role} />);

      expect(screen.getByRole(role)).toBeInTheDocument();
    });

    it('sets value for aria-label attribute', () => {
      const firstAriaLabel = 'one';
      const secondAriaLabel = 'two';
      render(
        <Switcher
          items={[
            { label: 'One', value: 'One', 'aria-label': firstAriaLabel },
            { label: 'Two', value: 'Two', 'aria-label': secondAriaLabel },
          ]}
        />,
      );

      expect(screen.getAllByRole('switch')[0]).toHaveAttribute('aria-label', firstAriaLabel);
      expect(screen.getAllByRole('switch')[1]).toHaveAttribute('aria-label', secondAriaLabel);
    });
  });
});
