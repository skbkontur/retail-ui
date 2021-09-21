import React from 'react';

import {Switcher} from '@skbkontur/react-ui/components/Switcher';

import {CaseSuite, Case} from '../Case';

const switcherItems = [
  {label: "Налево", value: "Left"},
  {label: "Прямо", value: "Forward"},
  {label: "Направо", value: "Right"},
];

export default class SwitcherTestPage extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <CaseSuite title="Switcher">
        <Case title="Normal Switcher">
          <Case.Body>
            <Switcher
              data-tid="NormalSwitcher"
              items={switcherItems}
              value={this.state.value}
              onValueChange={value => this.setState({value})}
            />
          </Case.Body>
        </Case>
        <Case title="Normal Switcher with value">
          <Case.Body>
            <Switcher
              data-tid="NormalSwitcherWithValue"
              items={switcherItems}
              value={switcherItems[1].value}
            />
          </Case.Body>
        </Case>
        <Case title="Disabled Switcher">
          <Case.Body>
            <Switcher
              data-tid="DisabledSwitcher"
              disabled={"true"}
              items={switcherItems}
              value={null}
            />
          </Case.Body>
        </Case>
        <Case title="Disabled Switcher with value">
          <Case.Body>
            <Switcher
              data-tid="DisabledSwitcherWithValue"
              disabled={"true"}
              items={switcherItems}
              value={switcherItems[2].value}
            />
          </Case.Body>
        </Case>
        <Case title="Switcher with error">
          <Case.Body>
            <Switcher
              data-tid="SwitcherWithError"
              error={"true"}
              items={switcherItems}
              value={null}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
