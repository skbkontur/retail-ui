import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { withCreevey } from 'creevey/addon';
import React from 'react';

setFilter((fiber) => {
  // Транслируем все пропы только для контролов
  const isControlComponent = !!findAmongParents(
    fiber,
    (fiberParent) => fiberParent.type && typeof fiberParent.type.__KONTUR_REACT_UI__ === 'string',
  );
  if (isControlComponent) {
    return null;
  }
  // Для остальных компонентов ограничиваемся тестовыми идентификаторами
  return ['data-tid', 'data-testid'];
});

export const decorators = [
  (Story: any) => (
    <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
      <Story />
    </div>
  ),
  withCreevey(),
];

export const parameters = {
  creevey: {
    captureElement: '#test-element',
  },
};
