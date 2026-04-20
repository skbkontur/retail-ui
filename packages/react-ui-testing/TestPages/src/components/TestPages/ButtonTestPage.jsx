import { Button } from '@skbkontur/react-ui/components/Button/index.js';
import React from 'react';

import { Case, CaseSuite } from '../Case';

export default class ButtonTestPage extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <CaseSuite title="Button">
        <Case title="Simple Button">
          <Case.Body>
            <Button data-tid="SimpleButton" />
          </Case.Body>
        </Case>
        <Case title="Button with warning">
          <Case.Body>
            <Button data-tid="WarningButton" warning />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
