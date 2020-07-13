const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../moveToAddons');

jest.autoMockOff();

defineInlineTest(
  transform,
  {
    dedupe: false,
  },
  `
    import { Fias, FiasSearch, FiasAPI } from "@skbkontur/react-ui";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
`,
  `
    import { Fias } from "@skbkontur/react-ui-addons";
    import { FiasSearch } from "@skbkontur/react-ui-addons";
    import { FiasAPI } from "@skbkontur/react-ui-addons";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo } from "@skbkontur/react-ui-addons";
    import { Button } from "@skbkontur/react-ui";
    import { Spinner } from "@skbkontur/react-ui-addons";
    import { Loader } from "@skbkontur/react-ui-addons";
    import { TopBarDropdown } from "@skbkontur/react-ui-addons";
    import { TopBarProps } from "@skbkontur/react-ui-addons";
    import { TopBar } from "@skbkontur/react-ui-addons";
  `,
  `transforms all deprecated components by default`,
);

defineInlineTest(
  transform,
  {},
  `
    import { Fias, FiasSearch, FiasAPI } from "@skbkontur/react-ui";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
`,
  `
    import {
        Fias,
        FiasSearch,
        FiasAPI,
        Logotype as Logo,
        Spinner,
        Loader,
        TopBarDropdown,
        TopBarProps,
        TopBar,
    } from "@skbkontur/react-ui-addons";

    import { Input } from "@skbkontur/react-ui";
    import { Button } from "@skbkontur/react-ui";
  `,
  `deduplicates by default`,
);

defineInlineTest(
  transform,
  {
    component: 'Fias',
    dedupe: false,
  },
  `
    import { Fias, FiasSearch, FiasAPI } from "@skbkontur/react-ui";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
`,
  `
    import { Fias } from "@skbkontur/react-ui-addons";
    import { FiasSearch } from "@skbkontur/react-ui-addons";
    import { FiasAPI } from "@skbkontur/react-ui-addons";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
  `,
  `transforms only specified component`,
);

defineInlineTest(
  transform,
  {
    component: 'Fias',
  },
  `
    import { Fias, FiasSearch, FiasAPI, FiasAddress } from "@skbkontur/react-ui";
    import { FiasFields } from "@skbkontur/react-ui/components/Fias/types";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
`,
  `
    import { Fias, FiasSearch, FiasAPI, FiasAddress, FiasFields } from "@skbkontur/react-ui-addons";
    import { Input } from "@skbkontur/react-ui";
    import { Logotype as Logo, Button } from "@skbkontur/react-ui";
    import { Spinner, Loader } from "@skbkontur/react-ui";
    import { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
  `,
  `deduplicates with specified component`,
);

defineInlineTest(
  transform,
  {},
  `
    export { Fias, FiasSearch, FiasAPI } from "@skbkontur/react-ui";
    export { Input } from "@skbkontur/react-ui";
    export { Logotype as Logo, Button } from "@skbkontur/react-ui";
    export { Spinner, Loader } from "@skbkontur/react-ui";
    export { TopBar, TopBarProps, TopBarDropdown } from "@skbkontur/react-ui";
`,
  `
    export { Fias, FiasSearch, FiasAPI, Logotype as Logo, Spinner, Loader, TopBarDropdown, TopBarProps, TopBar } from "@skbkontur/react-ui-addons";
    export { Input } from "@skbkontur/react-ui";
    export { Button } from "@skbkontur/react-ui";
  `,
  `transforms reexports`,
);

defineInlineTest(
  transform,
  {},
  `
    export * from "@skbkontur/react-ui/components/Fias/types";
`,
  `
    export * from "@skbkontur/react-ui-addons/components/Fias/types";
  `,
  `transforms reexport of all Fias's types`,
);

defineInlineTest(
  transform,
  {},
  `
    export * from "@skbkontur/react-ui";
  `,
  ``,
  `doesn't change source if there is no modidications`,
);
