import React from 'react';
import { CSFStory } from 'creevey';

import { LostfocusDependentValidation as LostfocusDependentValidationStory } from './SyncStories/LostfocusDependentValidation';
import { LostfocusDynamicValidation as LostfocusDynamicValidationStory } from './SyncStories/LostfocusDynamicValidation';
import { SingleInputPage } from './SyncStories/SingleInputPage';
import { delay } from './tools/tools';

export default { title: `Sync` };

export const ImmediateValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'immediate'} />;

ImmediateValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .sendKeys(this.keys.TAB)
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const SubmitValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'submit'} />;

SubmitValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const LostfocusValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'lostfocus'} />;

LostfocusValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const LostfocusDependentValidation: CSFStory<JSX.Element> = () => <LostfocusDependentValidationStory />;

LostfocusDependentValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="InputAValidation"]' }))
            .sendKeys(`test`)
            .sendKeys(this.keys.TAB)
            .sendKeys(`test`)
            .sendKeys(this.keys.TAB)
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const LostfocusDynamicValidation: CSFStory<JSX.Element> = () => <LostfocusDynamicValidationStory />;

LostfocusDynamicValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="InputAValidation"]' }))
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid 2']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="InputAValidation"]' }))
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .sendKeys(`bad`)
            .sendKeys(this.keys.TAB)
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const PreinvalidImmediateValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'immediate'} initialValue={'bad'} />
);

PreinvalidImmediateValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const PreinvalidLostfocusValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'lostfocus'} initialValue={'bad'} />
);

PreinvalidLostfocusValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const PreinvalidSubmitValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'submit'} initialValue={'bad'} />
);

PreinvalidSubmitValidation.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};
