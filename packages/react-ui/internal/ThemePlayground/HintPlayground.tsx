import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Button } from '../../components/Button';
import { Hint } from '../../components/Hint';
import { Toast } from '../../components/Toast';

export class HintPlayground extends React.Component<{}, {}> {
  public render() {
    return (
      <Gapped gap={10}>
        <Hint manual opened text={'Показать тост'}>
          <Button onClick={this.pushToast}>Toast</Button>
        </Hint>
        <Hint manual opened text={'Показать тост с ссылкой'} pos={'right'}>
          <Button onClick={this.pushToastWithAction}>Toast with link</Button>
        </Hint>
      </Gapped>
    );
  }

  private pushToast = () => {
    Toast.push('Текст сообщения');
  };

  private pushToastWithAction = () => {
    Toast.push('Текст сообщения', { label: 'Ссылка', handler: () => null });
  };
}
