import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { CreeveyStory } from 'creevey';
import { Story } from '@storybook/react';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

import { delay } from './tools/tools';

export default {
  title: 'Checkbox',
};

export const CheckboxStoryComponent: Story & CreeveyStory = () => {
  const [checked, update] = React.useState<boolean>(false);

  let container: ValidationContainer | null = null;

  const refContainer = (el: ValidationContainer | null) => (container = el);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  };
  return (
    <div style={{ padding: '20px 20px' }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <Checkbox checked={checked} onValueChange={update}>
            Checkbox
          </Checkbox>
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button onClick={() => container && container.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

CheckboxStoryComponent.parameters = {
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
        await delay(1000);
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
      async checked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'span' }))
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
};
