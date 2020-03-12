import React from 'react';

import { RadioGroup } from '../RadioGroup';
import { Radio } from '../../Radio';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Nullable } from '../../../typings/utility-types';

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

export const Vertical = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Vertical.story = { name: 'vertical' };

export const Inline = () => <Component inline items={['One', 'Two', 'Three']} />;
Inline.story = { name: 'inline' };

export const WithRenderItem = () => (
  <RadioGroup<string> items={['One', 'Two']} renderItem={x => <div>Value: {x}</div>} />
);
WithRenderItem.story = { name: 'with renderItem' };

export const MultipleGroups = () => (
  <div>
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
    <hr />
    <Component items={['One', 'Two', 'Three']} />
  </div>
);
MultipleGroups.story = { name: 'multiple groups' };

export const UncontrolledWithDefaultValue = () => <RadioGroup items={['One', 'Two', 'Three']} defaultValue="One" />;
UncontrolledWithDefaultValue.story = { name: 'uncontrolled with defaultValue' };

export const UncontrolledWithChildrenAndDefaultValue = () => (
  <RadioGroup defaultValue="One">
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
UncontrolledWithChildrenAndDefaultValue.story = { name: 'uncontrolled with children and default value' };

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
UncontrolledWithChildrenAndDifferentItemStates.story = { name: 'uncontrolled with children and different item states' };

export const DisabledUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" disabled>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
DisabledUncontrolledWithChildren.story = { name: 'disabled uncontrolled with children' };

export const ErrorUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" error>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
ErrorUncontrolledWithChildren.story = { name: 'error uncontrolled with children' };

export const WarningUncontrolledWithChildren = () => (
  <RadioGroup defaultValue="One" warning>
    <Gapped gap={10} vertical>
      <Radio value="One">First element</Radio>
      <Radio value="Two">Second element</Radio>
      <Radio value="Three">Third element</Radio>
    </Gapped>
  </RadioGroup>
);
WarningUncontrolledWithChildren.story = { name: 'warning uncontrolled with children' };

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
NestedUncontrolledGroupsWithChildren.story = { name: 'nested uncontrolled groups with children' };

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
