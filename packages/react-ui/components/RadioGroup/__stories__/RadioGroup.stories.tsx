import React from 'react';

import { Story } from '../../../typings/stories';
import { RadioGroup } from '../RadioGroup';
import { Radio } from '../../Radio';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Nullable } from '../../../typings/utility-types';
import { RadioGroupProps } from '..';

interface ComponentState {
  value: string;
}
class Component extends React.Component<RadioGroupProps<string>> {
  public state: ComponentState = {
    value: '',
  };

  private _radioGroup: Nullable<RadioGroup<string>>;

  public render() {
    return (
      <Gapped vertical>
        <Button data-tid={'JustButton'}>Just button</Button>
        <div id="RadioGroup-wrap" style={{ padding: 10 }}>
          <RadioGroup<string>
            ref={(element) => (this._radioGroup = element)}
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

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Vertical: Story = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Vertical.storyName = 'vertical';

export const Inline = () => <Component inline items={['One', 'Two', 'Three']} />;
Inline.storyName = 'inline';

Inline.parameters = {
  creevey: {
    captureElement: '#RadioGroup-wrap',
  },
};

export const WithRenderItem = () => (
  <RadioGroup<string> items={['One', 'Two']} renderItem={(x) => <div>Value: {x}</div>} />
);
WithRenderItem.storyName = 'with renderItem';
WithRenderItem.parameters = { creevey: { skip: true } };

export const MultipleGroups = () => (
  <div>
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
  </div>
);
MultipleGroups.storyName = 'multiple groups';
MultipleGroups.parameters = { creevey: { skip: true } };

export const UncontrolledWithDefaultValue = () => <RadioGroup items={['One', 'Two', 'Three']} defaultValue="One" />;
UncontrolledWithDefaultValue.storyName = 'uncontrolled with defaultValue';
UncontrolledWithDefaultValue.parameters = { creevey: { skip: true } };

export const UncontrolledWithChildrenAndDefaultValue = () => (
  <RadioGroup defaultValue="One">
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
UncontrolledWithChildrenAndDefaultValue.storyName = 'uncontrolled with children and default value';
UncontrolledWithChildrenAndDefaultValue.parameters = { creevey: { skip: true } };

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
UncontrolledWithChildrenAndDifferentItemStates.storyName = 'uncontrolled with children and different item states';
UncontrolledWithChildrenAndDifferentItemStates.parameters = { creevey: { skip: true } };

export const DisabledUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" disabled>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
DisabledUncontrolledWithChildren.storyName = 'disabled uncontrolled with children';
DisabledUncontrolledWithChildren.parameters = { creevey: { skip: true } };

export const ErrorUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" error>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
ErrorUncontrolledWithChildren.storyName = 'error uncontrolled with children';
ErrorUncontrolledWithChildren.parameters = { creevey: { skip: true } };

export const WarningUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" warning>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
WarningUncontrolledWithChildren.storyName = 'warning uncontrolled with children';
WarningUncontrolledWithChildren.parameters = { creevey: { skip: true } };

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
NestedUncontrolledGroupsWithChildren.storyName = 'nested uncontrolled groups with children';
NestedUncontrolledGroupsWithChildren.parameters = { creevey: { skip: true } };

export const Disabled = () => (
  <RadioGroup defaultValue="One" disabled>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
Disabled.storyName = 'disabled';
