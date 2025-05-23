import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'ComboBox',
} as Meta;

interface ComboBoxStoryState {
  value: string;
  label: string;
}

export const Required = () => {
  const [selected, setSelected] = useState<ComboBoxStoryState>({ value: 'one', label: 'one' });

  const items: ComboBoxStoryState[] = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'three', label: 'three' },
  ];

  const validateValue = (): Nullable<ValidationInfo> => {
    const labels = items.map(({ label }) => label);
    return selected && labels.includes(selected.label)
      ? null
      : {
          message: 'Выберите значение из списка',
          type: 'lostfocus',
        };
  };

  return (
    <div style={{ padding: 20, width: 550, height: 100 }}>
      <ValidationContainer>
        <ValidationWrapper validationInfo={validateValue()}>
          <ComboBox
            data-tid="combobox"
            onValueChange={setSelected}
            getItems={() => Promise.resolve(items)}
            placeholder="Начните вводить название"
            value={selected}
            onUnexpectedInput={(unexpected) => setSelected({ value: unexpected, label: unexpected })}
          />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};
