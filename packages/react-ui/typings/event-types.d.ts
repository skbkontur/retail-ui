import React from 'react';

export type MouseEventType<T extends HTMLElement = HTMLElement> = React.MouseEvent<T> | MouseEvent;
export type FocusEventType<T extends HTMLElement = HTMLElement> = React.FocusEvent<T> | FocusEvent;
