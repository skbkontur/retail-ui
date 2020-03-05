const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../transformImportsAndExports');

jest.autoMockOff();

defineInlineTest(
  transform,
  { dedupe: false },
  `
    import Button from "@skbkontur/react-ui/Button";
    import Input from "@skbkontur/react-ui/Input/index";
    import Toggle from "@skbkontur/react-ui/components/Toggle";
    import Check from "@skbkontur/react-ui/components/Checkbox/Checkbox";

    import ButtonItem from "@skbkontur/react-ui/components/TopBar/ButtonItem";
    import Item from "@skbkontur/react-ui/components/TopBar/Item";
    import Organizations from "@skbkontur/react-ui/components/TopBar/Organizations";
    import User from "@skbkontur/react-ui/components/TopBar/User";
    import Divider from "@skbkontur/react-ui/components/TopBar/Divider";
    import Start from "@skbkontur/react-ui/components/TopBar/TopBarStart";
    import End from "@skbkontur/react-ui/components/TopBar/TopBarEnd";

    import Icon20 from "@skbkontur/react-ui/components/Icon/20px";
`,
  `
    import { Button } from "@skbkontur/react-ui";
    import { Input } from "@skbkontur/react-ui";
    import { Toggle } from "@skbkontur/react-ui";
    import { Checkbox as Check } from "@skbkontur/react-ui";

    import { TopBarButtonItem as ButtonItem } from "@skbkontur/react-ui";
    import { TopBarItem as Item } from "@skbkontur/react-ui";
    import { TopBarOrganizations as Organizations } from "@skbkontur/react-ui";
    import { TopBarUser as User } from "@skbkontur/react-ui";
    import { TopBarDivider as Divider } from "@skbkontur/react-ui";
    import { TopBarStart as Start } from "@skbkontur/react-ui";
    import { TopBarEnd as End } from "@skbkontur/react-ui";

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal";
  `,
  `transforms default imports`,
);

defineInlineTest(
  transform,
  { dedupe: false },
  `
    import { Radio } from "@skbkontur/react-ui/Radio";
    import { RadioGroup as JustGroup } from "@skbkontur/react-ui/components";
    import * as ReactUI from "@skbkontur/react-ui/components/all";

    import { Body } from "@skbkontur/react-ui/components/Modal/ModalBody";
    import { Header, HeaderProps } from "@skbkontur/react-ui/components/Modal/ModalHeader";
    import { Footer, FooterProps } from "@skbkontur/react-ui/components/Modal/ModalFooter";

    import { ButtonItemProps } from "@skbkontur/react-ui/components/TopBar/ButtonItem";
    import { ItemProps } from "@skbkontur/react-ui/components/TopBar/Item";
    import { OrganizationsProps, OrganizationsState } from "@skbkontur/react-ui/components/TopBar/Organizations";
    import { UserProps } from "@skbkontur/react-ui/components/TopBar/User";

    import { Icon20 } from "@skbkontur/react-ui/components/all";

    import { IconType } from "@skbkontur/react-ui/components/Input/Input";

    import { FiasAPI, Address } from "@skbkontur/react-ui/components/Fias";
    import { Fields, FieldsSettings } from "@skbkontur/react-ui/components/Fias/types";
    import { FiasSearch } from "@skbkontur/react-ui/components/Fias/FiasSearch/FiasSearch";
`,
  `
    import { Radio } from "@skbkontur/react-ui";
    import { RadioGroup as JustGroup } from "@skbkontur/react-ui";
    import * as ReactUI from "@skbkontur/react-ui";

    import { ModalBody as Body } from "@skbkontur/react-ui";
    import { ModalHeader as Header, ModalHeaderProps as HeaderProps } from "@skbkontur/react-ui";
    import { ModalFooter as Footer, ModalFooterProps as FooterProps } from "@skbkontur/react-ui";

    import { TopBarButtonItemProps as ButtonItemProps } from "@skbkontur/react-ui";
    import { TopBarItemProps as ItemProps } from "@skbkontur/react-ui";
    import { TopBarOrganizationsProps as OrganizationsProps, TopBarOrganizationsState as OrganizationsState } from "@skbkontur/react-ui";
    import { TopBarUserProps as UserProps } from "@skbkontur/react-ui";

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal";

    import { InputIconType as IconType } from "@skbkontur/react-ui";

    import { FiasAPI, FiasAddress as Address } from "@skbkontur/react-ui";
    import { FiasFields as Fields, FiasFieldsSettings as FieldsSettings } from "@skbkontur/react-ui";
    import { FiasSearch } from "@skbkontur/react-ui";
  `,
  `transforms named imports`,
);

