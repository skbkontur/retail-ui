import * as React from 'react';

import IconNames from './IconNames';

export interface IconProps {
  color?: string;
  name: keyof IconNames;
  size?: number | string;
}

export interface IconState {}

export default class Icon extends React.Component<IconProps, IconState> {
  static Names: IconNames;
}
