import * as React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import Logotype from 'retail-ui/components/Logotype';
import styled from 'styled-components';
import Displaying from './Pages/Displaying';
import Validator from './Pages/Validator';
import Examples from './Pages/Examples';
import Concepts from './Pages/Concepts';

const Layout: React.FunctionComponent = props => {
  return (
    <Root>
      <Helmet defaultTitle="React-UI Validations" titleTemplate="%s | React-UI Validations" />
      <NavigationBar>
        <LogoContainer>
          <Logotype suffix="ui-validations" href="#/" color="#fff" textColor="#fff" />
        </LogoContainer>
        <div>
          <NavigationLink activeClassName={'active'} to="/api">
            API reference
          </NavigationLink>
          <Divider />
          {[Displaying, Validator, Examples, Concepts].map((x, i) => (
            <React.Fragment key={i}>
              <Header>{x.caption}</Header>
              {x.items.map(page => (
                <NavigationLink key={page.url} activeClassName={'active'} to={'/' + page.url}>
                  {page.caption}
                </NavigationLink>
              ))}
            </React.Fragment>
          ))}
        </div>
      </NavigationBar>
      <Content>
        <ContentWrapper>{props.children}</ContentWrapper>
      </Content>
    </Root>
  );
};

export default Layout;

const navigationBarSize = '290px';
const sidebarColor = '#41464e';
const sidebarTextColor = '#ffffff';
const sidebarLinkActiveColor = 'rgba(0, 0, 0, 0.3)';
const sidebarLinkFocusColor = 'rgba(0, 0, 0, 0.2)';

const Divider = styled.div`
  height: 1px;
  margin: 10px 20px;
  background-color: #888;
`;

const Header = styled.div`
  padding: 10px 20px;
  font-size: 18px;
`;

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
  overflow: auto;
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
