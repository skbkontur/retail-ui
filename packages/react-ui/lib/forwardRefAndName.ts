import React from 'react';

export interface CompoundedComponent<T> extends React.ForwardRefExoticComponent<T> {
  __KONTUR_REACT_UI__: string;
}

export function forwardRefAndName<ElementType, Props>(
  name: string,
  render: React.ForwardRefRenderFunction<ElementType, Props>,
) {
  const renderWithRef = React.forwardRef(render) as CompoundedComponent<Props>;

  renderWithRef.displayName = name;
  renderWithRef.__KONTUR_REACT_UI__ = name;
  return renderWithRef;
}
