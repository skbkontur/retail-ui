declare var ReactTesting: {
  ref: any,
  pass: any,
  findDOMNodes: (query: string, parent?: HTMLElement) => Array<HTMLElement>,
  call: (node: HTMLElement, method: string, args?: Array<any>) => any
};
