import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Button } from '../../components/Button';
import { Hint } from '../../components/Hint';
import { SingleToast } from '../../components/SingleToast';

export class HintPlayground extends React.Component {
  public render() {
    return (
      <>
        <SingleToast />
        <Gapped gap={10}>
          <Hint manual opened text={'Показать тост'}>
            <Button onClick={this.pushToast}>Toast</Button>
          </Hint>
          <Hint manual opened text={'Показать тост с ссылкой'} pos={'right'}>
            <Button onClick={this.pushToastWithAction}>Toast with link</Button>
          </Hint>
        </Gapped>
      </>
    );
  }

  private pushToast = () => {
    SingleToast.push('Текст сообщения');
  };

  private pushToastWithAction = () => {
    SingleToast.push('Текст сообщения', { label: 'Ссылка', handler: () => null });
  };
}
