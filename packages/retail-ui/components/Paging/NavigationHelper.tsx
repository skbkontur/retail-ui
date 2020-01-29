import React from 'react';

import { Nullable } from '../../typings/utility-types';

export interface KeyDescriptionType {
  name: string;
  checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => boolean;
}

let keyDescription: Nullable<KeyDescriptionType> = null;

const getKeyDescription = () => keyDescription || (keyDescription = createKeyDescription());

const createKeyDescription = () =>
  navigator.platform.includes('Mac')
    ? {
        name: 'Alt',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.altKey,
      }
    : {
        name: 'Ctrl',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.ctrlKey,
      };

export const getKeyName = () => getKeyDescription().name;
export const checkKeyPressed = (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => getKeyDescription().checkPressed(event);
