// @flow
import React from 'react';
import ReactDom from 'react-dom';

import { Router, IndexRoute, Route, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import Layout from './components/Layout/Layout';
import Description from './components/Pages/Description';
import OnBlurValidations from './components/Pages/OnBlurValidations';
import OnBlurValidationsWithSubmitValidation from './components/Pages/OnBlurValidationsWithSubmitValidation';
import DifferentMessages from './components/Pages/DifferentMessages';
import SimpleTextMessages from './components/Pages/SimpleTextMessages';
import ScrollDifferentMessages from './components/Pages/ScrollDifferentMessages';
import ManyEditors from './components/Pages/ManyEditors';

import './styles/reset.less';
import './styles/typography.less';

const history = useRouterHistory(createHashHistory)();

ReactDom.render(
    <Router history={history}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Description} />
            <Route path='OnBlurValidations' component={OnBlurValidations} />
            <Route path='OnBlurValidationsWithSubmitValidation' component={OnBlurValidationsWithSubmitValidation} />
            <Route path='DifferentMessages' component={DifferentMessages} />
            <Route path='SimpleTextMessages' component={SimpleTextMessages} />
            <Route path='ScrollDifferentMessages' component={ScrollDifferentMessages} />
            <Route path='ManyEditors' component={ManyEditors} />
        </Route>
    </Router>,
    document.getElementById('content'));
