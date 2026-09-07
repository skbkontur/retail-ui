import React from 'react';

import { Button } from '../../components/Button/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Toast } from '../../components/Toast/index.js';

export class ToastPlayground extends React.Component {
  private readonly toast = React.createRef<Toast>();

  public render() {
    return (
      <>
        <Toast ref={this.toast} />
        <Gapped gap={10}>
          <Button onClick={this.pushToast}>Тост</Button>
          <Button onClick={this.pushToastWithAction}>Тост со ссылкой</Button>
        </Gapped>
      </>
    );
  }

  private pushToast = () => {
    this.toast.current?.push('Текст сообщения');
  };

  private pushToastWithAction = () => {
    this.toast.current?.push('Текст сообщения', { action: { label: 'Ссылка', handler: () => null } });
  };
}
