import React from 'react';
import styled from 'styled-components';

export const NotificationContainer = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;
  background: #ff4785;
  color: white;
  font-size: 16px;
  line-height: 1.375;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const NotificationContent = styled.div`
  max-width: 1080px;

  a {
    color: white;
  }
`;

export const NotificationButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  background: #fff;
  opacity: 0.955;
  color: #222222;
  font-size: 16px;
  font-family: inherit;
  text-decoration: none;
  transition: 0.15s ease;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 0.92;
  }
`;

export function Notification() {
  return (
    <NotificationContainer>
      <NotificationContent>
        <b>Делаем новую доку.</b> Собираем в ней все наши пакеты, уже сделали навигацию по&nbsp;разделам, управление
        фича-флагами и&nbsp;добавили песочницу для&nbsp;валидаций. Тестируем и&nbsp;собираем обратную связь
        до&nbsp;конца года. Используйте новую доку и рассказывайте нам в&nbsp;
        <a href="https://chat.skbkontur.ru/kontur/channels/new-documentation-react-ui" target="_blank">
          Маттермосте
        </a>{' '}
        как она вам.
      </NotificationContent>
      <NotificationButton href="https://ui.gitlab-pages.kontur.host/storybook-documentation/" target="_blank">
        Попробовать
      </NotificationButton>
    </NotificationContainer>
  );
}
