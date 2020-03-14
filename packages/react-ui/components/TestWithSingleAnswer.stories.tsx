export default {
  title: '😌 TestRetreat ',
};

import { delay } from './../lib/utils';
import { TestWithSingleAnswer, Option } from './TestWithSingleAnswer';

export const MathTest = () => {
  const options: Option[] = [
    { id: '1', value: '2' },
    { id: '2', value: '4' },
    { id: '3', value: '5' },
  ];

  return <TestWithSingleAnswer rightOptionId="2" options={options} title="сколько будет 2 * 2?" />;
};

MathTest.story = {
  parameters: {
    creevey: {
      tests: {
        async checkCorrectAnswer(this: { browser: WebDriver }) {
          const testContainer = await this.browser.findElement({ css: '#test-element' });
          const rightAnswer = await this.browser.findElement({ css: '[data-tid~=option1]' });
          const checkButton = await this.browser.findElement({ css: '[data-tid~=checkButton]' });
          const dafaultState = await testContainer.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: rightAnswer })
            .click()
            .perform();

          const stateAfterCorrectAnswerClick = await testContainer.takeScreenshot();
          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkButton })
            .click()
            .perform();

          const stateAfterCheck = await testContainer.takeScreenshot();

          await expect({ dafaultState, stateAfterCorrectAnswerClick, stateAfterCheck }).to.matchImages();
        },

        async checkLoosingFocusOnSelectedRadio(this: { browser: WebDriver }) {
          const testContainer = await this.browser.findElement({ css: '#test-element' });
          const rightAnswer = await this.browser.findElement({ css: '[data-tid~=option1]' });

          await this.browser
            .actions({ bridge: true })
            .move({ origin: rightAnswer })
            .click()
            .perform();

          const stateOptionClick = await testContainer.takeScreenshot();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.TAB)
            .perform();

          const stateAfterLossingFocus = await testContainer.takeScreenshot();

          await expect({ stateOptionClick, stateAfterLossingFocus }).to.matchImages();
        },

        async checkSwitchingBetweenOptions(this: { browser: WebDriver }) {
          const testContainer = await this.browser.findElement({ css: '#test-element' });
          const options = await this.browser.findElements({ css: '[data-comp-name~=Radio]' });
          const dafaultState = await testContainer.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: options[0] })
            .click()
            .perform();

          const stateFirstOptionSelected = await testContainer.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: options[1] })
            .click()
            .perform();

          const stateSecondOptionSelected = await testContainer.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: options[2] })
            .click()
            .perform();

          const stateThirdOptionSelected = await testContainer.takeScreenshot();
          await expect({
            dafaultState,
            stateFirstOptionSelected,
            stateSecondOptionSelected,
            stateThirdOptionSelected,
          }).to.matchImages();
        },

        async checkWrongAnswer(this: { browser: WebDriver }) {
          const scrin = await this.browser.findElement({ css: '#test-element' });
          const element = await this.browser.findElement({ css: '[data-tid~=option0]' });
          const active = await scrin.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: element })
            .perform();

          const hover = await scrin.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(element)
            .perform();

          const check = await scrin.takeScreenshot();
          const button = await this.browser.findElement({ css: '[data-tid~=checkButton]' });

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();

          await delay(500);
          const error = await scrin.takeScreenshot();
          await expect({ active, hover, check, error }).to.matchImages();
        },
      },
    },
  },
};
