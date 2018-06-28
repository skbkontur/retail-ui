
import React from 'react';
import styled from 'styled-components';
import Code from 'react-syntax-highlighter';

type DemoProps = {
    children?: any;
    demo: ReactClass<*>;
    source: string;
};

const DemoContainer = styled.div`
    border: 1px solid #aaa;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
`;

export default function Demo({ children, demo, source }: DemoProps): React.Element<*> {
    const DemoComponent = demo;
    return (
        <div>
            <DemoContainer>
                {DemoComponent
                    ? <DemoComponent />
                    : children}
            </DemoContainer>
            {source && <Code language='javascript'>
                {source}
            </Code>}
        </div>
    );
}
