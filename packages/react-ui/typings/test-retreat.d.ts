/// <reference types="creevey" />

declare namespace React {
  export = import('react');
}

// declare global {
//   const Comps: typeof DefalutizeComponents<Components>;
// }

declare const expect: typeof import('chai')['expect'];

declare const Key: typeof import('selenium-webdriver/lib/input').Key;
declare type WebDriver = import('selenium-webdriver').WebDriver;

declare const useState: typeof import('react').useState;

declare const Button: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Button,
  import('../index').ButtonProps
>>;

declare const Autocomplete: import('react').ComponentClass<JSX.LibraryManagedAttributes<
  typeof import('../index').Autocomplete,
  import('../index').AutocompleteProps
>>;
