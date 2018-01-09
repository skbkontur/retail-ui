import * as React from 'react';

import { SpinnerTypes } from '../Spinner';

export interface LoaderProps {
  active: boolean;
  caption?: string;
  className?: string;
  type?: SpinnerTypes;
  children?: React.ReactNode;
}

export interface LoaderState {}

export default class Loader extends React.Component<LoaderProps, LoaderState> {}
