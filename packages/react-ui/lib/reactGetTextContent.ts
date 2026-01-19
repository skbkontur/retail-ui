import React from 'react';

export function reactGetTextContent(rootReactNode: React.ReactNode): string {
  let result = '';

  const getText = (reactNode: React.ReactNode) => {
    if (typeof reactNode === 'string' || typeof reactNode === 'number') {
      result += reactNode.toString();
    } else if (Array.isArray(reactNode)) {
      reactNode.forEach((node) => getText(node));
    } else if (
      React.isValidElement(reactNode) &&
      reactNode.props &&
      typeof reactNode.props === 'object' &&
      'children' in reactNode.props
    ) {
      const { children } = reactNode.props;

      getText(children as React.ReactNode);
    }
  };

  getText(rootReactNode);

  return result;
}
