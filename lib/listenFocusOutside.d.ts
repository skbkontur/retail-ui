declare function containsTargetOrRenderContainer(
  target: HTMLElement
): (element: HTMLElement) => void;

declare function listenFocusOutside(
  elements: Array<HTMLElement> | (() => Array<HTMLElement>),
  callback: (event: Event) => void
): { remove: () => void };

export { containsTargetOrRenderContainer };
export default listenFocusOutside;
