import * as React from 'react';

export default function reactGetTextContent(rootReactNode: React.ReactNode) {
  let result = '';

  const getText = (reactNode: React.ReactNode) => {
    if (typeof reactNode === 'string' || typeof reactNode === 'number') {
      result += reactNode.toString();
    } else if (Array.isArray(reactNode)) {
      reactNode.forEach(node => getText(node));
    } else if (React.isValidElement(reactNode) && reactNode.props) {
      // tslint:disable-next-line:no-console
      console.log('elem', reactNode);

      // @ts-ignore
      const { children } = reactNode.props;

      getText(children);
    }
  };

  getText(rootReactNode);

  // tslint:disable-next-line:no-console
  console.log('result', result);

  return result;
}
