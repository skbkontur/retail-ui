import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Toast } from '@skbkontur/react-ui/components/Toast';

import { Case, CaseSuite } from '../Case';

export default class ToastTestPage extends React.Component {
  render() {
    return (
      <CaseSuite title="Toast">
        <Case title="Simple toast">
          <Case.Body>
            <Toast data-tid={'SimpleToast'} ref={el => (this.simpleToast = el)} />
            <Button data-tid="SimpleToastButton" onClick={() => this.simpleToast.push('Simple')}>
              Notify
            </Button>
          </Case.Body>
        </Case>

        <Case title="Toast with action">
          <Case.Body>
            <Toast data-tid={'ToastWithAction'} ref={el => (this.toastWithAction = el)} />
            <Button
              data-tid="ToastWithActionButton"
              onClick={() =>
                this.toastWithAction.push('With action', {
                  label: 'action',
                  handler: () => this.toastWithAction.close(),
                })
              }
            >
              Notify
            </Button>
          </Case.Body>
        </Case>

        <Case title="Static toast">
          <Case.Body>
            <Button
              data-tid="StaticToastButton"
              onClick={() =>
                Toast.push('Static', {
                  label: 'close',
                  handler: () => Toast.close(),
                })
              }
            >
              Notify
            </Button>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
