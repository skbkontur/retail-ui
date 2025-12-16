import React from 'react';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
import { TokenInput, Token } from '@skbkontur/react-ui';
import {
  tooltip,
  ValidationContainer,
  type ValidationInfo,
  ValidationWrapper,
  createValidator,
} from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/TokenInput',
  component: TokenInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const tokenValidator = createValidator<string[]>((b) => {
    b.array(
      (x) => x,
      (b) => {
        b.invalid((x) => x.includes('Запрещённый'), { type: 'immediate', message: `Токен содержит "Запрещённый"` });
      },
    );
  });
  const refContainer = React.useRef<ValidationContainer>(null);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const tokenValidationReader = tokenValidator(selectedItems);

  // Валидация ввода
  const validationInfo_1 = inputValue.includes(' ')
    ? ({ message: 'Токены должны быть без пробелов', type: 'immediate' } satisfies ValidationInfo)
    : null;

  // Классическая валидация
  const validationInfo_2 =
    selectedItems.length === 0 ? ({ message: 'Обязательное поле', type: 'lostfocus' } satisfies ValidationInfo) : null;

  // Валидация каждого токена
  let validationInfo_3: ValidationInfo | null | undefined = null;
  for (let index = 0; index < selectedItems.length; index++) {
    validationInfo_3 = tokenValidationReader.getNodeByIndex(index).get();
    if (validationInfo_3) {
      break;
    }
  }

  const allValidations = [validationInfo_1, validationInfo_2, validationInfo_3].find((info) => info !== null);

  return (
    <ValidationContainer ref={refContainer}>
      <ValidationWrapper validationInfo={allValidations} renderMessage={tooltip('top left')}>
        <TokenInput
          style={{ display: 'inline-block' }}
          onInputValueChange={setInputValue}
          type={validationInfo_1 ? TokenInputType.WithReference : TokenInputType.Combined}
          getItems={async () => ['Запрещённый токен', 'Обычный токен']}
          selectedItems={selectedItems}
          onValueChange={setSelectedItems}
          renderToken={(item, props, index) => {
            return (
              <Token {...props} error={!!tokenValidationReader.getNodeByIndex(index).get()}>
                {item}
              </Token>
            );
          }}
        />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
