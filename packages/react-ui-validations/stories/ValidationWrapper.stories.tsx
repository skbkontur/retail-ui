import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { text, ValidationContainer, ValidationWrapper } from '../src';

import { IframeRenderer } from './StoryHelpers';

export default {
  title: 'ValidationWrapper',
} as Meta;

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
