import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { REACT_UI_PREFIX } from "@skbkontur/react-ui/lib/theming/Emotion"

import { App } from './App';

const key = REACT_UI_PREFIX
const cache = createCache({ key })

ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root'),
);
