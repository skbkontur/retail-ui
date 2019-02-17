const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;
const transform = require("../transform");

defineInlineTest(
  transform,
  {},
  `
    declare class C extends React.Component<{
      prop: number;
    }> {
      public static defaultProps = {
        prop: number
      }
    }
  `,
  `
    declare class C extends React.Component<{
      prop?: number;
    }> {
      public static defaultProps = {
        prop: number
      }
    }
  `,
  "transforms TSTypeLiteral"
);
