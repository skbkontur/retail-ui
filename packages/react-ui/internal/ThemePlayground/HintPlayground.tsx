import React from 'react';

import { Button } from '../../components/Button/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Hint } from '../../components/Hint/index.js';

export class HintPlayground extends React.Component {
  public render() {
    return (
      <Gapped gap={10}>
        <Hint manual opened text={'Подсказка'}>
          <Button>Элемент</Button>
        </Hint>
        <Hint manual opened text={'Подсказка'} pos={'right'}>
          <Button>Элемент</Button>
        </Hint>
      </Gapped>
    );
  }
}
