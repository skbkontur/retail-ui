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

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";
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

    import { default as InternalCheckbox } from "@skbkontur/react-ui/components/Checkbox";

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

    import { Checkbox as InternalCheckbox } from "@skbkontur/react-ui";

    import { TopBarButtonItemProps as ButtonItemProps } from "@skbkontur/react-ui";
    import { TopBarItemProps as ItemProps } from "@skbkontur/react-ui";
    import { TopBarOrganizationsProps as OrganizationsProps, TopBarOrganizationsState as OrganizationsState } from "@skbkontur/react-ui";
    import { TopBarUserProps as UserProps } from "@skbkontur/react-ui";

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";

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

    import { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";
    import { IconProps } from "@skbkontur/react-ui/internal/icons/20px";
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
    export { Popup } from "@skbkontur/react-ui/internal/Popup";
    export { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
  `,
  `deduplicate reexports`,
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
    export { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";
    export { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
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
    import { createPropsGetter } from "@skbkontur/react-ui/components/internal/createPropsGetter";
    import { MenuItem } from "@skbkontur/react-ui/components/MenuItem";
    import { Menu } from "@skbkontur/react-ui/components/Menu";
    import { PopupMenu, PopupMenuProps, PopupMenuCaptionProps } from "@skbkontur/react-ui/components/internal/PopupMenu";
`,
  `
    import { Calendar } from "@skbkontur/react-ui/internal/Calendar";
    import { FocusTrap } from "@skbkontur/react-ui/internal/FocusTrap";
    import { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
    import { Button } from "@skbkontur/react-ui";
    import { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";
    import { createPropsGetter } from "@skbkontur/react-ui/internal/createPropsGetter";
    import { MenuItem } from "@skbkontur/react-ui";
    import { Menu } from "@skbkontur/react-ui/internal/Menu";
    import { PopupMenuCaptionProps } from "@skbkontur/react-ui/internal/PopupMenu";
    import { PopupMenuProps } from "@skbkontur/react-ui/internal/PopupMenu";
    import { PopupMenu } from "@skbkontur/react-ui/internal/PopupMenu";
  `,
  `transforms internals`,
);

defineInlineTest(
  transform,
  {},
  `
    import LayoutEvents from "@skbkontur/react-ui/lib/LayoutEvents";
    import FLAT_THEME from "@skbkontur/react-ui/lib/Theming/themes/FlatTheme";
    import listenFocusOutside, { containsTargetOrRenderContainer } from "@skbkontur/react-ui/lib/listenFocusOutside";
    import Upgrades from "@skbkontur/react-ui/lib/Upgrades";
`,
  `
    import * as LayoutEvents from "@skbkontur/react-ui/lib/LayoutEvents";
    import { FLAT_THEME } from "@skbkontur/react-ui/lib/Theming/themes/FlatTheme";
    import { listen as listenFocusOutside, containsTargetOrRenderContainer } from "@skbkontur/react-ui/lib/listenFocusOutside";
    import { Upgrade as Upgrades } from "@skbkontur/react-ui/lib/Upgrades";
    `,
  `transforms libs`,
);

defineInlineTest(
  transform,
  {},
  `
    import { Omit } from '@skbkontur/react-ui/typings/utility-types';
`,
  `
    import { Omit } from '@skbkontur/react-ui/typings/utility-types';
    `,
  `transforms typings`,
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
    import { Popup } from "@skbkontur/react-ui/internal/Popup";
    import { FocusTrap } from "@skbkontur/react-ui/internal/FocusTrap";
    import * as ReactUI from "@skbkontur/react-ui";

    export { Button, Input as default } from "@skbkontur/react-ui";
    export { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
    export { Icon } from "@skbkontur/react-ui/internal/icons/20px";
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
    import { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
    import { Icon as Icon20, Icon } from "@skbkontur/react-ui/internal/icons/20px";

    export * from "@skbkontur/react-ui";
    export { Icon as Icon20 } from "@skbkontur/react-ui/internal/icons/20px";
    export { Switcher, Toggle, Button, Input as default } from "@skbkontur/react-ui";

    export * from "@skbkontur/react-ui/components/Button";
    import { Calendar } from "@skbkontur/react-ui/internal/Calendar";
    export { RenderContainer } from "@skbkontur/react-ui/internal/RenderContainer";
    import { FocusTrap } from "@skbkontur/react-ui/internal/FocusTrap";

  `,
  `deduplicates with alias`,
);

defineInlineTest(
  transform,
  {},
  `
    import Colors from "@skbkontur/react-ui/lib/Colors";
    import pluralize from "@skbkontur/react-ui/lib/pluralize";
    import getComputedStyles from "@skbkontur/react-ui/lib/dom/getComputedStyles";

    import ComboBox from "@skbkontur/react-ui/components/ComboBoxOld";
    import DatePicker from "@skbkontur/react-ui/components/DatePickerOld";
    import Kladr from "@skbkontur/react-ui/components/Kladr";

    import styles from "@skbkontur/react-ui/components/Modal/Modal.less";

    import CROSS from 'retail-ui/components/internal/cross';

    export { default } from "@skbkontur/react-ui/lib/Colors";
    export * from "@skbkontur/react-ui/lib/pluralize";
`,
  `
    import Colors from "@skbkontur/react-ui/lib/Colors";
    import pluralize from "@skbkontur/react-ui/lib/pluralize";
    import getComputedStyles from "@skbkontur/react-ui/lib/dom/getComputedStyles";

    import ComboBox from "@skbkontur/react-ui/components/ComboBoxOld";
    import DatePicker from "@skbkontur/react-ui/components/DatePickerOld";
    import Kladr from "@skbkontur/react-ui/components/Kladr";

    import styles from "@skbkontur/react-ui/components/Modal/Modal.less";

    import CROSS from 'retail-ui/components/internal/cross';

    export { default } from "@skbkontur/react-ui/lib/Colors";
    export * from "@skbkontur/react-ui/lib/pluralize";
    `,
  `doesn't transform removed modules`,
);

defineInlineTest(
  transform,
  {
    alias: 'retail-ui',
    dedupe: false,
  },
  `
    import { CalendarDateShape, comparator } from "retail-ui/components/Calendar/CalendarDateShape";
    import { parseDateString } from "retail-ui/components/DatePicker/DatePickerHelpers";
    import PagingHelper from "retail-ui/components/Paging/PagingHelper";
`,
  `
    import { CalendarDateShape } from "@skbkontur/react-ui/internal/Calendar";
    import { comparator } from "@skbkontur/react-ui";
    import { parseDateString } from "@skbkontur/react-ui";
    import { PagingHelper } from "@skbkontur/react-ui";
    `,
  `unsupported cases`,
);

defineInlineTest(
  transform,
  {
    dedupe: false,
  },
  `
    import Button from "@skbkontur/react-ui/Button";
    import { ValidationInfo } from "@skbkontur/react-ui-validations";
    import AddIcon from "@skbkontur/react-ui-icons/svg-icons/Add";
    import Something from "@skbkontur/react-ui-whatever";
`,
  `
    import { Button } from "@skbkontur/react-ui";
    import { ValidationInfo } from "@skbkontur/react-ui-validations";
    import AddIcon from "@skbkontur/react-ui-icons/svg-icons/Add";
    import Something from "@skbkontur/react-ui-whatever";
    `,
  `doesn't transform other packages`,
);

defineInlineTest(
  transform,
  {
    alias: 'retail-ui',
    dedupe: false,
  },
  `
    import Button from "retail-ui/components/Button";
    import { ValidationInfo } from "retail-ui-validations";
`,
  `
    import { Button } from "@skbkontur/react-ui";
    import { ValidationInfo } from "retail-ui-validations";
  `,
  `dont't transform retail-ui-validations`,
);

defineInlineTest(
  transform,
  {},
  `
    import Button from "@material-ui/core";
  `,
  ``,
  `doesn't modify file if there is no changes`,
);
