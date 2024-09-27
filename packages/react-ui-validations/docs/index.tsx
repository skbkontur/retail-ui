import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        {[...Examples.items, ...Displaying.items, ...Validator.items, ...Concepts.items].map((page) => (
          <Route key={page.url} path={`/${page.url}`} element={React.createElement(page.component)} />
        ))}
        <Route path="/api" element={<Api />} />
        <Route path="/getting-started" element={<GettingStarted />} />
      </Routes>
    </Layout>
  </Router>
));

render(<App />, document.getElementById('content'));
