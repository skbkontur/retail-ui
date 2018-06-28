
import React from 'react';
import styled from 'styled-components';

type FormProps = {
    children?: any;
};

type FormLineProps = {
    children?: any;
    title: string;
};

type ActionsBarProps = {
    children?: any;
};

const Form: ReactClass<FormProps> = styled.div`
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
    > span {
        display: inline-flex;
    }
`;

function FormLine({ children, title }: FormLineProps): React.Element<*> {
    return (
        <Line>
            <Title>{title}</Title>
            <Content>{children}</Content>
        </Line>
    );
}

const ActionsBar: ReactClass<ActionsBarProps> = styled.div`
    margin-top: 20px;
    padding-left: 140px;
`;

Form.Line = FormLine;
Form.ActionsBar = ActionsBar;
export default Form;
