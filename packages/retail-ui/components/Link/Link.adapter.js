

import Link from './Link.js';

const LinkAdapter = {
  click(inst) {
    inst.props.onClick();
  },

  isDisabled(inst) {
    return !!inst.props.disabled;
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(Link: Object).__ADAPTER__ = LinkAdapter;

export default Link;