defineInlineTest(
  transform,
  { dedupe: false },
  `
    import Button, { ButtonProps } from "@skbkontur/react-ui/Button";
    import Input, { InputProps, IconType } from "@skbkontur/react-ui/Input/index";
    import Toggle, { ToggleProps } from "@skbkontur/react-ui/components/Toggle";
    import Check, { CheckboxProps as CheckProps } from "@skbkontur/react-ui/components/Checkbox/Checkbox";

    import ButtonItem, { ButtonItemProps } from "@skbkontur/react-ui/components/TopBar/ButtonItem";
    import Item, { ItemProps } from "@skbkontur/react-ui/components/TopBar/Item";
    import Organizations, { OrganizationProps } from "@skbkontur/react-ui/components/TopBar/Organizations";
    import User, { UserProps } from "@skbkontur/react-ui/components/TopBar/User";

    import Icon20, { IconProps } from "@skbkontur/react-ui/components/Icon/20px";
`,
  `
    import { Button, ButtonProps } from "@skbkontur/react-ui";
    import { Input, InputProps, InputIconType as IconType } from "@skbkontur/react-ui";
    import { Toggle, ToggleProps } from "@skbkontur/react-ui";
    import { Checkbox as Check, CheckboxProps as CheckProps } from "@skbkontur/react-ui";

    import { TopBarButtonItem as ButtonItem, TopBarButtonItemProps as ButtonItemProps } from "@skbkontur/react-ui";
    import { TopBarItem as Item, TopBarItemProps as ItemProps } from "@skbkontur/react-ui";
    import {
        TopBarOrganizations as Organizations,
        TopBarOrganizationProps as OrganizationProps,
    } from "@skbkontur/react-ui";
    import { TopBarUser as User, TopBarUserProps as UserProps } from "@skbkontur/react-ui";

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal";
    import { IconProps } from "@skbkontur/react-ui/internal";
  `,
  `transforms combined imports (default and namded)`,
);

defineInlineTest(
  transform,
  {
    alias: 'retail-ui',
    dedupe: false,
  },
  `
    import React from "react";

    import Toggle from "retail-ui/components/Toggle";
    import Check from "retail-ui/components/Checkbox/Checkbox";

    import { Radio } from "retail-ui/components/Radio";
    import { RadioGroup as JustGroup } from "retail-ui/components";
    import * as ReactUI from "retail-ui/components/all";
`,
  `
    import React from "react";

    import { Toggle } from "@skbkontur/react-ui";
    import { Checkbox as Check } from "@skbkontur/react-ui";

    import { Radio } from "@skbkontur/react-ui";
    import { RadioGroup as JustGroup } from "@skbkontur/react-ui";
    import * as ReactUI from "@skbkontur/react-ui";
  `,
  `transforms retail-ui as alias`,
);

defineInlineTest(
  transform,
  {
    alias: 'ui',
    dedupe: false,
  },
  `
    import React from "react";

    import Toggle from "ui/Toggle";
    import Check from "ui/Checkbox/Checkbox";

    import { Radio } from "ui";
    import { RadioGroup as JustGroup } from "ui";
    import * as ReactUI from "ui";
`,
  `
    import React from "react";

    import { Toggle } from "@skbkontur/react-ui";
    import { Checkbox as Check } from "@skbkontur/react-ui";

    import { Radio } from "@skbkontur/react-ui";
    import { RadioGroup as JustGroup } from "@skbkontur/react-ui";
    import * as ReactUI from "@skbkontur/react-ui";
  `,
  `transforms given alias`,
);

