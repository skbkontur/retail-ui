import React from 'react';
import styled from 'styled-components';
import { Button, Gapped } from '@skbkontur/react-ui';

import { SourceCode } from './SourceCode';

const DemoWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DemoContainer = styled.div`
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 20px;
  font-size: 14px;
`;

interface DemoProps {
  demo: React.ComponentClass<any>;
  source?: string;
}
export default class Demo extends React.Component<DemoProps> {
  public state = {
    isVisible: false,
  };

  public render() {
    const { demo: DemoComponent, source } = this.props;
    return (
      <DemoWrapper>
        <Gapped vertical gap={8}>
          <DemoContainer>
            <DemoComponent />
          </DemoContainer>
          {source && this.renderSourceBlock(source, this.state.isVisible)}
        </Gapped>
      </DemoWrapper>
    );
  }

  private renderSourceBlock = (source: string, isVisible: boolean) => {
    return (
      <Gapped vertical gap={0}>
        <Button use={'link'} onClick={() => this.setState({ isVisible: !isVisible })}>
          VIEW CODE
        </Button>
        {isVisible && <SourceCode source={source} />}
      </Gapped>
    );
  };
}
