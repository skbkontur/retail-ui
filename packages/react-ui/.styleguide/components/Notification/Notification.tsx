import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import { styles } from './Notification.styles';

export function Notification() {
  return (
    <div className={cx(styles.notification())}>
      <div className={cx(styles.notificationContent())}>
        <b>Делаем новую доку.</b> Собираем в ней все наши пакеты, уже сделали навигацию по&nbsp;разделам, управление
        фича-флагами и&nbsp;добавили песочницу для&nbsp;валидаций. Тестируем и&nbsp;собираем обратную связь
        до&nbsp;конца года. Используйте новую доку и рассказывайте нам в&nbsp;
        <a href="https://chat.skbkontur.ru/kontur/channels/new-documentation-react-ui" target="_blank">
          Маттермосте
        </a>{' '}
        как она вам.
      </div>
      <a
        href="https://ui.gitlab-pages.kontur.host/storybook-documentation/"
        className={cx(styles.notificationButton())}
        target="_blank"
      >
        Попробовать
      </a>
    </div>
  );
}
