import React, { useRef } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithoutRef } from '../../typings/react-ref';
import { mergeRefs } from '../../lib/utils';

import { useFocusAndBlurHandles } from './useFocusAndBlurHandles';

interface NativeProps {
  disabled?: boolean;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
}

function NativeFunc<T extends React.ElementType>(
  { as, disabled, onBlur, onFocus, ...rest }: PolymorphicPropsWithoutRef<NativeProps, T>,
  ref: React.ForwardedRef<Element>,
) {
  const objRef = useRef<HTMLElement>(null);

  const Root: React.ElementType = as;
  const { handleFocus } = useFocusAndBlurHandles({ element: objRef.current, disabled, onBlur, onFocus });

  return <Root {...rest} ref={mergeRefs([ref, objRef])} disabled={disabled} onFocus={handleFocus}></Root>;
}
NativeFunc.__KONTUR_REACT_UI__ = 'Native';

export const Native: PolymorphicForwardRefExoticComponent<NativeProps, 'span'> = forwardRefAndName(
  'Native',
  NativeFunc,
);
