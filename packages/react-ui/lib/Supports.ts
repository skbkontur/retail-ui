export let IS_PROXY_SUPPORTED: boolean;
try {
  new Proxy({}, {});
  IS_PROXY_SUPPORTED = true;
} catch {
  IS_PROXY_SUPPORTED = false;
}
