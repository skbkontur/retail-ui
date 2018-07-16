// @flow
import React from "react";
import ReactDom from "react-dom";

import { Router, IndexRoute, Route, useRouterHistory } from "react-router";
import createHashHistory from "history/lib/createHashHistory";

import Layout from "./components/Layout";
import Api from "./components/Pages/Api.md";
import GettingStarted from "./components/Pages/GettingStarted.md";
import Description from "./components/Pages/Description.md";
import Examples from "./components/Pages/Examples";
import Concepts from "./components/Pages/Concepts";

import "./styles/reset.less";
import "./styles/typography.less";

const history = useRouterHistory(createHashHistory)();

ReactDom.render(
    <Router history={history}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Description} />
            {Examples.map(page => <Route key={page.url} path={page.url} component={page.component} />)}
            {Concepts.map(page => <Route key={page.url} path={page.url} component={page.component} />)}
            <Route path="api" component={Api}>
                <Route path="*" />
            </Route>
            <Route path="getting-started" component={GettingStarted}>
                <Route path="*" />
            </Route>
        </Route>
    </Router>,
    document.getElementById("content")
);
