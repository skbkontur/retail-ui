interface ApiResponseType {
  text: () => Promise<string>;
  // tslint:disable-next-line:ban-types
  json: () => Promise<Object>;
}

type Result = Promise<ApiResponseType>;

export default function fetch(
  uri: string,
  options: { method?: 'GET' | 'POST'; body?: string } = {}
): Result {
  const method = options.method || 'GET';
  const xhr = createXHR();

  const promise = new Promise<ApiResponseType>((resolve, reject) => {
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
  // @ts-ignore
  if (global.XDomainRequest) {
    // @ts-ignore
    return new XDomainRequest();
  }
  return new XMLHttpRequest();
}