defineInlineTest(
  transform,
  {
    dedupe: false,
  },
  `
    export * from "@skbkontur/react-ui/components";
    export { Switcher, Toggle } from "@skbkontur/react-ui/components/all";

    export * from "@skbkontur/react-ui/components/Button";
    export { default as Button } from "@skbkontur/react-ui/components/Button";
    export { default, InputProps } from "@skbkontur/react-ui/components/Input/Input";
    export { default as SuperRadio, RadioProps as SuperRadioProps } from "@skbkontur/react-ui/Radio";
    `,
  `
    export * from "@skbkontur/react-ui";
    export { Switcher, Toggle } from "@skbkontur/react-ui";

    export * from "@skbkontur/react-ui/components/Button";
    export { Button } from "@skbkontur/react-ui";
    export { Input as default, InputProps } from "@skbkontur/react-ui";
    export { Radio as SuperRadio, RadioProps as SuperRadioProps } from "@skbkontur/react-ui";
  `,
  `transforms reexports`,
);

defineInlineTest(
  transform,
  {},
  `
    export * from "@skbkontur/react-ui/components";
    export { Switcher, Toggle } from "@skbkontur/react-ui/components/all";

    export * from "@skbkontur/react-ui/components/Button";
    export { default as Button } from "@skbkontur/react-ui/components/Button";
    export { default, InputProps } from "@skbkontur/react-ui/components/Input/Input";
    export { default as SuperRadio, RadioProps as SuperRadioProps } from "@skbkontur/react-ui/Radio";

    export { Popup } from "@skbkontur/react-ui/components/Popup";
    export { RenderContainer } from "@skbkontur/react-ui/components/all";
    `,
  `
    export * from "@skbkontur/react-ui";
    export { Switcher, Toggle, Button, Input as default, InputProps, Radio as SuperRadio, RadioProps as SuperRadioProps } from "@skbkontur/react-ui";

    export * from "@skbkontur/react-ui/components/Button";
    export { Popup, RenderContainer } from "@skbkontur/react-ui/internal";
  `,
  `deduplicate reexports reexports`,
);

defineInlineTest(
  transform,
  {
    dedupe: false,
  },
  `
    export { Header as MyHeader, HeaderProps } from "@skbkontur/react-ui/components/Modal/ModalHeader";
    export { default, ButtonItemProps } from "@skbkontur/react-ui/components/TopBar/ButtonItem";
    export { IconType } from "@skbkontur/react-ui/components/Input/Input";
    export { Icon20 } from "@skbkontur/react-ui/components/all";
    export { Button, RenderContainer } from "@skbkontur/react-ui/components/all";
    export { Fias, Address, FiasAPI, FiasSearch } from "@skbkontur/react-ui/components/Fias";
    export { FiasSearchProps } from "@skbkontur/react-ui/components/Fias/FiasSearch/FiasSearch";
    export { Fields } from "@skbkontur/react-ui/components/Fias/types";
    export * from "@skbkontur/react-ui/components/Fias/types";
    `,
  `
    export { ModalHeader as MyHeader, ModalHeaderProps as HeaderProps } from "@skbkontur/react-ui";
    export { TopBarButtonItem as default, TopBarButtonItemProps as ButtonItemProps } from "@skbkontur/react-ui";
    export { InputIconType as IconType } from "@skbkontur/react-ui";
    export { Icon as Icon20 } from "@skbkontur/react-ui/internal";
    export { RenderContainer } from "@skbkontur/react-ui/internal";
    export { Button } from "@skbkontur/react-ui";
    export { Fias, FiasAddress as Address, FiasAPI, FiasSearch } from "@skbkontur/react-ui";
    export { FiasSearchProps } from "@skbkontur/react-ui";
    export { FiasFields as Fields } from "@skbkontur/react-ui";
    export * from "@skbkontur/react-ui/components/Fias/types";
  `,
  `transforms reexports for renamed and internal components`,
);

defineInlineTest(
  transform,
  { dedupe: false },
  `
    import { Calendar } from "@skbkontur/react-ui/Calendar";
    import { FocusTrap } from "@skbkontur/react-ui/components/internal/FocusTrap";
    import { Button, RenderContainer } from "@skbkontur/react-ui/components/all";
    import { Icon as Icon20 } from "@skbkontur/react-ui";
`,
  `
    import { Calendar } from "@skbkontur/react-ui/internal";
    import { FocusTrap } from "@skbkontur/react-ui/internal";
    import { RenderContainer } from "@skbkontur/react-ui/internal";
    import { Button } from "@skbkontur/react-ui";
    import { Icon as Icon20 } from "@skbkontur/react-ui/internal";
  `,
  `transforms internals`,
);

