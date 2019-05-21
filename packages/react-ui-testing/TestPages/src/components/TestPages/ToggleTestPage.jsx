import React from 'react';
import Toggle from 'retail-ui/components/Toggle'
import Checkbox from 'retail-ui/components/Checkbox';
import {CaseSuite, Case} from '../Case';

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
              onChange={x => this.setState({simpleValue: x})}
            />
          </Case.Body>
        </Case>

        <Case title="Toggle with disabled">
          <Case.Body>
            <Toggle
              data-tid="DisablingToggle"
              checked={this.state.disablingValue}
              onChange={x => this.setState({disablingValue: x})}
              disabled={this.state.disabled}
            />
            <Checkbox
              data-tid="DisablingCheckbox"
              checked={this.state.disabled}
              onChange={(e, value) => this.setState({ disabled: value })}
            >
              Disable toggle
            </Checkbox>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
