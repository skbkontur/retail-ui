import type React from 'react';

import { isMac } from '../../lib/client.js';
import type { Nullable } from '../../typings/utility-types.js';

export interface KeyDescriptionType {
  name: string;
  checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => boolean;
}

const createKeyDescription = () =>
  isMac
    ? {
        name: '⌥',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.altKey,
      }
    : {
        name: 'Ctrl',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.ctrlKey,
      };

const keyDescription: Nullable<KeyDescriptionType> = createKeyDescription();

export const getKeyName = () => keyDescription.name;
export const checkKeyPressed = (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) =>
  keyDescription.checkPressed(event);
