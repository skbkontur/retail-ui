import React from 'react';
import Button from 'retail-ui/components/Button';
import Tooltip from 'retail-ui/components/Tooltip';
import { CaseSuite, Case } from '../Case';

export default class TooltipTestPage extends React.Component {
  state = {
    value: null,
  };

  render(): React.Element<*> {
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
