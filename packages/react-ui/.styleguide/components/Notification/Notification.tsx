import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import { styles } from './Notification.styles';

export function Notification() {
  return (
    <a className={cx(styles.notification())} href="https://tech.skbkontur.ru/kontur-ui/" target="_blank">
      <span className={cx(styles.notificationContent())}>
        <b>Документация больше не обновляется.</b> Новая документация на{' '}
        <span className={cx(styles.notificationLink())}>tech.skbkontur.ru/kontur-ui</span>
      </span>
    </a>
  );
}
