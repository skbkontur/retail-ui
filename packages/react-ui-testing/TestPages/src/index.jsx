import React from 'react';
import ReactDom from 'react-dom';
import TestPage from './ReactTestApplication';

window.__RETAIL_UI_VERSION__ = process.env.retailUIVersion;

ReactDom.render(<TestPage data-tid="testpage" />, document.getElementById('content'));
