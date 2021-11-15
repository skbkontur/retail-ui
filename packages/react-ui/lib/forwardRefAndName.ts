import { forwardRef } from 'react';

export interface ReactUIComponentWithRef<T, P>
  extends React.NamedExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
  __KONTUR_REACT_UI__: string;
  propTypes?: React.WeakValidationMap<P>;
}

export function forwardRefAndName<ElementType, Props>(
  name: string,
  render: React.ForwardRefRenderFunction<ElementType, Props>,
): ReactUIComponentWithRef<ElementType, Props> {
  const renderWithRef = forwardRef(render) as ReactUIComponentWithRef<ElementType, Props>;
  renderWithRef.displayName = name;
  renderWithRef.__KONTUR_REACT_UI__ = name;

  return renderWithRef;
}
