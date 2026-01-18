import { render, screen, waitFor } from '@testing-library/react';
import { Radio } from '@skbkontur/react-ui/components/Radio/Radio.js';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox.js';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle.js';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher.js';
import { Select } from '@skbkontur/react-ui/components/Select/Select.js';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox.js';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup.js';
import React from 'react';
import { ComboBoxMenuDataTids } from '@skbkontur/react-ui/internal/CustomComboBox/index.js';
import { userEvent } from '@testing-library/user-event';

import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { ValidationInfo } from '../index.js';

const validation: ValidationInfo & { message: string } = {
  message: 'Ошибка',
  level: 'error',
  type: 'submit',
};

const renderValidationContainer = (input: React.ReactElement): React.RefObject<ValidationContainer> => {
  const containerRef = React.createRef<ValidationContainer>();
  render(
    <div style={{ padding: 20 }}>
      <ValidationContainer ref={containerRef}>
        <ValidationWrapper validationInfo={validation}>{input}</ValidationWrapper>
      </ValidationContainer>
      <button onClick={() => containerRef.current?.submit()}>submit</button>
    </div>,
  );
  return containerRef;
};

describe('validation tooltip hides after value change', () => {
  it('in RadioGroup', async () => {
    renderValidationContainer(<RadioGroup items={['one', 'two']} />);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    await userEvent.click(screen.getByText('one'));
    expect(screen.queryByText(validation.message)).toBeNull();
  });

  it('in Radio', async () => {
    renderValidationContainer(<Radio value={null}>one</Radio>);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    await userEvent.click(screen.getByText('one'));
    expect(screen.queryByText(validation.message)).toBeNull();
  });

  it('in Checkbox', async () => {
    renderValidationContainer(<Checkbox value={''}>one</Checkbox>);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    await userEvent.click(screen.getByText('one'));
    expect(screen.queryByText(validation.message)).toBeNull();
    screen.debug(undefined);
  });

  it('in Toggle', async () => {
    renderValidationContainer(<Toggle checked={false}>one</Toggle>);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    await userEvent.click(screen.getByText('one'));
    expect(screen.queryByText(validation.message)).toBeNull();
  });

  it('in Switcher', async () => {
    renderValidationContainer(<Switcher items={['one', 'two']} />);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    await userEvent.hover(screen.getByText('one'));
    await waitFor(() => expect(screen.getByText(validation.message)).toBeInTheDocument());
    await userEvent.click(screen.getByText('one'));
    expect(screen.queryByText(validation.message)).toBe(null);
  });

  it('in Select', async () => {
    renderValidationContainer(<Select items={['one', 'two']} />);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    await userEvent.click(screen.getByText('Ничего не выбрано'));
    await userEvent.keyboard('[ArrowDown][Enter]');
    expect(screen.queryByText(validation.message)).toBe(null);
  });

  it('in Combobox', async () => {
    renderValidationContainer(<ComboBox getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])} />);
    await userEvent.click(screen.getByRole('button', { name: `submit` }));
    await userEvent.click(screen.getByRole('textbox'));
    const items = screen.getByTestId(ComboBoxMenuDataTids.items, { exact: false });
    expect(items).toBeInTheDocument();
    expect(screen.getByText(validation.message)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveFocus();
    await userEvent.keyboard('[ArrowDown][Enter]');
    expect(screen.queryByText(validation.message)).toBe(null);
  });
});
