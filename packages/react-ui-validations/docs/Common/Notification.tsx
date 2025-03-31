import React from 'react';
import styled from 'styled-components';

export const NotificationContainer = styled.div`
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px 20px;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 12px 24px;
  background: #fe4c4c;
  color: white;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.375;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const NotificationContent = styled.div`
  max-width: 1080px;

  b {
    font-weight: 500;
    white-space: nowrap;
  }

  a {
    color: white;
    text-decoration: underline;
    text-underline-offset: 1.5px;
    white-space: nowrap;
  }
`;

export const NotificationButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  background: #fff;
  opacity: 0.955;
  color: #222222;
  font-size: 14px;
  font-family: inherit;
  text-decoration: none;
  transition: 0.15s ease;

  @media (hover) {
    &:hover {
      opacity: 1;
    }
  }

  &:active {
    opacity: 0.92;
  }
`;

export function Notification() {
  return (
    <NotificationContainer>
      <NotificationContent>
        <b>Документация больше не обновляется.</b> Новая документация на{' '}
        <a href="https://tech.skbkontur.ru/kontur-ui/" target="_blank">
          tech.skbkontur.ru/kontur-ui
        </a>
      </NotificationContent>
      <NotificationButton href="https://tech.skbkontur.ru/kontur-ui/" target="_blank">
        Поехали
      </NotificationButton>
    </NotificationContainer>
  );
}
