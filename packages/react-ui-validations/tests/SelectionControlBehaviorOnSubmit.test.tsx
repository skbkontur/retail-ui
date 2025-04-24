import { render, screen, waitFor } from '@testing-library/react';
import { RadioGroup, Radio, Checkbox, Toggle, Switcher, Select, ComboBox } from '@skbkontur/react-ui';
import React from 'react';
import { ComboBoxMenuDataTids } from '@skbkontur/react-ui/internal/CustomComboBox';
import userEvent from '@testing-library/user-event';

import { ValidationContainer, ValidationsFeatureFlagsContext, ValidationWrapper } from '../src';
import type { ValidationInfo } from '../src';

const validation: ValidationInfo & { message: string } = {
  message: 'Ошибка',
  level: 'error',
  type: 'submit',
};

const renderValidationContainer = (
  input: React.ReactElement,
  hideTooltipOnSelectionControls: boolean,
): React.RefObject<ValidationContainer> => {
  const containerRef = React.createRef<ValidationContainer>();
  render(
    <div style={{ padding: 20 }}>
      <ValidationsFeatureFlagsContext.Provider value={{ hideTooltipOnSelectionControls }}>
        <ValidationContainer ref={containerRef}>
          <ValidationWrapper validationInfo={validation}>{input}</ValidationWrapper>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
      <button onClick={() => containerRef.current?.submit()}>submit</button>
    </div>,
  );
  return containerRef;
};

describe('validation tooltip hide after change on', () => {
  describe('disabled hide flag', () => {
    it('RadioGroup', async () => {
      renderValidationContainer(<RadioGroup items={['one', 'two']} />, false);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('one'));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
    });

    it('Switcher', async () => {
      renderValidationContainer(<Switcher items={['one', 'two']} />, false);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      await userEvent.hover(screen.getByText('one'));
      await waitFor(() => expect(screen.getByText(validation.message)).toBeInTheDocument());
      await userEvent.click(screen.getByText('one'));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
    });

    it('Select', async () => {
      renderValidationContainer(<Select width={170} items={['one', 'two']} />, false);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('Ничего не выбрано'));
      await userEvent.keyboard('[ArrowDown][Enter]');
      expect(screen.getByText(validation.message)).toBeInTheDocument();
    });

    it('Combobox', async () => {
      renderValidationContainer(<ComboBox getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])} />, false);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      const items = screen.getByTestId(ComboBoxMenuDataTids.items);
      expect(items).toBeInTheDocument();
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveFocus();
      await userEvent.keyboard('[ArrowDown][Enter]');
      expect(screen.getByText(validation.message)).toBeInTheDocument();
    });
  });

  describe('enabled hide flag', () => {
    it('RadioGroup', async () => {
      renderValidationContainer(<RadioGroup items={['one', 'two']} />, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('one'));
      expect(screen.queryByText(validation.message)).toBeNull();
    });

    it('Radio', async () => {
      renderValidationContainer(<Radio value={null}>one</Radio>, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('one'));
      expect(screen.queryByText(validation.message)).toBeNull();
    });

    it('Checkbox', async () => {
      renderValidationContainer(<Checkbox value={''}>one</Checkbox>, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('one'));
      expect(screen.queryByText(validation.message)).toBeNull();
      screen.debug(undefined);
    });

    it('Toggle', async () => {
      renderValidationContainer(<Toggle checked={false}>one</Toggle>, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('one'));
      expect(screen.queryByText(validation.message)).toBeNull();
    });

    it('Switcher', async () => {
      renderValidationContainer(<Switcher items={['one', 'two']} />, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      await userEvent.hover(screen.getByText('one'));
      await waitFor(() => expect(screen.getByText(validation.message)).toBeInTheDocument());
      await userEvent.click(screen.getByText('one'));
      expect(screen.queryByText(validation.message)).toBe(null);
    });

    it('Select', async () => {
      renderValidationContainer(<Select items={['one', 'two']} />, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      await userEvent.click(screen.getByText('Ничего не выбрано'));
      await userEvent.keyboard('[ArrowDown][Enter]');
      expect(screen.queryByText(validation.message)).toBe(null);
    });

    it('Combobox', async () => {
      renderValidationContainer(<ComboBox getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])} />, true);
      await userEvent.click(screen.getByRole('button', { name: `submit` }));
      const items = screen.getByTestId(ComboBoxMenuDataTids.items);
      expect(items).toBeInTheDocument();
      expect(screen.getByText(validation.message)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveFocus();
      await userEvent.keyboard('[ArrowDown][Enter]');
      expect(screen.queryByText(validation.message)).toBe(null);
    });
  });
});
