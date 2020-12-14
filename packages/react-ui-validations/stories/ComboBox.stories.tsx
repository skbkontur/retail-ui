import { CSFStory } from 'creevey';
import React from 'react';
import { Button, ComboBox, Gapped } from '@skbkontur/react-ui';

import { Nullable } from '../typings/Types';
import { tooltip, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';

import { delay, submit } from './tools/tools';

export default { title: 'ComboBox' };

const getItems = async (q: string): Promise<Item[]> => {
  await delay(500);
  return [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Fourth' },
    { value: 5, label: 'Fifth' },
    { value: 6, label: 'Sixth' },
  ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q);
};

interface Item {
  value: number;
  label: string;
}

export const ComboBoxLostfocusStory: CSFStory<JSX.Element> = () => {
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [, refContainer] = React.useState<ValidationContainer | null>(null);

  const handleUnexpectedInput = () => setSelected(null);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (selected === null) {
      return { message: 'Должно быть не пусто', type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ padding: 80, width: 500, height: 300 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateValue()}>
          <ComboBox<Item>
            data-tid="Combobox"
            getItems={getItems}
            onValueChange={setSelected}
            onUnexpectedInput={handleUnexpectedInput}
            placeholder="Enter number"
            value={selected}
          />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

ComboBoxLostfocusStory.story = {
  name: `Простой комбобокс`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-tid="Combobox"]' }) })
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
      },
    },
  },
};

export const ComboBoxSubmitStory: CSFStory<JSX.Element> = () => {
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);

  const handleUnexpectedInput = () => setSelected(null);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (selected === null) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 80, width: 500, height: 300 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip(`top center`)}>
          <ComboBox<Item>
            data-tid="Combobox"
            getItems={getItems}
            onValueChange={setSelected}
            onUnexpectedInput={handleUnexpectedInput}
            placeholder="Enter number"
            value={selected}
          />
        </ValidationWrapper>
        <Button use={'primary'} onClick={() => submit(container)}>
          Отправить
        </Button>
      </ValidationContainer>
    </div>
  );
};

ComboBoxSubmitStory.story = {
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
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-tid="Combobox"]' }) })
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
      },
    },
  },
};

export const ComboBoxDependentStory: CSFStory<JSX.Element> = () => {
  const [selectedA, setSelectedA] = React.useState<Item | null>(null);
  const [selectedB, setSelectedB] = React.useState<Item | null>(null);
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);

  const handleUnexpectedInputA = () => setSelectedA(null);
  const handleUnexpectedInputB = () => setSelectedB(null);

  const validateValueA = (): Nullable<ValidationInfo> => {
    if (selectedA === null) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  const validateValueB = (): Nullable<ValidationInfo> => {
    if (selectedB === null) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (selectedA?.value === selectedB.value) {
      return { message: 'Должны быть различными', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 80, width: 500, height: 300 }}>
      <ValidationContainer ref={refContainer}>
        <Gapped gap={16} vertical>
          <ValidationWrapper validationInfo={validateValueA()}>
            <ComboBox<Item>
              data-tid="ComboboxA"
              getItems={getItems}
              onValueChange={setSelectedA}
              onUnexpectedInput={handleUnexpectedInputA}
              placeholder="Enter number"
              value={selectedA}
            />
          </ValidationWrapper>
          <ValidationWrapper validationInfo={validateValueB()}>
            <ComboBox<Item>
              data-tid="ComboboxB"
              getItems={getItems}
              onValueChange={setSelectedB}
              onUnexpectedInput={handleUnexpectedInputB}
              placeholder="Enter number"
              value={selectedB}
            />
          </ValidationWrapper>

          <Button use={'primary'} onClick={() => submit(container)}>
            Отправить
          </Button>
        </Gapped>
      </ValidationContainer>
    </div>
  );
};

ComboBoxDependentStory.story = {
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
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-tid="ComboboxA"]' }) })
            .perform();
          await delay(1500);
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
        async ['not valid 2']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);

          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="ComboboxA"]' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-comp-name="MenuItem"]:nth-of-type(4)' }) })
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .press()
            .release()
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="ComboboxB"]' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-comp-name="MenuItem"]:nth-of-type(4)' }) })
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .press()
            .release()
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="ComboboxB"]' }))
            .perform();
          await delay(1500);
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
      },
    },
  },
};
