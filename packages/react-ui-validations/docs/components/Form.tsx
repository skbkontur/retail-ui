import * as React from 'react';
import styled from 'styled-components';

const Line = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const Title = styled.span`
  box-sizing: border-box;
  margin-right: 10px;
  width: 130px;
  text-align: right;
`;

const Content = styled.span`
  display: inline-flex;
`;

interface FormLineProps {
  children?: React.ReactNode;
  title: string;
}

const FormLine: React.SFC<FormLineProps> = props => {
  return (
    <Line>
      <Title>{props.title}</Title>
      <Content>{props.children}</Content>
    </Line>
  );
};

interface ActionsBarProps {
  children?: React.ReactNode;
}

const ActionsBar = styled.div<ActionsBarProps>`
  margin-top: 20px;
  padding-left: 140px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface FormProps {
  children?: React.ReactNode;
}

export default class Form extends React.Component<FormProps> {
  public static Line: typeof FormLine = FormLine;
  public static ActionsBar: typeof ActionsBar = ActionsBar;

  public render() {
    return <FormWrapper {...this.props} />;
  }
}
