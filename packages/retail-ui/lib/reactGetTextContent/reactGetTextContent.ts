import React from 'react';

export function reactGetTextContent(rootReactNode: React.ReactNode) {
  let result = '';

  const getText = (reactNode: React.ReactNode) => {
    if (typeof reactNode === 'string' || typeof reactNode === 'number') {
      result += reactNode.toString();
    } else if (Array.isArray(reactNode)) {
      reactNode.forEach(node => getText(node));
    } else if (React.isValidElement(reactNode) && reactNode.props) {
      // @ts-ignore
      const { children } = reactNode.props;

      getText(children);
    }
  };

  getText(rootReactNode);

  return result;
}
