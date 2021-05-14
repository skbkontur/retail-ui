// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logotype } from 'retail-ui/components/Logotype';

type LayoutProps = {
    children?: any,
    location: any,
};

function Layout({ children, location }: LayoutProps) {
    return (
        <Root>
            <Helmet defaultTitle="React-UI selenium testing" titleTemplate="%s | React-UI selenium testing" />
            <NavigationBar>
                <LogoContainer>
                    <Logotype suffix="ui-testing" href="#/" color="#fff" textColor="#fff" />
                </LogoContainer>
                <div>
                    <NavigationLink className={location.pathname === '/quick-start' ? 'active' : ''} to="/quick-start">
                        Квик-старт
                    </NavigationLink>
                    <NavigationLink
                        className={location.pathname === '/expose-tids-to-dom' ? 'active' : ''}
                        to="/expose-tids-to-dom"
                    >
                        Скрипт для работы с DOM
                    </NavigationLink>
                    <NavigationLink
                        className={location.pathname === '/page-objects-dot-net' ? 'active' : ''}
                        to="/page-objects-dot-net"
                    >
                        PageObjects для .NET
                    </NavigationLink>
                    <NavigationLink className={location.pathname === '/bookmarklet' ? 'active' : ''} to="/bookmarklet">
                        Bookmarklet
                    </NavigationLink>
                </div>
            </NavigationBar>
            <Content>
                <ContentWrapper>{children}</ContentWrapper>
            </Content>
        </Root>
    );
}

export default withRouter(Layout);

const navigationBarSize = '290px';
const sidebarColor = '#41464e';
const sidebarTextColor = '#ffffff';
const sidebarLinkActiveColor = 'rgba(0, 0, 0, 0.3)';
const sidebarLinkFocusColor = 'rgba(0, 0, 0, 0.2)';

const Root = styled.div`
    h1 {
        margin-bottom: 30px;
    }

    h2 {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    h3 {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    h4 {
        margin-bottom: 10px;
    }

    pre {
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 10px;
    }

    strong {
        font-weight: 600;
    }

    em {
        font-style: italic;
    }

    ul {
        padding: 0 0 0 40px;
        margin: 10px 0;
        list-style-type: disc;
    }

    ol {
        padding: 0 0 0 40px;
        margin: 10px 0;
        list-style-type: decimal;
    }
`;

const NavigationBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${navigationBarSize};
    background-color: ${sidebarColor};
    color: ${sidebarTextColor};
    padding: 33px 0 0;
    box-sizing: border-box;
`;

const Content = styled.div`
    margin-left: ${navigationBarSize};
    padding: 100px 20px 100px 40px;
`;

const ContentWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const LogoContainer = styled.div`
    display: block;
    padding: 30px 20px;
`;

const NavigationLink = styled(Link)`
    display: block;
    padding: 10px 0 10px 30px;
    color: ${sidebarTextColor};

    &.active {
        background-color: ${sidebarLinkActiveColor};

        &:hover,
        &:focus {
            background-color: ${sidebarLinkFocusColor};
        }
    }

    &:hover,
    &:focus {
        background-color: ${sidebarLinkFocusColor};
    }
`;
