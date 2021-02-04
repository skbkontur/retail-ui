import { Theme } from '../../lib/theming/Theme';

export enum ThemeType {
  Default = 'default',
  Flat = 'flat',
  Dark = 'dark',
  Default8px = 'default8px',
  Flat8px = 'flat8px',
}

export const VARIABLES_GROUPS = [
  { title: 'Common', prefix: 'null', isCommon: true },
  { title: 'Button', prefix: 'btn' },
  { title: 'Border', prefix: 'border' },
  { title: 'Checkbox', prefix: 'checkbox' },
  { title: 'DatePicker', prefix: 'date calendar picker' },
  { title: 'Dropdown', prefix: 'dropdown' },
  { title: 'Input', prefix: 'input' },
  { title: 'Link', prefix: 'link' },
  { title: 'Loader', prefix: 'loader' },
  { title: 'Menu', prefix: 'menu' },
  { title: 'Modal', prefix: 'modal' },
  { title: 'Paging', prefix: 'paging' },
  { title: 'Popup', prefix: 'popup' },
  { title: 'Radio', prefix: 'radio' },
  { title: 'SidePage', prefix: 'sidePage' },
  { title: 'Tabs', prefix: 'tab' },
  { title: 'Textarea', prefix: 'textarea' },
  { title: 'Toast', prefix: 'toast' },
  { title: 'Toggle', prefix: 'toggle' },
  { title: 'Tooltip', prefix: 'tooltip' },
  { title: 'Token', prefix: 'token' },
  { title: 'TokenInput', prefix: 'tokenInput' },
  { title: 'Select', prefix: 'select' },
  { title: 'Spinner', prefix: 'spinner' },
  { title: 'Switcher', prefix: 'switcher' },
  { title: 'Legacy', prefix: 'chb slt' },
];

export const DEPRECATED_VARIABLES: Array<keyof Theme> = [];
