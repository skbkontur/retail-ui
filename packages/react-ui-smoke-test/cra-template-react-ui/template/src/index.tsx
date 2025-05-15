import React, {StrictMode} from 'react';
import { render } from 'react-dom';

import { App } from './App';
import * as serviceWorker from './serviceWorker';

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
  render(Content, container);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
