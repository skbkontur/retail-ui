import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import type { Meta } from '@storybook/react';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { ValidationContainer, ValidationWrapper, text } from '../index.js';
import { IframeRenderer } from './StoryHelpers.js';

const meta: Meta = {
  title: 'ValidationWrapper',
};

export default meta;

const ScrollMessage = forwardRef((_, ref) => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');
  const submit = () => refContainer?.current?.submit();

  useImperativeHandle(ref, () => ({ ref, submit }));

  return (
    <div>
      <ValidationContainer ref={refContainer}>
        <div data-tid="wrapper-to-scroll" style={{ padding: 10 }}>
          <Button data-tid="top-submit" onClick={() => submit()}>
            Отправить
          </Button>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <ValidationWrapper
            validationInfo={{ message: 'Должно быть не пусто', type: 'submit' }}
            renderMessage={text('bottom')}
          >
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>

          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <Button data-tid="bottom-submit" onClick={() => submit()}>
            Отправить
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
});

export const CustomControlsAfterSubmit = () => {
  const containerRef = useRef<ValidationContainer>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Deliberately remount the custom input when submit updates the parent state.
  // The tooltip must attach to the new DOM node, not the detached input.
  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomInput = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean; warning?: boolean; onValueChange?: unknown }
  >(function CustomInput({ error, warning, onValueChange, ...props }, ref) {
    return <input {...props} ref={ref} style={{ border: `1px solid ${error ? 'red' : '#999'}` }} />;
  });

  return (
    <div style={{ padding: 40 }}>
      <ValidationContainer ref={containerRef} disableSmoothScroll>
        <ValidationWrapper validationInfo={{ type: 'submit', message: 'Ошибка' }}>
          <CustomInput aria-label="Кастомное поле" defaultValue="error" />
        </ValidationWrapper>
        <div style={{ marginTop: 20 }}>
          <Button onClick={async () => setIsValid(Boolean(await containerRef.current?.validate()))}>Submit</Button>
          {isValid === false && <span style={{ marginLeft: 10 }}>Форма невалидна</span>}
        </div>
      </ValidationContainer>
    </div>
  );
};

export const ScrollAndFocusInIframe = () => {
  const ref = useRef<ValidationContainer>(null);

  return (
    <>
      <Button data-tid="outside-submit" onClick={() => ref.current?.submit()}>
        Отправить снаружи
      </Button>
      <IframeRenderer height="500px" width="100%">
        <ScrollMessage ref={ref} />
      </IframeRenderer>
    </>
  );
};
