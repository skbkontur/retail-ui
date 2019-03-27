import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  background-color: #e5e5e5;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px;
  background: white;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.08);
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}
