import React, {
  CSSProperties,
  FC,
  FormEvent,
  PropsWithChildren,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { globalObject } from '@skbkontur/global-object';
import type { Meta } from '@storybook/react';

import type { Story } from '../../typings/stories';

import { FocusControlWrapper } from './FocusControlWrapper';

export default { title: 'FocusControlWrapper' } as Meta;

const Header: FC<PropsWithChildren<any>> = ({ children }) => <h1 style={{ margin: 10 }}>{children}</h1>;
const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => (
  <div style={{ border: 'black solid 1px', margin: 10, padding: 10 }}>{children}</div>
);

const useFormHandlers = () => {
  const _timeOutID2: any = useRef(null);
  const _timeOutID: any = useRef(null);
  let _controller: any = new AbortController();

  useEffect(() => {
    return () => {
      _controller?.abort();
      _controller = null;
      clearTimeout(_timeOutID.current);
      clearTimeout(_timeOutID2.current);
    };
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    new Promise((resolve) => {
      setIsDisabled(true);
      _timeOutID.current = setTimeout(resolve, 100);
    }).then(() => setIsDisabled(false));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      new Promise((resolve) => {
        setIsDisabled(true);
        _timeOutID2.current = setTimeout(resolve, 100);
      }).then(() => setIsDisabled(false));
    }
  }, []);

  globalObject.document?.addEventListener('keydown', handleKeyDown, {
    signal: _controller?.signal
  } as AddEventListenerOptions);

  return {
    isDisabled,
    handleSubmit,
  };
};

const BrokenInput = ({ disabled }: { disabled?: boolean }) => {
  const [focus, setFocus] = useState<boolean>(false);

  const styles: CSSProperties = focus ? { border: '1px solid blue' } : {};

  const handleBlur = () => setFocus(false);
  const handleFocus = () => setFocus(true);
  const handleResetFocus = () => setFocus(false);

  return (
    <FocusControlWrapper onBlurWhenDisabled={handleResetFocus}>
      <input type="text" disabled={disabled} style={styles} onBlur={handleBlur} onFocus={handleFocus} />
    </FocusControlWrapper>
  );
};

export const Input: Story = () => {
  const { isDisabled, handleSubmit } = useFormHandlers();
  return (
    <>
      <Header>Форма</Header>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <BrokenInput disabled={isDisabled} />
          <button type="submit">Submit</button>
        </form>
      </Wrapper>
    </>
  );
};

Input.parameters = {
  creevey: {
    skip: true,
  },
};
