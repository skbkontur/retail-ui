import * as React from 'react';
import { InputProps } from '../Input/Input';

export interface AutocompleteProps extends InputProps {
  renderItem?: (item: string) => React.ReactNode;
  source: Array<string> | ((pattern: string) => Promise<Array<string>>);
  onChange?: (event: { target: { value: string } }, value: string) => void;
}

export interface AutocompleteState {
  items: Array<string> | null;
  selected: number;
}

export default class Autocomplete extends React.Component<
  AutocompleteProps,
  AutocompleteState
> {
  focus(): void;
}
