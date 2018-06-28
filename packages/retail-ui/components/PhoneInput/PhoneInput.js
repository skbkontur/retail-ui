
import * as React from 'react';
import Input from '../Input';

/**
 * Все пропсы пробрасываются во внутренний Input
 */
class PhoneInput extends React.Component<*> {
  render() {
    return (
      <Input
        {...this.props}
        mask="+7 999 999-99-99"
        maskChar={null}
        placeholder="+7"
      />
    );
  }
}

export default PhoneInput;
