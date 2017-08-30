// @flow
/* eslint-disable flowtype/no-weak-types */
type Result = Promise<{
  text: () => Promise<string>,
  json: () => Promise<Object>
}>;

export default function fetch(
  uri: string,
  options: { method?: 'GET' | 'POST', body?: string } = {}
): Result {
  const method = options.method || 'GET';
  const xhr = createXHR();

  const promise = new Promise((resolve, reject) => {
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    xhr.onload = () => {
      resolve({
        text: () => Promise.resolve(xhr.responseText),
        json: () => Promise.resolve(JSON.parse(xhr.responseText))
      });
    };
  });

  xhr.open(method, uri);
  xhr.send(options.body);

  return promise;
}

function createXHR() {
  if (global.XDomainRequest) {
    return new XDomainRequest();
  }
  return new XMLHttpRequest();
}
