/// <reference types="creevey" />

declare namespace React {
  export = import('react');
}

declare const expect: typeof import('chai')['expect'];

declare const Key: typeof import('selenium-webdriver/lib/input').Key;
declare type WebDriver = import('selenium-webdriver').WebDriver;

declare const Autocomplete: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Autocomplete,
  import('../index').AutocompleteProps
>>;
declare const Button: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Button,
  import('../index').ButtonProps
>>;
declare const Center: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Center,
  import('../index').CenterProps
>>;
declare const Checkbox: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Checkbox,
  import('../index').CheckboxProps
>>;
declare const ComboBox: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').ComboBox,
  import('../index').ComboBoxProps
>>;
declare const CurrencyInput: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').CurrencyInput,
  import('../index').CurrencyInputProps
>>;
declare const CurrencyLabel: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').CurrencyLabel,
  import('../index').CurrencyLabelProps
>>;
declare const DateInput: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').DateInput,
  import('../index').DateInputProps
>>;
declare const DatePicker: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').DatePicker,
  import('../index').DatePickerProps
>>;
declare const Dropdown: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Dropdown,
  import('../index').DropdownProps
>>;
declare const DropdownMenu: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').DropdownMenu,
  import('../index').DropdownMenuProps
>>;
declare const Fias: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Fias,
  import('../index').FiasProps
>>;
declare const FxInput: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').FxInput,
  import('../index').FxInputProps
>>;
declare const Gapped: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Gapped,
  import('../index').GappedProps
>>;
declare const Group: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Group,
  import('../index').GroupProps
>>;
declare const Hint: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Hint,
  import('../index').HintProps
>>;
declare const Icon: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Icon,
  import('../index').IconProps
>>;
declare const Input: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Input,
  import('../index').InputProps
>>;
declare const Kebab: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Kebab,
  import('../index').KebabProps
>>;
declare const Link: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Link,
  import('../index').LinkProps
>>;
declare const Loader: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Loader,
  import('../index').LoaderProps
>>;
declare const Logotype: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Logotype,
  import('../index').LogotypeProps
>>;
declare const Menu: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Menu,
  import('../index').MenuProps
>>;
declare const MenuHeader: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').MenuHeader,
  import('../index').MenuHeaderProps
>>;
declare const MenuItem: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').MenuItem,
  import('../index').MenuItemProps
>>;
declare const MenuSeparator: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').MenuSeparator,
  import('../index').MenuSeparatorProps
>>;
declare const Modal: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Modal,
  import('../index').ModalProps
>>;
declare const Paging: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Paging,
  import('../index').PagingProps
>>;
declare const PasswordInput: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').PasswordInput,
  import('../index').PasswordInputProps
>>;
declare const Radio: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Radio,
  import('../index').RadioProps
>>;
declare const RadioGroup: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').RadioGroup,
  import('../index').RadioGroupProps
>>;
declare const ScrollContainer: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').ScrollContainer,
  import('../index').ScrollContainerProps
>>;
declare const Select: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Select,
  import('../index').SelectProps
>>;
declare const SidePage: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').SidePage,
  import('../index').SidePageProps
>>;
declare const Spinner: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Spinner,
  import('../index').SpinnerProps
>>;
declare const Sticky: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Sticky,
  import('../index').StickyProps
>>;
declare const Switcher: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Switcher,
  import('../index').SwitcherProps
>>;
declare const Tabs: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Tabs,
  import('../index').TabsProps
>>;
declare const Textarea: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Textarea,
  import('../index').TextareaProps
>>;
declare const Toast: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Toast,
  import('../index').ToastProps
>>;
declare const Toggle: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Toggle,
  import('../index').ToggleProps
>>;
declare const Token: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Token,
  import('../index').TokenProps
>>;
declare const TokenInput: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').TokenInput,
  import('../index').TokenInputProps
>>;
declare const Tooltip: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Tooltip,
  import('../index').TooltipProps
>>;
declare const TooltipMenu: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').TooltipMenu,
  import('../index').TooltipMenuProps
>>;
declare const TopBar: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').TopBar,
  import('../index').TopBarProps
>>;
