import React from 'react';
import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';

import { Toast } from '../Toast';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Nullable } from '../../../typings/utility-types';

class TestNotifier extends React.Component<any, any> {
  public state = {
    modal: false,
  };

  private notifier: Nullable<Toast>;

  public render() {
    return (
      <div>
        <Toast ref={el => (this.notifier = el)} onClose={action('close')} onPush={action('push')} />
        <Button onClick={this.showNotification}>Show notification</Button>
        <Button onClick={() => this.setState({ modal: true })}>Show Modal</Button>
        {this.state.modal && this.renderModal()}
      </div>
    );
  }

  private showNotification = () => {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  };

  private showSimpleNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved');
    }
  }

  private showComplexNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved', {
        label: 'Cancel',
        handler: action('cancel_save'),
      });
    }
  }

  private renderModal() {
    return (
      <Modal>
        <Modal.Header>Modalka</Modal.Header>
        <Modal.Body>
          <Button onClick={this.showNotification}>Show notification</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ modal: false })}>Close Modal</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default { title: 'Toast', parameters: { creevey: { skip: [true] } } };

export const SimpleNotifiacation = () => <TestNotifier />;
SimpleNotifiacation.story = { name: 'simple notifiacation' };

export const ComplexNotifiacation = () => <TestNotifier complex />;
ComplexNotifiacation.story = { name: 'complex notifiacation' };

export const StaticMethod = () => <Button onClick={() => Toast.push('Static method call')}>Show static</Button>;
StaticMethod.story = { name: 'static method' };

// BUG: Не выполняется требование гайдов:
// Всегда показывается только 1 тост. Перед появлением следующего тоста, текущий скрывается, даже если время его показа еще не истекло.

// 0. Кнопка 1 вызывает длинный тост. Кнопка 2 вызывает короткий тост
// 1. Найти кнопку 1. Нажать ее, запустить таймер на 1 секунду
// 2. По истечению таймера сфотографировать 1 тост
// 3. Найти кнопку 2. Нажать ее, запустить таймер на 1 сек
// 4. По истечению таймера сфотографировать 2 тост (1 пропал)

export const ToastDissapearWhenNext: CSFStory<JSX.Element> = () => {
  let toast1: Nullable<Toast>;
  let toast2: Nullable<Toast>;

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Toast ref={el => (toast1 = el)} onClose={action('close')} onPush={action('push')} />
      <Toast ref={el => (toast2 = el)} onClose={action('close')} onPush={action('push')} />
      <div style={{ padding: '4px 200px 200px 4px' }} />
      <Button data-tid="firstButton" onClick={showToast1}>
        Show 1st toast
      </Button>
      <Button data-tid="secondButton" onClick={showToast2}>
        Show 2nd toast
      </Button>
    </div>
  );

  function showToast1() {
    if (toast1) {
      toast1.push('Toast with long name long long');
    }
  }

  function showToast2() {
    if (toast2) {
      toast2.push('Toast');
    }
  }
};

ToastDissapearWhenNext.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const button1 = await this.browser.findElement({ css: '[data-tid~=firstButton]' });
          const button2 = await this.browser.findElement({ css: '[data-tid~=secondButton]' });

          await this.browser
            .actions({ bridge: true })
            .click(button1)
            .perform();

          const toast1 = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button2)
            .perform();

          const toast2 = await element.takeScreenshot();

          await this.expect({ toast1, toast2 }).to.matchImages();
        },
      },
    },
  },
};
