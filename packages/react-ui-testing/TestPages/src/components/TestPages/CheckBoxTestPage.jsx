import React from 'react';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';

import { Case, CaseSuite } from '../Case';

export default class CheckboxTestPage extends React.Component {
  state = {
    value: null,
    value2: null,
    value3: null,
    value4: null,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Checkbox">
        <Case title="Simple Checkbox">
          <Case.Body>
            <Checkbox
              data-tid="SimpleCheckbox"
              checked={this.state.value}
              onValueChange={value => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
        <Case title="Checkbox with label">
          <Case.Body>
            <Checkbox
              data-tid="CheckboxWithLabel"
              checked={this.state.value2}
              onValueChange={value => this.setState({ value2: value })}
            >
              Checkbox label
            </Checkbox>
          </Case.Body>
        </Case>
        <Case title="Checkbox with disabled state">
          <Case.Body>
            <Checkbox
              data-tid="CheckboxToDisable"
              checked={this.state.value3}
              onValueChange={value => this.setState({ value3: value })}
            >
              Disable checkbox below
            </Checkbox>
            <Checkbox
              data-tid="CheckboxWithDisabledState"
              disabled={this.state.value3}
              checked={this.state.value4}
              onValueChange={value => this.setState({ value4: value })}
            >
              Checkbox with disabled state
            </Checkbox>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
