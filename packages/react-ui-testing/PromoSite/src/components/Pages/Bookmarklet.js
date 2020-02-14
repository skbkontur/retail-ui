// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ContentWrapper = styled.div``;

const Content = styled.div`
    margin: 0 auto;
    text-align: center;
`;

const Bookmarklet = styled.a`
    display: inline-block;
    padding: 2px 10px;
    margin: 0 auto;
    color: #333;
    text-decoration: none;
    border: 1px solid #aaa;
`;

export default class BookmarkletsPage extends React.Component {
    createHrefToBookmarklet(filename): string {
        return (
            'javascript: (function () { ' +
            'var jsCode = document.createElement("script"); ' +
            `jsCode.setAttribute("src", "${process.env.bookmarkletsRoot}/${filename}"); ` +
            'document.body.appendChild(jsCode); ' +
            '}())'
        );
    }

    render(): React.Element<*> {
        return (
            <ContentWrapper>
                <Content>
                    <Bookmarklet href={this.createHrefToBookmarklet('highlight-tid-bookmarklet.js')}>
                        Highlight tids
                    </Bookmarklet>
                </Content>
            </ContentWrapper>
        );
    }
}
