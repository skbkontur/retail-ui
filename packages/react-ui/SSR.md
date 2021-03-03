## Server Side Rendering

Контролы поддерживают рендеринг на стороне сервера начиная с версии `2.12.0`. Но для предварительного рендеринга стилей понадобится установить пакеты `@emotion/core` и `create-emotion-server`. И импортировать `cache` из библиотеки контролов.

Подробнее - [https://emotion.sh](https://5faaafd0bd0f3f0008469537--emotion.netlify.app/docs/ssr)

Условный файл `server.js` будет выглядеть примерно так:

```typescript static
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/core';
import createEmotionServer, { EmotionCritical } from 'create-emotion-server';
import { cache } from '@skbkontur/react-ui/lib/theming/Emotion';

import { App } from './App';

const { extractCritical } = createEmotionServer(cache);

const element = (
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);

const { html, css, ids } = extractCritical(renderToString(element));

function getPageHTML({ html, css, ids }: EmotionCritical) {
  return `<!DOCTYPE html>
<html>
  <head>
    <style data-emotion-css="${ids.join(' ')}">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="client.js"></script>
  </body>
</html>`;
}
```

`client.js`

```typescript static
import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from '@emotion/core';
import { cache } from '@skbkontur/react-ui/lib/theming/Emotion';

import { App } from './App';

ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root'),
);
```
