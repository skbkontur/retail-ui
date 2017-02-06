// @flow
// import React from 'react';
// import ReactDom from 'react-dom';

// import { Router, Route, browserHistory } from 'react-router';

// import Layout from './components/Layout/Layout';
// import OnBlurValidations from './components/OnBlurValidations/OnBlurValidations';
// import OnBlurValidationsWithSubmitValidation from './components/OnBlurValidations/OnBlurValidationsWithSubmitValidation';
// import DifferentMessages from './components/OnBlurValidations/DifferentMessages';
// import SimpleTextMessages from './components/OnBlurValidations/SimpleTextMessages';
// import ScrollDifferentMessages from './components/OnBlurValidations/ScrollDifferentMessages';
// import ManyEditors from './components/OnBlurValidations/ManyEditors';

// import './styles/reset.less';
// import './styles/typography.less';

// ReactDom.render(
//     <Router history={browserHistory}>
//         <Route path='/ValidationsDemo' component={Layout}>
//             <Route path='OnBlurValidations' component={OnBlurValidations} />
//             <Route path='OnBlurValidationsWithSubmitValidation' component={OnBlurValidationsWithSubmitValidation} />
//             <Route path='DifferentMessages' component={DifferentMessages} />
//             <Route path='SimpleTextMessages' component={SimpleTextMessages} />
//             <Route path='ScrollDifferentMessages' component={ScrollDifferentMessages} />
//             <Route path='ManyEditors' component={ManyEditors} />
//         </Route>
//     </Router>,
//     document.getElementById('content'));

import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    <div>Hello from react</div>,
    document.getElementById('content'));
