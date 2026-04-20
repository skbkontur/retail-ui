import { CacheProvider } from '@emotion/react';
import { REACT_UI_PREFIX } from "@skbkontur/react-ui/lib/theming/Emotion"
import React from 'react';
import ReactDOM from 'react-dom';
import createCache from '@emotion/cache';

import { App } from './App';

const key = REACT_UI_PREFIX
const cache = createCache({ key })

ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root'),
);
