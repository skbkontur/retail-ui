import React from 'react';
import Kebab from 'retail-ui/components/Kebab';
import MenuItem from 'retail-ui/components/MenuItem';
import { CaseSuite, Case } from '../Case';

export default class KebabTestPage extends React.Component {
  state = {
    kebabValue: 'none',
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Kebab">
        <Case title="Disabled">
          <Case.Body>
            <Kebab data-tid="DisabledKebab" disabled={true} />
          </Case.Body>
        </Case>
        <Case title="SimpleKebab">
          <Case.Body>
            <Kebab data-tid="SimpleKebab">
              <MenuItem onClick={() => this.setState({ kebabValue: 'first' })}>First</MenuItem>
              <MenuItem onClick={() => this.setState({ kebabValue: 'second' })}>Second</MenuItem>
              <MenuItem onClick={() => this.setState({ kebabValue: 'third' })}>Third</MenuItem>
            </Kebab>
            <span data-tid="Output">{this.state.kebabValue}</span>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
