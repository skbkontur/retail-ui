import React from 'react';
import { describe, expect, it } from 'vitest';

import { ReactUiDetection } from '../src/ReactUiDetection.js';

function createControl(type: string): React.ReactElement {
  const Component = () => null;
  (Component as unknown as { __KONTUR_REACT_UI__: string }).__KONTUR_REACT_UI__ = type;
  return React.createElement(Component);
}

describe('ReactUiDetection', () => {
  describe('isSelectionControl', () => {
    it.each(['RadioGroup', 'Radio', 'Checkbox', 'Toggle', 'Switcher', 'Select', 'ComboBox'])(
      'returns true for %s',
      (type) => {
        expect(ReactUiDetection.isSelectionControl(createControl(type))).toBe(true);
      },
    );

    it.each(['Input', 'Textarea', 'TokenInput'])('returns false for %s', (type) => {
      expect(ReactUiDetection.isSelectionControl(createControl(type))).toBe(false);
    });
  });
});
