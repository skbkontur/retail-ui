import * as React from 'react';

export interface IconProps {
  color?: string;
  name: string;
  size?: number | string;
}

export interface IconState {}

export default class Icon extends React.Component<IconProps, IconState> {}
