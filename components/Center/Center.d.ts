import * as React from 'react';

export interface CenterProps {
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export interface CenterState {}

export default class Center extends React.Component<CenterProps, CenterState> {}