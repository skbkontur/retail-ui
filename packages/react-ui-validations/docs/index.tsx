import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './Layout';
import Api from './Pages/Api.md';
import GettingStarted from './Pages/Displaying/GettingStarted/GettingStarted.md';
import { Examples } from './Pages/Examples';
import { Displaying } from './Pages/Displaying';
import { Validator } from './Pages/Validator';
import { Concepts } from './Pages/Concepts';

import 'docs/styles/reset.less';
import 'docs/styles/typography.less';

const App = hot(() => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={GettingStarted} />
        {[...Examples.items, ...Displaying.items, ...Validator.items, ...Concepts.items].map((page) => (
          <Route key={page.url} path={`/${page.url}`} component={page.component} />
        ))}
        <Route path="/api" component={Api} />
        <Route path="/getting-started" component={GettingStarted} />
      </Switch>
    </Layout>
  </Router>
));

render(<App />, document.getElementById('content'));
