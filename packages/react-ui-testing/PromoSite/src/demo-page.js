// @flow
import React from 'react';
import ReactDom from 'react-dom';
import DemoPage from './components/DemoPage/DemoPage';

import './styles/reset.less';
import './styles/typography.less';

ReactDom.render(<DemoPage />, document.getElementById('content'));
