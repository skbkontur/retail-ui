import React, { CSSProperties, SyntheticEvent } from 'react';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';

interface CustomControls<E = HTMLElement> {
  ref?: React.ForwardedRef<E>;
  error?: boolean;
  warning?: boolean;
  onBlur?: React.EventHandler<SyntheticEvent>;
  onChange: React.ChangeEventHandler<E>;
}

interface MyInputProps extends CustomControls<HTMLInputElement> {
  value?: string;
  onValueChange?: unknown;
}

const CoverMyInput = React.forwardRef<HTMLInputElement, MyInputProps>(function MyInput(
  { error, warning, onValueChange, ...props },
  ref,
) {
  const style: CSSProperties = {};
  if (error) {
    style.borderColor = 'red';
  }
  if (warning) {
    style.borderColor = 'orange';
  }
  return <input type="text" ref={ref} style={style} {...props} />;
});

const CustomControlsDemo = () => {
  const [value, setValue] = React.useState('error');
  let validationInfo: ValidationInfo | null = null;

  switch (value) {
    case 'error':
      validationInfo = { type: 'lostfocus', message: <b>Ошибка</b>, level: 'error' };
      break;
    case 'warning':
      validationInfo = {
        type: 'lostfocus',
        message: <b>Предупреждение</b>,
        level: 'warning',
      };
      break;
  }

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validationInfo}>
        <CoverMyInput value={value} onChange={(e) => setValue(e.target.value)} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};

export default CustomControlsDemo;
