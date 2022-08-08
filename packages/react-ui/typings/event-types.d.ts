import React from 'react';

export type MouseEventType<T extends Element = Element> = React.MouseEvent<T> | MouseEvent;
export type FocusEventType<T extends Element = Element> = React.FocusEvent<T> | FocusEvent;
