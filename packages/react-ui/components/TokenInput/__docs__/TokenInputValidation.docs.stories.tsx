import { Button, Gapped, Token, TokenInput, TokenInputType } from '@skbkontur/react-ui';
import {
  ValidationContainer,
  type ValidationInfo,
  ValidationWrapper,
  createValidator,
  tooltip,
} from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

export default {
  title: 'Input data/TokenInput',
  component: TokenInput,
  parameters: { creevey: { skip: true } },
} as Meta;

/** Если текст не подходит по формату, токен не формируется. При потере фокуса валидируется всё поле. */
export const ExampleValidationField: Story = () => {
  const inputValueRef = React.useRef('');
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    '+7 950 000-00-01',
    '+7 950 000-00-02',
    '+380 000 000-00-03',
  ]);
  const phoneNumbers = [
    '+7 950 000-00-01',
    '+7 950 000-00-02',
    '+380 000 000-00-03',
    '+375 000 000-00-04',
    '+49 800 000-0002',
    '+775 000 000-00-04',
  ];
  const [inputValue, setInputValue] = React.useState('');
  const isMobilePhone = (value: string) => value.trim().startsWith('+');

  const validationInfo: ValidationInfo | null =
    inputValue && !isMobilePhone(inputValue)
      ? {
          message: 'Некоторые телефоны не подходят по формату. Убедитесь, что ввели номера мобильных телефонов.',
          type: 'lostfocus',
        }
      : null;

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('top left')}>
        <TokenInput
          style={{ display: 'inline-block' }}
          placeholder="Введите номер телефона"
          delimiters={[',', ';']}
          onInputValueChange={(value) => {
            inputValueRef.current = value;
          }}
          onBlur={() => setInputValue(inputValueRef.current)}
          type={TokenInputType.Combined}
          isTokenValid={isMobilePhone}
          getItems={async (query) => phoneNumbers.filter((item) => item.includes(query))}
          selectedItems={selectedItems}
          onValueChange={(items) => {
            setSelectedItems(items);
            inputValueRef.current = '';
            setInputValue('');
          }}
        />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleValidationField.storyName = 'Валидация поля';

/** Каждый токен может валидироваться отдельно — например, при отправке формы. */
export const ExampleValidationTokens: Story = () => {
  const phoneNumbers = [
    '+7 950 000-00-01',
    '+7 950 000-00-02',
    '+380 000 000-00-03',
    '+375 000 000-00-04',
    '+49 800 000-0002',
    '+775 000 000-00-04',
  ];
  const isSmsPhone = (value: string) => /^\+(7|380|375)([\s-]|$)/.test(value.trim());
  const tokenValidator = createValidator<string[]>((b) => {
    b.array(
      (x) => x,
      (b) => {
        b.invalid((x) => !isSmsPhone(x), {
          type: 'submit',
          message: 'Для отправки СМС можно использовать только номера с кодами +7, +380 и +375',
        });
      },
    );
  });
  const refContainer = React.useRef<ValidationContainer>(null);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    '+7 950 000-00-01',
    '+49 800 000-0002',
    '+380 000 000-00-03',
    '+775 000 000-00-04',
  ]);

  const tokenValidationReader = tokenValidator(selectedItems);

  let validationInfo: ValidationInfo | null | undefined = null;
  for (let index = 0; index < selectedItems.length; index++) {
    validationInfo = tokenValidationReader.getNodeByIndex(index).get();
    if (validationInfo) {
      break;
    }
  }

  return (
    <ValidationContainer ref={refContainer}>
      <Gapped gap={8}>
        <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('top left')}>
          <TokenInput
            style={{ display: 'inline-block' }}
            placeholder="Введите номер телефона"
            delimiters={[',', ';']}
            type={TokenInputType.Combined}
            getItems={async (query) => phoneNumbers.filter((item) => item.includes(query))}
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
        <Button onClick={() => refContainer.current?.validate()}>Проверить</Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleValidationTokens.storyName = 'Валидация токенов';
