import Link from './Link';

const LinkAdapter = {
  click(inst: Link) {
    if (inst.props.onClick) {
      inst.props.onClick();
    }
  },

  isDisabled(inst: Link) {
    return !!inst.props.disabled;
  }
};

Link.__ADAPTER__ = LinkAdapter;

export default Link;
