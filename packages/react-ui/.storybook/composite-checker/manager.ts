import { useGlobals, addons, types } from '@storybook/manager-api';
import { useEffect } from 'react';

// NOTE: Because storybook addons are not loaded in composite mode, this simple addon only runs in non-composite mode and resets the `isComposite` flag
const Render = () => {
  const [globals, updateGlobals] = useGlobals();

  useEffect(() => {
    if (globals.isComposite) {
      updateGlobals({ isComposite: false });
    }
  }, [globals.isComposite])

  return null;
}

addons.register('Checker addon', () => {
  addons.add('Checker tool', {
    type: types.TOOL,
    title: 'Composite checker',
    match: () => true,
    render: Render,
  });
});
