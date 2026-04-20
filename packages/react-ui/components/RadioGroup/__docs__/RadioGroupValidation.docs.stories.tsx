import { Button, Gapped, Radio, RadioGroup } from '@skbkontur/react-ui';
import { ValidationContainer, type ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import React from 'react';

import { isNullable } from '../../../lib/utils.js';
import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/utility-types.js';

export default {
  title: 'Input data/RadioGroup',
  component: RadioGroup,
  parameters: { creevey: { skip: true } },
} as Meta;

type Lang = 'ru' | 'eng' | 'de' | 'fr';

interface RadioGroupStoryState {
  lang: Nullable<Lang>;
}

export const ExampleValidation: Story = () => {
  const refContainer = React.useRef<ValidationContainer>(null);
  const [lang, setLang] = React.useState<Nullable<Lang>>(null);

  const validateLang = (): Nullable<ValidationInfo> => {
    if (isNullable(lang)) {
      return { message: 'Выберите значение', type: 'submit' };
    }
    return null;
  };

  return (
    <ValidationContainer ref={refContainer}>
      <Gapped vertical gap={20}>
        <ValidationWrapper validationInfo={validateLang()}>
          <RadioGroup<RadioGroupStoryState['lang']> value={lang} onValueChange={setLang}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Radio value={'ru'}>Русский</Radio>
              <Radio value={'eng'}>Английский</Radio>
              <Radio value={'de'}>Немецкий</Radio>
              <Radio value={'fr'}>Французский</Radio>
            </div>
          </RadioGroup>
        </ValidationWrapper>
        <Button data-tid="button" onClick={() => refContainer.current?.validate()}>
          Проверить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
