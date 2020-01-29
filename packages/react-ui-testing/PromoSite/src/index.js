// @flow
import React from 'react';
import ReactDom from 'react-dom';

import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Description from './components/Pages/Description.md';
import QuickStart from './components/Pages/QuickStart.md';
import ExposeTidsToDom from './components/Pages/ExposeTidsToDom.md';
import PageObjectsDotNet from './components/Pages/PageObjectsDotNet.md';
import Bookmarklet from './components/Pages/Bookmarklet';

import './styles/reset.less';
import './styles/typography.less';

ReactDom.render(
    <HashRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Description} />
                <Route exact path="/quick-start" component={QuickStart} />
                <Route exact path="/expose-tids-to-dom" component={ExposeTidsToDom} />
                <Route exact path="/page-objects-dot-net" component={PageObjectsDotNet} />
                <Route exact path="/bookmarklet" component={Bookmarklet} />
            </Switch>
        </Layout>
    </HashRouter>,
    document.getElementById('content'),
);
