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
      <div className={styles.phoneWrapper}>
        <Input
          {...this.props}
          width={this.props.width}
          mask="999 999-99-99"
          maskChar={null}
        />
      </div>
    );
  }
}

export default PhoneInput;
