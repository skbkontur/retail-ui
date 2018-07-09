import * as React from 'react';
import { Nullable } from '../../typings/utility-types';

export interface KeyDescriptionType {
  name: string;
  checkPressed: (event: React.KeyboardEvent<HTMLElement>) => boolean;
}

let keyDescription: Nullable<KeyDescriptionType> = null;

const getKeyDescription = () =>
  keyDescription || (keyDescription = createKeyDescription());

const createKeyDescription = () =>
  navigator.platform.includes('Mac')
    ? {
        name: 'Alt',
        checkPressed: (event: React.KeyboardEvent<HTMLElement>) => event.altKey
      }
    : {
        name: 'Ctrl',
        checkPressed: (event: React.KeyboardEvent<HTMLElement>) => event.ctrlKey
      };

export default {
  getKeyName() {
    return getKeyDescription().name;
  },
  checkKeyPressed(event: React.KeyboardEvent<HTMLElement>) {
    return getKeyDescription().checkPressed(event);
  }
};
