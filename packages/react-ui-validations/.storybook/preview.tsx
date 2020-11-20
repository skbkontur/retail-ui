// import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';
import { isTestEnv } from '../../react-ui/lib/currentEnvironment';

setFilter(fiber => {
  // Транслируем все пропы только для контролов
  const isControlComponent = !!findAmongParents(
    fiber,
    fiberParent => fiberParent.type && typeof fiberParent.type.__KONTUR_REACT_UI__ === 'string',
  );
  if (isTestEnv && isControlComponent) {
    return null;
  }
  // Для остальных компонентов ограничиваемся тестовыми идентификаторами
  return ['data-tid', 'data-testid'];
});

addParameters({
  creevey: {
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
    ],
  },
});
addDecorator(withCreevey());

// addDecorator(story => (
//   <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
//     {story()}
//   </div>
// ));


// interface SortItem {
//   kind: Boolean;
//   id: string;
// }

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
});
