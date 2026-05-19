import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { App } from './App';

const container = document.getElementById('root');

let strictMode = false;
if (process.env.STRICT_MODE === "true") {
  strictMode = true;
}

function StrictModeWrapper(props: {children: React.ReactElement}) {
  return strictMode
    ? <StrictMode>
      {props.children}
    </StrictMode>
    : props.children
}

const Content = (<StrictModeWrapper>
  <App />
</StrictModeWrapper>)

if (container) {
  // React 18+ exports createRoot from react-dom/client; React 19 removed render().
  let createRoot: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    createRoot = require('react-dom/client').createRoot;
  } catch {
    // React 16/17
  }

  if (createRoot) {
    const root = createRoot(container);
    root.render(Content);
  } else {
    (ReactDOM as any).render(Content, container);
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
