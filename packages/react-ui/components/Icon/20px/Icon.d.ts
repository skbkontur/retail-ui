import * as React from 'react';

export interface IconProps {
  color?: string;
  name: string;
}

export interface IconState {}

export default class Icon extends React.Component<IconProps, IconState> {}
