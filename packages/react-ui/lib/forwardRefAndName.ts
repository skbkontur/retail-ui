import { forwardRef } from 'react';

export interface ReactUIComponentWithRef<T, P>
  extends React.NamedExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
  __KONTUR_REACT_UI__: string;
  propTypes?: React.WeakValidationMap<P>;
}

function forwardName<ElementType, Props>(
  name: string,
  render: ReactUIComponentWithRef<ElementType, Props>,
): ReactUIComponentWithRef<ElementType, Props> {
  render.displayName = name;
  render.__KONTUR_REACT_UI__ = name;
  return render;
}

export function forwardRefAndName<ElementType, Props>(
  name: string,
  render: React.ForwardRefRenderFunction<ElementType, Props>,
): ReactUIComponentWithRef<ElementType, Props> {
  return forwardName<ElementType, Props>(name, forwardRef(render) as ReactUIComponentWithRef<ElementType, Props>);
}
