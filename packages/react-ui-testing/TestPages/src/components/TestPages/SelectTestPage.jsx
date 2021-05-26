import React from 'react';
import { Select } from '@skbkontur/react-ui/components/Select';

import { CaseSuite, Case } from '../Case';

export default class SelectTestPage extends React.Component {
  state = {
    simpleSelect1: null,
    select2: null,
  };

  render() {
    return (
      <CaseSuite title="Селекты">
        <Case title="Простой селект где, value == caption">
          <Case.Body>
            <Select
              data-tid="SimpleSelect"
              items={['item 1', 'item 2']}
              value={this.state.simpleSelect1}
              onValueChange={value => this.setState({ simpleSelect1: value })}
            />
          </Case.Body>
        </Case>
        <Case title="Cелект где, value !== caption.">
          <Case.Body>
            <Select
              data-tid="SelectWithIdInValues"
              items={[
                ['item 1', 'item caption 1'],
                ['item 2', 'item caption 2'],
              ]}
              value={this.state.select2}
              onValueChange={value => this.setState({ select2: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
