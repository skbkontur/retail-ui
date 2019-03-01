import * as React from 'react';
import styled from 'styled-components';
import Code from 'react-syntax-highlighter';

interface DemoProps {
  demo?: React.ComponentClass<any>;
  source?: string;
}

const DemoContainer = styled.div`
  border: 1px solid #aaa;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Demo: React.FunctionComponent<DemoProps> = ({ children, demo, source }) => {
  const DemoComponent = demo;
  return (
    <div>
      <DemoContainer>{DemoComponent ? <DemoComponent /> : children}</DemoContainer>
      {source && <Code language="javascript">{source}</Code>}
    </div>
  );
};

export default Demo;
