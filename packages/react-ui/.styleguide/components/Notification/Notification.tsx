import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import { styles } from './Notification.styles';

export function Notification() {
  return (
    <div className={cx(styles.notification())}>
      <div className={cx(styles.notificationContent())}>
        <b>Документация больше не обновляется.</b> Новая документация на{' '}
        <a href="https://tech.skbkontur.ru/kontur-ui/" target="_blank">
          tech.skbkontur.ru/kontur-ui
        </a>
      </div>
      <a href="https://tech.skbkontur.ru/kontur-ui/" className={cx(styles.notificationButton())} target="_blank">
        Поехали
      </a>
    </div>
  );
}
