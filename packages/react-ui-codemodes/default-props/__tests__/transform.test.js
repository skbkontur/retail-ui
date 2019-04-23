const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../transform');

defineInlineTest(
  transform,
  {},
  `
    declare class C extends React.Component<{
      prop: number
    }> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  `
    declare class C extends React.Component<{
      prop?: number
    }> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  'transforms TSTypeLiteral',
);

defineInlineTest(
  transform,
  {},
  `
    type Props = {
      prop: number
    };

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  `
    type Props = {
      prop?: number
    };

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  'transforms TSTypeReference: TSTypeAlias',
);

defineInlineTest(
  transform,
  {},
  `
    interface Props {
      prop: number
    };

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  `
    interface Props {
      prop?: number
    };

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  'transforms TSTypeReference: TSInterface',
);

defineInlineTest(
  transform,
  {},
  `
    declare type Props = Override<AnotherProps, {
      prop: number
    }>;

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  `
    declare type Props = Override<AnotherProps, {
      prop?: number
    }>;

    declare class C extends React.Component<Props> {
      public static defaultProps: {
        prop: number,
      }
    }
  `,
  'transforms TSTypeReference: Override',
);
