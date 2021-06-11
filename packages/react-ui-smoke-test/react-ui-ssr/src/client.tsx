import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from '@emotion/react';
import { cache } from '@skbkontur/react-ui/lib/theming/Emotion';

import { App } from './App';

ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root'),
);
