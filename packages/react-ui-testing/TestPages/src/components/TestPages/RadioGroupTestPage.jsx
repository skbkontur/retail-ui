import React from 'react';
import { RadioGroup } from 'retail-ui/components/RadioGroup';
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
              onChange={(e, value) => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
