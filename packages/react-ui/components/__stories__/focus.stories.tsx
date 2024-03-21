import React, { FormEvent, useCallback, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { Story } from '../../typings/stories';
import { Input } from '../Input';
import { Gapped } from '../Gapped';
import { Autocomplete } from '../Autocomplete';
import { CurrencyInput } from '../CurrencyInput';
import { Checkbox } from '../Checkbox';
import { DateInput } from '../DateInput';
import { DatePicker } from '../DatePicker';
import { FileUploader } from '../FileUploader';
import { FxInput } from '../FxInput';
import { Radio } from '../Radio';
import { Toggle } from '../Toggle';
import { Button } from '../Button';
import { delay } from '../../lib/utils';

export default { title: 'Focus' };

const DELAY = 1500;

export const InputElementsSequentialFocus: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    new Promise((resolve) => {
      setIsDisabled(true);
      setTimeout(resolve, 1000);
    }).then(() => {
      setIsDisabled(false);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      new Promise((resolve) => {
        setIsDisabled(true);
        setTimeout(resolve, 1000);
      }).then(() => {
        setIsDisabled(false);
      });
    }
  };
  globalObject.document?.addEventListener('keydown', handleKeyDown);

  const emptyFunction = useCallback(() => {
    return;
  }, []);

  return (
    <>
      <h1 style={{ margin: '10px' }}>Форма</h1>
      <Gapped gap={5} style={{ border: 'black solid 1px', margin: '10px', padding: '10px' }}>
        <form onSubmit={onSubmit}>
          <div>
            <Input disabled={isDisabled} value={'Input'}></Input>
          </div>
          <br />
          <div>
            <Autocomplete onValueChange={emptyFunction} value="Autocomplete" disabled={isDisabled} />
          </div>
          <br />
          <div>
            <CurrencyInput onValueChange={emptyFunction} disabled={isDisabled} />
          </div>
          <br />
          <div>
            <FxInput onValueChange={emptyFunction} disabled={isDisabled} />
          </div>
          <br />
          <Button use="primary" type="submit">
            Submit
          </Button>
        </form>
      </Gapped>
    </>
  );
};
InputElementsSequentialFocus.parameters = {
  creevey: {
    tests: {
      async 'focus elements one by one'() {
        await this.browser.actions({
          bridge: true,
        });

        const repeatAmount = 6;
        for (let i = 0; i < repeatAmount; i++) {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .pause(DELAY)
            .sendKeys(this.keys.ENTER)
            .pause(DELAY)
            .perform();
        }

        await delay(DELAY);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};

export const ChoiceElementsSequentialFocus: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    new Promise((resolve) => {
      setIsDisabled(true);
      setTimeout(resolve, 1000);
    }).then(() => {
      setIsDisabled(false);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      new Promise((resolve) => {
        setIsDisabled(true);
        setTimeout(resolve, 1000);
      }).then(() => {
        setIsDisabled(false);
      });
    }
  };
  globalObject.document?.addEventListener('keydown', handleKeyDown);

  return (
    <>
      <h1 style={{ margin: '10px' }}>Форма</h1>
      <Gapped gap={5} style={{ border: 'black solid 1px', margin: '10px', padding: '10px' }}>
        <form onSubmit={onSubmit}>
          <div>
            <Radio value={'Radio'} disabled={isDisabled} />
          </div>
          <br />
          <div>
            <Toggle disabled={isDisabled} />
          </div>
          <br />
          <div>
            <Checkbox disabled={isDisabled} />
          </div>
          <br />
          <Button use="primary" type="submit">
            Submit
          </Button>
        </form>
      </Gapped>
    </>
  );
};
ChoiceElementsSequentialFocus.parameters = {
  creevey: {
    tests: {
      async 'focus elements one by one'() {
        const repeatAmount = 4;
        for (let i = 0; i < repeatAmount; i++) {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .pause(DELAY)
            .sendKeys(this.keys.ENTER)
            .pause(DELAY)
            .perform();
        }
        await delay(DELAY);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};

export const OtherElementsSequentialFocus: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    new Promise((resolve) => {
      setIsDisabled(true);
      setTimeout(resolve, 1000);
    }).then(() => {
      setIsDisabled(false);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      new Promise((resolve) => {
        setIsDisabled(true);
        setTimeout(resolve, 1000);
      }).then(() => {
        setIsDisabled(false);
      });
    }
  };
  globalObject.document?.addEventListener('keydown', handleKeyDown);

  return (
    <>
      <h1 style={{ margin: '10px' }}>Форма</h1>
      <Gapped gap={5} style={{ border: 'black solid 1px', margin: '10px', padding: '10px' }}>
        <form onSubmit={onSubmit}>
          <div>
            <DateInput disabled={isDisabled} />
          </div>
          <br />
          <div>
            <DatePicker
              onValueChange={useCallback(() => {
                return;
              }, [])}
              disabled={isDisabled}
            />
          </div>
          <br />
          <div>
            <FileUploader disabled={isDisabled} />
          </div>
          <br />
          <Button use="primary" type="submit">
            Submit
          </Button>
        </form>
      </Gapped>
    </>
  );
};
OtherElementsSequentialFocus.parameters = {
  creevey: {
    tests: {
      async 'focus elements one by one'() {
        const repeatAmount = 4;
        for (let i = 0; i < repeatAmount; i++) {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .pause(DELAY)
            .sendKeys(this.keys.ENTER)
            .pause(DELAY)
            .perform();
        }
        await delay(1000);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};
