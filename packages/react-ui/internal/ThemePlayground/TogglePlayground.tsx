import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Toggle } from '../../components/Toggle';

export class TogglePlayground extends React.Component {
  public render() {
    return (
      <Gapped vertical>
        <Gapped gap={10}>
          <Toggle />
          <div>Toggle</div>
        </Gapped>
        <Gapped gap={10}>
          <Toggle disabled />
          <div>Disabled toggle</div>
        </Gapped>
      </Gapped>
    );
  }
}
