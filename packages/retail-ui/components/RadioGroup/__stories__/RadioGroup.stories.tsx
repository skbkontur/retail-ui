// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import RadioGroup from '../RadioGroup';
import Radio from '../../Radio';
import Gapped from '../../Gapped';
import Button from '../../Button';
import { SyntheticRadioEvent } from '../../Radio/Radio';
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
          <RadioGroup
            ref={element => (this._radioGroup = element)}
            value={this.state.value}
            onChange={el => this.handleChange(el)}
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

  private handleChange(event: SyntheticRadioEvent<string>) {
    this.setState({ value: event.target.value });
  }
}

storiesOf('RadioGroup', module)
  .add('vertical', () => {
    return <Component items={['One', 'Two', 'Three']} />;
  })
  .add('inline', () => <Component inline items={['One', 'Two', 'Three']} />)
  .add('with renderItem', () => <RadioGroup items={['One', 'Two']} renderItem={x => <div>Value: {x}</div>} />)
  .add('multiple groups', () => (
    <div>
      <Component items={['One', 'Two', 'Three']} />
      <hr />
      <Component items={['One', 'Two', 'Three']} />
      <hr />
      <Component items={['One', 'Two', 'Three']} />
    </div>
  ))
  .add('uncontrolled with defaultValue', () => <RadioGroup items={['One', 'Two', 'Three']} defaultValue="One" />)
  .add('uncontrolled with children and default value', () => (
    <RadioGroup defaultValue="One">
      <Gapped gap={10} vertical>
        <Radio value="One">First element</Radio>
        <Radio value="Two">Second element</Radio>
        <Radio value="Three">Third element</Radio>
      </Gapped>
    </RadioGroup>
  ))
  .add('uncontrolled with children and different item states', () => (
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
  ))
  .add('disabled uncontrolled with children', () => (
    <RadioGroup defaultValue="One" disabled>
      <Gapped gap={10} vertical>
        <Radio value="One">First element</Radio>
        <Radio value="Two">Second element</Radio>
        <Radio value="Three">Third element</Radio>
      </Gapped>
    </RadioGroup>
  ))
  .add('error uncontrolled with children', () => (
    <RadioGroup defaultValue="One" error>
      <Gapped gap={10} vertical>
        <Radio value="One">First element</Radio>
        <Radio value="Two">Second element</Radio>
        <Radio value="Three">Third element</Radio>
      </Gapped>
    </RadioGroup>
  ))
  .add('warning uncontrolled with children', () => (
    <RadioGroup defaultValue="One" warning>
      <Gapped gap={10} vertical>
        <Radio value="One">First element</Radio>
        <Radio value="Two">Second element</Radio>
        <Radio value="Three">Third element</Radio>
      </Gapped>
    </RadioGroup>
  ))
  .add('nested uncontrolled groups with children', () => (
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
  ));
