import React from 'react';
import styled from 'styled-components';

const CaseContainer = styled.div`
  break-inside: avoid;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 10px 0 10px 0;
`;

const CaseTitle = styled.h4`
  margin-bottom: 10px;
`;

export function Case({ children, title }) {
  return (
    <CaseContainer>
      <CaseTitle>{title}</CaseTitle>
      {children}
    </CaseContainer>
  );
}

Case.Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    margin-bottom: 10px;
  }
  > *:last-child {
    margin-bottom: 0;
  }
`;

const CaseSuiteContainer = styled.div`
  column-count: 3;
  column-gap: 3em;
  column-rule: 1px solid rgba(0, 0, 0, 0.2);
`;

const CaseSuiteHeader = styled.h1`
  margin-bottom: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export function CaseSuite({ children, title }) {
  return (
    <div>
      <CaseSuiteHeader>{title}</CaseSuiteHeader>
      <CaseSuiteContainer>{children}</CaseSuiteContainer>
    </div>
  );
}
