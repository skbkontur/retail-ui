import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Router, IndexRoute, Route, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import Layout from './Layout';
import Api from './Pages/Api.md';
import GettingStarted from './Pages/Displaying/GettingStarted/GettingStarted.md';
import Examples from './Pages/Examples';
import Declarations from './Pages/Displaying';
import Builder from './Pages/Validator';
import Concepts from './Pages/Concepts';

import 'docs/styles/reset.less';
import 'docs/styles/typography.less';

const history = useRouterHistory(createHashHistory)();

ReactDom.render(
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Layout}>
      <IndexRoute component={GettingStarted} />
      {[...Examples.items, ...Declarations.items, ...Builder.items, ...Concepts.items].map(page => (
        <Route key={page.url} path={page.url} component={page.component} />
      ))}
      <Route path="api" component={Api} />
      <Route path="getting-started" component={GettingStarted}>
        <Route path="*" />
      </Route>
    </Route>
  </Router>,
  document.getElementById('content'),
);
