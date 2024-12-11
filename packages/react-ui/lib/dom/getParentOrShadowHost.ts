export function getParentOrShadowHost(element: Element) {
  return element.parentElement || (element.getRootNode() as ShadowRoot).host;
}
