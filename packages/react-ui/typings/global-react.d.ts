export * from 'react';

interface KonturComponent {
  __KONTUR_REACT_UI__?: string;
}

declare module 'react' {
  interface Context extends KonturComponent {}
  interface ForwardRefExoticComponent extends KonturComponent {}
  interface FunctionComponent extends KonturComponent {}
  interface ComponentClass extends KonturComponent {}
}
