import React from 'react';
import { createRoot } from 'react-dom/client';
import TestPage from './ReactTestApplication';

window.__RETAIL_UI_VERSION__ = process.env.retailUIVersion;

const container = document.getElementById('content');
if (container) {
  const root = createRoot(container);
  root.render(<TestPage data-tid="testpage" />);
}
