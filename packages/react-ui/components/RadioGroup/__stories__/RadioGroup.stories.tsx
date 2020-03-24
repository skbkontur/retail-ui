import React from 'react';
import { CSFStory } from 'creevey';

import { RadioGroup } from '../RadioGroup';
import { Radio } from '../../Radio';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Nullable } from '../../../typings/utility-types';
import { delay } from '../../../lib/utils';

class Component extends React.Component<any, any> {
  public state = {
    value: '',
  };

  private _radioGroup: Nullable<RadioGroup<string>>;

  public render() {
    return (
      <Gapped vertical>
        <Button data-tid={'JustButton'}>Just button</Button>
        <div id="RadioGroup-wrap" style={{ padding: 10 }}>
          <RadioGroup<string>
            ref={element => (this._radioGroup = element)}
            value={this.state.value}
            onValueChange={this.handleValueChange}
            {...this.props}
          />
        </div>
        <Button
          onClick={() => {
            if (this._radioGroup) {
              this._radioGroup.focus();
            }
          }}
        >
          Focus RadioGroup
        </Button>
      </Gapped>
    );
  }

  private handleValueChange = (value: string) => {
    this.setState({ value });
  };
}

export default { title: 'RadioGroup' };

export const Vertical: CSFStory<JSX.Element> = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Vertical.story = {
  name: 'vertical',
  parameters: {
    creevey: {
      captureElement: '#RadioGroup-wrap',
      skip: [{ in: 'ie11', tests: 'hovered' }],
      tests: {
        async plain() {
          await this.expect(await this.takeScreenshot()).to.matchImage('plain');
        },
        async hovered() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
        },
        async clicked() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
        async mouseLeave() {
          // NOTE Firefox bug if click send right after click from previous test it results as double click
          await delay(500);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('mouseLeave');
        },
        async tabPress() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
            .sendKeys(this.keys.TAB)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
        },
        async arrow_down() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
            .sendKeys(this.keys.TAB)
            .sendKeys(this.keys.DOWN)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('arrow_down');
        },
      },
    },
  },
};

export const Inline = () => <Component inline items={['One', 'Two', 'Three']} />;
Inline.story = {
  name: 'inline',
  parameters: {
    creevey: {
      captureElement: '#RadioGroup-wrap',
    },
  },
};

export const WithRenderItem = () => (
  <RadioGroup<string> items={['One', 'Two']} renderItem={x => <div>Value: {x}</div>} />
);
WithRenderItem.story = { name: 'with renderItem', parameters: { creevey: { skip: [true] } } };

export const MultipleGroups = () => (
  <div>
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
  </div>
);
MultipleGroups.story = { name: 'multiple groups', parameters: { creevey: { skip: [true] } } };

export const UncontrolledWithDefaultValue = () => <RadioGroup items={['One', 'Two', 'Three']} defaultValue="One" />;
UncontrolledWithDefaultValue.story = {
  name: 'uncontrolled with defaultValue',
  parameters: { creevey: { skip: [true] } },
};

export const UncontrolledWithChildrenAndDefaultValue = () => (
  <RadioGroup defaultValue="One">
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
UncontrolledWithChildrenAndDefaultValue.story = {
  name: 'uncontrolled with children and default value',
  parameters: { creevey: { skip: [true] } },
};

export const UncontrolledWithChildrenAndDifferentItemStates = () => (
  <RadioGroup defaultValue="One">
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio disabled value="Two">
        Second element
      </Radio>
      <Radio value="Three" warning>
        Warning element
      </Radio>
      <Radio value="Four" error>
        Error element
      </Radio>
    </Gapped>
  </RadioGroup>
);
UncontrolledWithChildrenAndDifferentItemStates.story = {
  name: 'uncontrolled with children and different item states',
  parameters: { creevey: { skip: [true] } },
};

export const DisabledUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" disabled>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
DisabledUncontrolledWithChildren.story = {
  name: 'disabled uncontrolled with children',
  parameters: { creevey: { skip: [true] } },
};

export const ErrorUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" error>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
ErrorUncontrolledWithChildren.story = {
  name: 'error uncontrolled with children',
  parameters: { creevey: { skip: [true] } },
};

export const WarningUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" warning>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
WarningUncontrolledWithChildren.story = {
  name: 'warning uncontrolled with children',
  parameters: { creevey: { skip: [true] } },
};

export const NestedUncontrolledGroupsWithChildren = () => (
  <RadioGroup defaultValue="One">
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two" disabled>
        Second element
      </Radio>
      <Radio value="Three">Third element</Radio>
      <RadioGroup defaultValue="One">
        <Gapped gap={10} vertical>
          <Radio value="One">First element</Radio>
          <Radio value="Two">Second element</Radio>
          <RadioGroup defaultValue="One">
            <Gapped gap={10} vertical>
              <Radio value="One">First element</Radio>
              <Radio value="Two" disabled>
                Second element
              </Radio>
              <Radio value="Three">Third element</Radio>
            </Gapped>
          </RadioGroup>
          <Radio value="Three">Third element</Radio>
        </Gapped>
      </RadioGroup>
      <Radio value="Four">Fourth element</Radio>
      <Radio value="Five">Fifth element</Radio>
    </Gapped>
  </RadioGroup>
);
NestedUncontrolledGroupsWithChildren.story = {
  name: 'nested uncontrolled groups with children',
  parameters: { creevey: { skip: [true] } },
};

export const Disabled = () => (
  <RadioGroup defaultValue="One" disabled>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
Disabled.story = { name: 'disabled' };
