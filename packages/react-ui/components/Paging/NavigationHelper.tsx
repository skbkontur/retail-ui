import type React from 'react';

import { isMac } from '../../lib/client';
import type { Nullable } from '../../typings/utility-types';
import type { Theme } from '../../lib/theming/Theme';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

export interface KeyDescriptionType {
  name: string;
  checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => boolean;
}

let keyDescription: Nullable<KeyDescriptionType> = null;

const getKeyDescription = (theme: Theme) => keyDescription || (keyDescription = createKeyDescription(theme));

const createKeyDescription = (theme: Theme) =>
  isMac
    ? {
        name: isThemeGTE(theme, '5.3') ? '⌥' : 'Alt',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.altKey,
      }
    : {
        name: 'Ctrl',
        checkPressed: (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => event.ctrlKey,
      };

export const getKeyName = (t: Theme) => getKeyDescription(t).name;
export const checkKeyPressed = (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>, theme: Theme) =>
  getKeyDescription(theme).checkPressed(event);
