import React, { FC, FormEvent, PropsWithChildren, useCallback, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';
import type { Meta } from '@storybook/react';
import type { SkipOptions } from 'creevey';
import { WebDriver } from 'selenium-webdriver';
import { IKey } from 'selenium-webdriver/lib/input';

import type { Story } from '../../typings/stories';
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
import { MaskedInput } from '../MaskedInput';

export default { title: 'Focus' } as Meta;

const skip: SkipOptions = { 'chrome only': { in: /^(?!\bchrome2022\b)/ } };

const DELAY = 1500;
const Header: FC<PropsWithChildren<any>> = ({ children }) => <h1 style={{ margin: 10 }}>{children}</h1>;
const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => (
  <div style={{ border: 'black solid 1px', margin: 10, padding: 10 }}>{children}</div>
);

const useFormHandlers = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    new Promise((resolve) => {
      setIsDisabled(true);
      setTimeout(resolve, 1000);
    }).then(() => {
      setIsDisabled(false);
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      new Promise((resolve) => {
        setIsDisabled(true);
        setTimeout(resolve, 1000);
      }).then(() => {
        setIsDisabled(false);
      });
    }
  }, []);

  globalObject.document?.addEventListener('keydown', handleKeyDown);

  const emptyFunction = useCallback(() => {
    return;
  }, []);

  return {
    isDisabled,
    emptyFunction,
    handleSubmit,
    handleKeyDown,
  };
};

const makeSteps = async function (ctf: { browser: WebDriver; keys: IKey }, repeatAmount: number) {
  for (let i = 0; i < repeatAmount; i++) {
    await ctf.browser
      .actions({
        bridge: true,
      })
      .sendKeys(ctf.keys.TAB)
      .pause(DELAY)
      .sendKeys(ctf.keys.ENTER)
      .pause(DELAY)
      .perform();
  }
};

export const InputElementsSequentialFocus: Story = () => {
  const { isDisabled, emptyFunction, handleSubmit } = useFormHandlers();
  return (
    <>
      <Header>Форма</Header>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Gapped vertical>
            <Input disabled={isDisabled} value="Input" />
            <MaskedInput disabled={isDisabled} value="Input" mask="99:99" />
            <Autocomplete onValueChange={emptyFunction} value="Autocomplete" disabled={isDisabled} />
            <CurrencyInput onValueChange={emptyFunction} disabled={isDisabled} />
            <FxInput onValueChange={emptyFunction} disabled={isDisabled} />
            <Button use="primary" type="submit">
              Submit
            </Button>
          </Gapped>
        </form>
      </Wrapper>
    </>
  );
};
InputElementsSequentialFocus.parameters = {
  creevey: {
    skip,
    tests: {
      async 'focus elements one by one'() {
        // В FxInput сначала происходит фокусировка на кнопке, потом на поле ввода. Поэтому необходимо 6 повторений для 5 элементов
        await makeSteps(this, 6);
        await delay(DELAY);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};

export const ChoiceElementsSequentialFocus: Story = () => {
  const { isDisabled, handleSubmit } = useFormHandlers();

  return (
    <>
      <Header>Форма</Header>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Gapped vertical>
            <Radio value={'Radio'} disabled={isDisabled} />
            <Toggle disabled={isDisabled} />
            <Checkbox disabled={isDisabled} />
            <Button use="primary" type="submit">
              Submit
            </Button>
          </Gapped>
        </form>
      </Wrapper>
    </>
  );
};
ChoiceElementsSequentialFocus.parameters = {
  creevey: {
    skip,
    tests: {
      async 'focus elements one by one'() {
        await makeSteps(this, 4);
        await delay(DELAY);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};

export const OtherElementsSequentialFocus: Story = () => {
  const { isDisabled, handleSubmit, emptyFunction } = useFormHandlers();

  return (
    <>
      <Header>Форма</Header>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Gapped vertical>
            <DateInput disabled={isDisabled} />
            <DatePicker onValueChange={emptyFunction} disabled={isDisabled} />
            <FileUploader disabled={isDisabled} />
            <Button use="primary" type="submit">
              Submit
            </Button>
          </Gapped>
        </form>
      </Wrapper>
    </>
  );
};
OtherElementsSequentialFocus.parameters = {
  creevey: {
    skip,
    tests: {
      async 'focus elements one by one'() {
        await makeSteps(this, 4);
        await delay(1000);
        await this.expect(await this.takeScreenshot()).to.matchImage('focus elements one by one');
      },
    },
  },
};
