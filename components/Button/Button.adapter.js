// @flow

import Button from './Button.js';

const ButtonAdapter = {
  click(inst) {
    if (inst.props.onClick) {
      inst.props.onClick();
    }
  },

  isDisabled(inst) {
    return !!inst.props.disabled;
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(Button: any).__ADAPTER__ = ButtonAdapter;

export default Button;
