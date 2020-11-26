import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { CSFStory } from 'creevey';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default { title: `DatePicker` };

export const DatePickerStory: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<Date | string | null>(null);
  let container: ValidationContainer | null = null;
  const validateValue = (): Nullable<ValidationInfo> => {
    if (value == null) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  }
  const refContainer = (el: ValidationContainer | null) => (container = el);

  return <div style={{ padding: '20px 20px' }}>
    <ValidationContainer ref={refContainer}>
      <ValidationWrapper validationInfo={validateValue()}>
        <DatePicker value={value as any} onValueChange={setValue} />
      </ValidationWrapper>
      <div style={{ padding: '100px 0' }}>
        <Button onClick={() => container && container.validate()}>Check</Button>
      </div>
    </ValidationContainer>
  </div>

}

DatePickerStory.storyName = `Example1`;

DatePickerStory.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
      async checked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('checked');
      }
    },
  },
}
