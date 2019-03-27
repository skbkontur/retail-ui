import React from 'react';
import Radio from 'retail-ui/components/Radio';
import { CaseSuite, Case } from '../Case';

export default class RadioTestPage extends React.Component {
  state = {
    value: null,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Radio">
        <Case title="Simple Radio">
          <Case.Body>
            <Radio
              data-tid="SimpleRadio"
              value={this.state.value}
              onChange={(e, value) => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
