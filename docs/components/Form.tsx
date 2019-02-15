import * as React from "react";
import styled from "styled-components";

type FormProps = {
    children?: any,
};

type FormLineProps = {
    children?: any,
    title: string,
};

type ActionsBarProps = {
    children?: any,
};

const FormWrapper = styled.div<FormProps>`
    display: flex;
    flex-direction: column;
`;

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
    ${"" /* > span {
        display: inline-flex;
    } */};
`;

const FormLine: React.FunctionComponent<FormLineProps> = props => {
    return (
        <Line>
            <Title>{props.title}</Title>
            <Content>{props.children}</Content>
        </Line>
    );
};

const ActionsBar = styled.div<ActionsBarProps>`
    margin-top: 20px;
    padding-left: 140px;
`;

export default class Form extends React.Component<FormProps> {
    static Line: typeof FormLine = FormLine;
    static ActionsBar: typeof ActionsBar = ActionsBar;

    render() {
        return <FormWrapper {...this.props}/>;
    }
}
