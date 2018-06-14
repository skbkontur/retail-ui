import * as React from 'react';

export interface RenderContainerProps {
  children?: React.ReactNode;
}

export interface RenderContainerState {}

export default class RenderContainer extends React.Component<
  RenderContainerProps,
  RenderContainerState
> {}
