import { globalObject } from '@skbkontur/global-object';

interface ApiResponseType {
  ok: boolean;
  status: number;
  statusText: string;
  text: () => Promise<string>;
  json: () => Promise<Record<string, any>>;
}

interface GlobalWithXDomainRequest {
  XDomainRequest?: typeof XDomainRequest;
}

type Result = Promise<ApiResponseType>;

export function fetch(uri: string, options: { method?: 'GET' | 'POST'; body?: string } = {}): Result {
  const method = options.method || 'GET';
  const xhr = createXHR();

  const promise = new Promise<ApiResponseType>((resolve, reject) => {
    if (xhr) {
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.onload = () => {
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          text: () => Promise.resolve(xhr.responseText),
          json: () => Promise.resolve(JSON.parse(xhr.responseText)),
        });
      };
    }
  });

  if (xhr) {
    xhr.open(method, uri);
    xhr.send(options.body);
  }

  return promise;
}

function createXHR() {
  const globalWithXDomainRequest = globalObject as GlobalWithXDomainRequest;
  if (globalWithXDomainRequest.XDomainRequest) {
    return new globalWithXDomainRequest.XDomainRequest();
  }
  if (globalObject.XMLHttpRequest) {
    return new globalObject.XMLHttpRequest();
  }
}
