import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const Title = styled.span`
  box-sizing: border-box;
  margin-right: 10px;
  width: 150px;
  text-align: right;
`;

const Content = styled.span`
  display: inline-flex;
`;

interface FormLineProps {
  children?: React.ReactNode;
  title: React.ReactNode;
}

const FormLine: React.SFC<FormLineProps> = (props) => {
  return (
    <Line>
      <Title>{props.title}</Title>
      <Content>{props.children}</Content>
    </Line>
  );
};

const FormLineBreak = styled.div`
  height: 20px;
`;

interface ActionsBarProps {
  children?: React.ReactNode;
}

const ActionsBar = styled.div<ActionsBarProps>`
  margin-top: 10px;
  padding-left: 160px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type FormProps = {
  children?: React.ReactNode;
};

export class Form extends React.Component<FormProps> {
  public static Line: typeof FormLine = FormLine;
  public static LineBreak: typeof FormLineBreak = FormLineBreak;
  public static ActionsBar: typeof ActionsBar = ActionsBar;

  public render() {
    return <FormWrapper {...this.props} />;
  }
}
