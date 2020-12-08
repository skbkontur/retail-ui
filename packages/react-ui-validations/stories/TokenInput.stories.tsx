import React from 'react';
import { Token } from '@skbkontur/react-ui/components/Token';
import { TokenInput } from '@skbkontur/react-ui/components/TokenInput';
import { CSFStory } from 'creevey';

import { tooltip, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

import { delay } from './tools/tools';

async function getItems(query: string) {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}

export default { title: `TokenInput` };

export const TokenInputStory: CSFStory<JSX.Element> = () => {
  const [checked] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [, refContainer] = React.useState<ValidationContainer | null>(null);

  const validate = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'immediate' };
    }
    return null;
  };
  return (
    <div style={{ padding: '20px 300px 60px 20px' }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('right middle')}>
          <TokenInput
            getItems={getItems}
            selectedItems={selectedItems}
            onValueChange={setSelectedItems}
            renderToken={(item, { isActive, onClick, onRemove }) => (
              <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove}>
                {item}
              </Token>
            )}
          />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

TokenInputStory.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }) })
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid 2']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
            .sendKeys('a')
            .perform();
          await delay(1000);
          await this.browser
            .actions({
              bridge: true,
            }).click(this.browser.findElement({ css: '[data-comp-name="MenuItem"]' }))
            .perform();
          await delay(1000);
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }) })
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      }
    }
  }
}
