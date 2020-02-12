import React from 'react';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

import { Case, CaseSuite } from '../Case';

export default class ToggleTestPage extends React.Component {
  state = {
    simpleValue: false,
    disablingValue: false,
    disabled: false,
  };

  render() {
    return (
      <CaseSuite title="Toggle">
        <Case title="Simple Toggle">
          <Case.Body>
            <Toggle
              data-tid="SimpleToggle"
              checked={this.state.simpleValue}
              onValueChange={x => this.setState({ simpleValue: x })}
            />
          </Case.Body>
        </Case>

        <Case title="Toggle with disabled">
          <Case.Body>
            <Toggle
              data-tid="DisablingToggle"
              checked={this.state.disablingValue}
              onValueChange={x => this.setState({ disablingValue: x })}
              disabled={this.state.disabled}
            />
            <Checkbox
              data-tid="DisablingCheckbox"
              checked={this.state.disabled}
              onValueChange={value => this.setState({ disabled: value })}
            >
              Disable toggle
            </Checkbox>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
