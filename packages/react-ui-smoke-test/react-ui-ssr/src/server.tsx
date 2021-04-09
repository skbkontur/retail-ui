import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from '@skbkontur/react-ui/lib/theming/Emotion';

const { extractCritical } = createEmotionServer(cache);

import { App } from './App';
import { getPageHTML } from './getPageHTML';

const element = (
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);

export const page = getPageHTML(cache.key, extractCritical(renderToString(element)));

fs.writeFile('./dist/index.html', page, function(err) {
  if (err) {
    throw err;
  }
});
