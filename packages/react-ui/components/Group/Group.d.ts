import * as React from 'react';

export interface GroupProps {
  width?: string | number;
  children?: React.ReactNode;
}

export interface GroupState {}

export default class Group extends React.Component<GroupProps, GroupState> {}
