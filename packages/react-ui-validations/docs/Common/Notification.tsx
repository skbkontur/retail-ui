import React from 'react';
import styled from 'styled-components';

export const NotificationContainer = styled.a`
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
  background: #3d3d3d;
  color: white;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.375;
  text-decoration: none;
  transition: 0.15s ease;

  &:hover {
    background: #292929;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const NotificationContent = styled.span`
  max-width: 1080px;

  b {
    font-weight: 400;
    white-space: nowrap;
  }
`;

export const NotificationLink = styled.span`
  color: white;
  text-decoration: underline;
  text-underline-offset: 1.5px;
  white-space: nowrap;
  text-decoration-color: #e6e6e6;
  transition: 0.15s ease;

  &:hover {
    text-decoration-color: white;
  }
`;

export function Notification() {
  return (
    <NotificationContainer href="https://tech.skbkontur.ru/kontur-ui/" target="_blank">
      <NotificationContent>
        <b>Документация больше не обновляется.</b> Новая документация на{' '}
        <NotificationLink>tech.skbkontur.ru/kontur-ui</NotificationLink>
      </NotificationContent>
    </NotificationContainer>
  );
}
