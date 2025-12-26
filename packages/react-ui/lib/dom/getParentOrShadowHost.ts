export function getParentOrShadowHost(element: Element): Element {
  return element.parentElement || (element.getRootNode() as ShadowRoot).host;
}
