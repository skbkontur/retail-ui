import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { Story } from '../../typings/stories';
import { Input } from '../Input';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { THEME_2022 } from '../../lib/theming/themes/Theme2022';
import { Gapped } from '../Gapped';
import { Autocomplete } from '../Autocomplete';
import { Switcher } from '../Switcher';
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

export const RadioFocus: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef<Input>(null);
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
      inputRef.current?.blur();
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
      <ThemeContext.Provider value={THEME_2022}>
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
              <Switcher onValueChange={emptyFunction} disabled={isDisabled} items={['1', '2', '3']} />
            </div>
            <br />
            <div>
              <CurrencyInput onValueChange={emptyFunction} disabled={isDisabled} />
            </div>
            <br />
            <div>
              <Checkbox disabled={isDisabled} />
            </div>
            <br />
            <div>
              <DateInput disabled={isDisabled} />
            </div>
            <br />
            <div>
              <DatePicker onValueChange={emptyFunction} disabled={isDisabled} />
            </div>
            <br />
            <div>
              <FileUploader disabled={isDisabled} />
            </div>
            <br />
            <div>
              <FxInput onValueChange={emptyFunction} disabled={isDisabled} />
            </div>
            <br />
            <div>
              <Radio value={'Radio'} disabled={isDisabled} />
            </div>
            <br />
            <div>
              <Toggle disabled={isDisabled} />
            </div>
            <br />
            <Button use="primary" type="submit">
              Submit
            </Button>
          </form>
        </Gapped>
      </ThemeContext.Provider>
    </>
  );
};
RadioFocus.storyName = 'Radio focus';
RadioFocus.parameters = {
  creevey: {
    tests: {
      async 'focus elements one by one'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .sendKeys(this.keys.TAB)
          .pause(500)
          .perform();
        await delay(500);
        await this.expect(await this.takeScreenshot()).to.matchImage('02 - focus');
      },
    },
  },
};
