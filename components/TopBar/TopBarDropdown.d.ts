import * as React from 'react';

import { DropdownProps } from '../Dropdown';

export interface TopBarDropdownProps extends DropdownProps {}

export interface TopBarDropdownState {}

export default class TopBarDropdown extends React.Component<
  TopBarDropdownProps,
  TopBarDropdownState
> {
  open(): void;
}
