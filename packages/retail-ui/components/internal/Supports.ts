export let IS_PROXY_SUPPORTED: boolean;
try {
  // tslint:disable-next-line:no-unused-expression
  new Proxy({}, {});
  IS_PROXY_SUPPORTED = true;
} catch (e) {
  IS_PROXY_SUPPORTED = false;
}
