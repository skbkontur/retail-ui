import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Switcher, SwitcherDataTids } from '../Switcher';
import { ButtonDataTids } from '../../Button';

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
    }
  ];

  const Comp = () => {
    const [value, setValue] = React.useState<string>();
    return (
      <Switcher items={items} value={value} onValueChange={setValue} />
    );
  };

  it('should render default Switcher', () => {
    const renderSwitcher = () => render(<Switcher items={['One', 'Two', 'Three']} />);
    expect(renderSwitcher).not.toThrow();
  });
});
