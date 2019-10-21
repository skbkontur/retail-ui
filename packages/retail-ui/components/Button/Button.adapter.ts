import { MouseEvent } from 'react';
import Button, {isButton} from './Button.js';

const ButtonAdapter = {
  click(inst: Button) {
    if (inst.props.onClick) {
      inst.props.onClick({} as MouseEvent<HTMLButtonElement>);
    }
  },

  isDisabled(inst: Button) {
    return !!inst.props.disabled;
  },
};

(Button as any).__ADAPTER__ = ButtonAdapter;

export { isButton };
export default Button;
