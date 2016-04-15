import React from 'react';
import Input from '../Input';

import styles from './PhoneInput.less';

/**
 * Все пропсы пробрасываются во внутренний Input
 */
class PhoneInput extends React.Component {
  static defaultProps = {
    width: 160,
  };

  render() {
    return (
      <Input
        {...this.props}
        width={this.props.width}
        mask="999 999-99-99"
        maskChar={null}
      />
    );
  }
}

export default PhoneInput;
