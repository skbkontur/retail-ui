import { EmotionCritical } from '@emotion/server/create-instance';

export function getPageHTML(key: string, { html, css, ids }: EmotionCritical) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style data-emotion-css="${key} ${ids.join(' ')}">${css}</style>
    <title>Server side rendering</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="client.js"></script>
  </body>
</html>`;
}
