import React from 'react';
import { Textarea } from '@skbkontur/react-ui/components/Textarea';

import { CaseSuite, Case } from '../Case';

export default class TextareaTestPage extends React.Component {
  state = {
    value: null,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Textarea">
        <Case title="Simple Textarea">
          <Case.Body>
            <Textarea
              data-tid="SimpleTextarea"
              value={this.state.value}
              onValueChange={value => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
