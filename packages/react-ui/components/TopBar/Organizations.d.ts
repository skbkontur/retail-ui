import * as React from 'react';

export interface TopBarOrganizationsProps {
  caption: React.ReactNode;
  children?: React.ReactNode;
  comment?: string | null;
}

export interface TopBarOrganizationsState {}

export default class TopBarOrganizations extends React.Component<
  TopBarOrganizationsProps,
  TopBarOrganizationsState
> {}
