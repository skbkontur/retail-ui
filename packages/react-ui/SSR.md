## Server Side Rendering

Контролы поддерживают рендеринг на стороне сервера начиная с версии `2.12.0`.
Но для предварительного рендеринга стилей понадобится установить пакеты `@emotion/react` и `@emotion/server`. И импортировать `cache` из библиотеки контролов.

Подробнее - [https://emotion.sh](https://emotion.sh/docs/ssr)

Условный файл `server.js` будет выглядеть примерно так:

```typescript static
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer, { EmotionCritical } from '@emotion/server/create-instance';
import { cache } from '@skbkontur/react-ui/lib/theming/Emotion';

import { App } from './App';

const { extractCritical } = createEmotionServer(cache);

const element = (
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);

const { html, css, ids } = extractCritical(renderToString(element));

res.status(200).header('Content-Type', 'text/html').send(`<!DOCTYPE html>
<html>
  <head>
    <style data-emotion-css="${cache.key} ${ids.join(' ')}">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="client.js"></script>
  </body>
</html>`);
```

`client.js`

```typescript static
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
```