defineInlineTest(
  transform,
  {},
  `
    import React from "react";
    import { Component } from "react";

    import { Toggle } from "@skbkontur/react-ui/components/all";
    import { Checkbox as Check } from "@skbkontur/react-ui/components/all";
    import Popup from "@skbkontur/react-ui/Popup";
    import { FocusTrap } from "@skbkontur/react-ui/components/internal/FocusTrap";
    import * as ReactUI from "@skbkontur/react-ui";
    import Button from "@skbkontur/react-ui/components/Button/Button";

    export { default as Button } from "@skbkontur/react-ui/components/Button";
    export { default } from "@skbkontur/react-ui/components/Input/Input";
    export { RenderContainer } from "@skbkontur/react-ui/components/RenderContainer";
    export { Icon20 as Icon } from "@skbkontur/react-ui/components/all";
`,
  `
    import React from "react";
    import { Component } from "react";

    import { Toggle, Checkbox as Check, Button } from "@skbkontur/react-ui";
    import { Popup, FocusTrap } from "@skbkontur/react-ui/internal";
    import * as ReactUI from "@skbkontur/react-ui";

    export { Button, Input as default } from "@skbkontur/react-ui";
    export { RenderContainer, Icon } from "@skbkontur/react-ui/internal";
  `,
  `deduplicates by default`,
);

defineInlineTest(
  transform,
  {
    dedupe: false,
  },
  `
    import { Toggle } from "@skbkontur/react-ui";
    import { Checkbox as Check } from "@skbkontur/react-ui";
    import * as ReactUI from "@skbkontur/react-ui";
`,
  `
    import { Toggle } from "@skbkontur/react-ui";
    import { Checkbox as Check } from "@skbkontur/react-ui";
    import * as ReactUI from "@skbkontur/react-ui";
  `,
  `doesn't deduplicate with "--dedupe=false"`,
);

defineInlineTest(
  transform,
  {
    alias: 'retail-ui',
  },
  `
    import Input, { IconType } from "retail-ui/components/Input";
    import Check from "retail-ui/components/Checkbox/Checkbox";
    import ButtonItem, { ButtonItemProps } from "retail-ui/components/TopBar/ButtonItem";

    import { Loader, RenderContainer, Icon20 } from "retail-ui/components/all";
    import { RadioGroup as JustGroup } from "retail-ui/components";
    import { Header, HeaderProps as Props } from "retail-ui/components/Modal/ModalHeader";

    export * from "retail-ui/components";
    export { Switcher, Toggle, Icon20 } from "retail-ui/components/all";

    export * from "retail-ui/components/Button";
    export { default as Button } from "retail-ui/components/Button";
    export { default } from "retail-ui/components/Input/Input";
    export { RenderContainer } from "retail-ui/components/RenderContainer";

    import { Calendar } from "retail-ui/Calendar";
    import { FocusTrap } from "retail-ui/components/internal/FocusTrap";
    import { Icon20 as Icon } from "retail-ui/components/all";
`,
  `
    import {
        Input,
        InputIconType as IconType,
        Checkbox as Check,
        TopBarButtonItem as ButtonItem,
        TopBarButtonItemProps as ButtonItemProps,
        Loader,
        RadioGroup as JustGroup,
        ModalHeader as Header,
        ModalHeaderProps as Props,
    } from "@skbkontur/react-ui";
    import { RenderContainer, Icon as Icon20, Calendar, FocusTrap, Icon } from "@skbkontur/react-ui/internal";

    export * from "@skbkontur/react-ui";
    export { Icon as Icon20, RenderContainer } from "@skbkontur/react-ui/internal";
    export { Switcher, Toggle, Button, Input as default } from "@skbkontur/react-ui";

    export * from "@skbkontur/react-ui/components/Button";
  `,
  `deduplicates with alias`,
);
