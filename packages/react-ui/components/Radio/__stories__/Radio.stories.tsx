// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { Meta, Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { Radio } from '../Radio';
import { Input } from '../../Input';
import { Autocomplete } from '../../Autocomplete';
import { Button } from '../../Button';
import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { CurrencyInput } from '../../CurrencyInput';
import { Checkbox } from '../../Checkbox';
import { DateInput } from '../../DateInput';
import { DatePicker } from '../../DatePicker';
import { FileUploader } from '../../FileUploader';
import { FxInput } from '../../FxInput';
import { Toggle } from '../../Toggle';
import { Switcher } from '../../Switcher';

export default {
  title: 'Radio',
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Playground' },
      },
    },
  },
} as Meta;

export const RadioWithDifferentStates = () => (
  <div style={{ margin: '5px' }}>
    <Gapped gap={20}>
      <Radio value="value" />
      <Radio disabled value="value" />
      <Radio disabled checked value="value" />
      <Radio checked value="value" />
      <Radio focused value="value" />
      <Radio focused checked value="value" />
      <Radio error value="value" />
      <Radio warning value="value" />
    </Gapped>
  </div>
);
RadioWithDifferentStates.storyName = 'Radio with different states';
RadioWithDifferentStates.parameters = {
  creevey: {
    skip: {
      'story-skip-0': { in: ['chromeFlat8px'] },
    },
  },
};

export const RadioFocus = () => {
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

export const Playground = () => {
  class Comp extends React.Component {
    public state = {
      hovered: false,
      checked: false,
      active: false,
      value: 'value',
    };

    public render() {
      return (
        <div>
          <div onClick={this.handleClick}>
            <span style={{ display: 'inline-block', verticalAlign: 'sub' }}>
              <Radio {...this.state} />
            </span>
          </div>
        </div>
      );
    }

    private handleClick = () => {
      this.setState({ checked: !this.state.checked });
    };
  }

  return <Comp />;
};

export const Highlighted: Story = () => {
  return (
    <div style={{ marginBottom: '70px' }}>
      <div>
        <Radio value={'value'} checked />
      </div>
      <div>
        <Radio value={'value'} checked warning />
      </div>
      <div>
        <Radio value={'value'} checked error />
      </div>
    </div>
  );
};

Highlighted.parameters = {
  creevey: {
    skip: {
      flaky: { in: /firefox/ },
    },
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async tabPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'body' }))
          .sendKeys(this.keys.TAB)
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
    },
  },
};

export const Size: Story = () => {
  return (
    <div>
      <Gapped vertical>
        <Radio size={'small'} value="value">
          Size: small
        </Radio>
        <Radio size={'medium'} value="value">
          Size: medium
        </Radio>
        <Radio size={'large'} value="value">
          Size: large
        </Radio>
      </Gapped>
    </div>
  );
};
