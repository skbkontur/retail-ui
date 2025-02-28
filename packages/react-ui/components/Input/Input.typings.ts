import type React from 'react';

export type InputElement = (HTMLInputElement | { input: HTMLInputElement | null }) & {
  getRootNode: () => HTMLElement | null;
};

export type InputElementProps = React.InputHTMLAttributes<HTMLInputElement>;
