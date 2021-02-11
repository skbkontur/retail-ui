import React from 'react';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';

import { Case, CaseSuite } from '../Case';

export default class RadioGroupTestPage extends React.Component {
  state = {
    value: null,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="RadioGroup">
        <Case title="Simple RadioGroup">
          <Case.Body>
            <RadioGroup
              data-tid="SimpleRadioGroup"
              items={['item1', 'item2']}
              value={this.state.value}
              onValueChange={value => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
