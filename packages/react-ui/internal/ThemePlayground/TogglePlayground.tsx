import React from 'react';

import { Gapped } from '../../components/Gapped/index.js';
import { Toggle } from '../../components/Toggle/index.js';

export class TogglePlayground extends React.Component {
  public render() {
    return (
      <Gapped vertical>
        <Gapped gap={10}>
          <Toggle />
          <div>Обычный</div>
        </Gapped>
        <Gapped gap={10}>
          <Toggle disabled />
          <div>Отключён</div>
        </Gapped>
      </Gapped>
    );
  }
}
