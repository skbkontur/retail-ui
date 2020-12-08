import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { CSFStory } from 'creevey';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

import { delay } from './tools/tools';

export default { title: `DatePicker` };

export const DatePickerStory: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<Date | string | null>(null);
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  const validateValue = (): Nullable<ValidationInfo> => {
    if (value == null) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: '20px 20px', width: 400, height: 400 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateValue()}>
          <DatePicker value={value as any} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ padding: '100px 0' }}>
          <Button onClick={() => container && container.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

DatePickerStory.story = {
  parameters: {
    creevey: {
      tests: {
        async ["not valid"]() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
      },
    },
  },
};
