import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '../Checkbox';
import Gapped from '../../Gapped/Gapped';

class PlainCheckbox extends Component<any, any> {
  public state = {
    checked: false
  };

  public render() {
    const { checked } = this.state;
    return (
      <Checkbox
        // tslint:disable-next-line:jsx-no-lambda
        onChange={() => this.setState({ checked: !checked })}
        checked={checked}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}

storiesOf('Checkbox', module)
  .add('plain', () => <PlainCheckbox>Plain checkbox</PlainCheckbox>)
  .add('unchecked', () => <Checkbox>Unchecked</Checkbox>)
  .add('checked', () => <Checkbox checked>Checked</Checkbox>)
  .add('disabled', () => <Checkbox disabled>Disabled</Checkbox>)
  .add('disabled checked', () => (
    <Checkbox disabled checked>
      Disabled and checked
    </Checkbox>
  ))
  .add('error', () => <Checkbox error>Error</Checkbox>)
  .add('with mouse enter/leave handlers', () => (
    <Checkbox
      // tslint:disable-next-line:jsx-no-lambda no-console
      onMouseEnter={() => console.count('enter')}
      // tslint:disable-next-line:jsx-no-lambda no-console
      onMouseLeave={() => console.count('leave')}
    >
      Hover me
    </Checkbox>
  ))
  .add('with a long label', () => (
    <PlainCheckbox>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </PlainCheckbox>
  ))
  .add('w/o label', () => (
    <div>
      <div>
        Some text <Checkbox />
      </div>
      <div>
        Some text <Checkbox>Label</Checkbox>
      </div>
    </div>
  ))
  .add('programmatic focus', () => {
    let checkbox;

    function focus() {
      if (checkbox) {
        checkbox.focus();
      }
    }

    function blur() {
      if (checkbox) {
        checkbox.blur();
      }
    }

    return (
      <div>
        <Checkbox ref={el => (checkbox = el)}>Label</Checkbox>
        <Gapped>
          <button onClick={focus}>Focus</button>
          <button onClick={blur}>Blur</button>
        </Gapped>
      </div>
    );
  });
