import { Button } from '@skbkontur/react-ui/components/Button/index.js';
import React from 'react';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip/index.js';

import { Case, CaseSuite } from '../Case';

export default class TooltipTestPage extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <CaseSuite title="Tooltip">
        <Case title="Simple Tooltip">
          <Case.Body>
            <Tooltip data-tid="SimpleTooltip" render={() => 'Tooltip content'} trigger="click">
              <Button data-tid="OpenTooltip">Open tooltip</Button>
            </Tooltip>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
