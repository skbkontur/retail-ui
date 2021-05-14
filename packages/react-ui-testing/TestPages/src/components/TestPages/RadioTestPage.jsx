import React from 'react';
import { Radio } from '@skbkontur/react-ui/components/Radio';

import { Case, CaseSuite } from '../Case';

export default class RadioTestPage extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <CaseSuite title="Radio">
        <Case title="Simple Radio">
          <Case.Body>
            <Radio
              data-tid="SimpleRadio"
              value={this.state.value}
              onValueChange={value => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
