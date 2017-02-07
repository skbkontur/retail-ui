// @flow
import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import Layout from './components/Layout/Layout';
import OnBlurValidations from './components/OnBlurValidations/OnBlurValidations';
import OnBlurValidationsWithSubmitValidation from './components/OnBlurValidations/OnBlurValidationsWithSubmitValidation';
import DifferentMessages from './components/OnBlurValidations/DifferentMessages';
import SimpleTextMessages from './components/OnBlurValidations/SimpleTextMessages';
import ScrollDifferentMessages from './components/OnBlurValidations/ScrollDifferentMessages';
import ManyEditors from './components/OnBlurValidations/ManyEditors';

import './styles/reset.less';
import './styles/typography.less';

const history = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDom.render(
    <Router history={history}>
        <Route path='/' component={Layout}>
            <Route path='OnBlurValidations' component={OnBlurValidations} />
            <Route path='OnBlurValidationsWithSubmitValidation' component={OnBlurValidationsWithSubmitValidation} />
            <Route path='DifferentMessages' component={DifferentMessages} />
            <Route path='SimpleTextMessages' component={SimpleTextMessages} />
            <Route path='ScrollDifferentMessages' component={ScrollDifferentMessages} />
            <Route path='ManyEditors' component={ManyEditors} />
        </Route>
    </Router>,
    document.getElementById('content'));
