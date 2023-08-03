import { forwardRef } from 'react';

export interface ReactUIComponentWithRef<T, P>
  extends React.NamedExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>,
    Pick<React.ForwardRefExoticComponent<P>, 'propTypes'> {
  __KONTUR_REACT_UI__: string;
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

export interface ReactUIIconWithRef<T, P> extends ReactUIComponentWithRef<T, P> {
  __KONTUR_ICON__: boolean;
}

function forwardIconName<ElementType, Props>(
  name: string,
  render: ReactUIIconWithRef<ElementType, Props>,
): ReactUIIconWithRef<ElementType, Props> {
  render.displayName = name;
  render.__KONTUR_REACT_UI__ = name;
  render.__KONTUR_ICON__ = true;
  return render;
}

export function forwardRefAndIconName<ElementType, Props>(
  name: string,
  render: React.ForwardRefRenderFunction<ElementType, Props>,
): ReactUIIconWithRef<ElementType, Props> {
  return forwardIconName<ElementType, Props>(name, forwardRef(render) as ReactUIIconWithRef<ElementType, Props>);
}
