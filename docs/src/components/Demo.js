// @flow
import React from 'react';
import styled from 'styled-components';

type DemoProps = {
    children?: any;
};

const Demo: ReactClass<DemoProps> = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export default Demo;
