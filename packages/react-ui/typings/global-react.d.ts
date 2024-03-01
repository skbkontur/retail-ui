export * from 'react';

declare module 'react' {
  interface Context {
    __KONTUR_REACT_UI__?: string;
  }
}
