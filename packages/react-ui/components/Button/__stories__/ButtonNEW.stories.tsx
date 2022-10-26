import React from 'react';
import { ComponentTable } from '../../../internal/ComponentTable';
import { Button, ButtonProps } from '../Button';

// 	  Use	    Active	Checked (в будущем hover)
// 1	Default	True	  True
// 2	Default	True	  False
// 3	Default	False	  True
// 4	Default	False 	False
// 5	Primary	True	  True
// 6	Primary	True	  False
// 7	Primary	False	  True
// 8	Primary	False 	False
// 9	Success	True	  True
// 10	Success	True	  False
// 11	Success	False	  True
// 12	Success	False 	False
// 13	Danger	True	  True
// 14	Danger	True	  False
// 15	Danger	False	  True
// 16	Danger	False 	False
// 17	Pay	    True	  True
// 18	Pay	    True	  False
// 19	Pay	    False	  True
// 20	Pay	    False 	False
// 21	Link	  True	  True
// 22	Link	  True	  False
// 23	Link	  False	  True
// 24	Link	  False 	False


export default {
  title: 'NewButtonTests',
};

type ButtonState = Partial<ButtonProps>;

const useStates: ButtonState[] = [
  { use: 'default' },
  { use: 'primary' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'success' },
  { use: 'link' }
];
const testingButtonUseStates: ButtonState[] = [
  { use: 'primary' },
  { use: 'link' },
]

// Use - checked (hover) - active
export const mainBtnTable = () => (
  <ComponentTable
    Component={Button}
    rows={useStates.map((x) => ({ props: x }))}
    cols={activeCheckedStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
mainBtnTable.storyName = 'Main Button table';

const activeCheckedStates: ButtonState[] = [
  { active: true, checked: true },
  { active: true, checked: false },
  { active: false, checked: true },
  { active: false, checked: false }
]

// Warning - use - arrow, size
export const warningStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={warningArrowSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', warning: true }}
  />
);
warningStates.storyName = 'Warning button table';

const warningArrowSizeStates: ButtonState[] = [
  {},
  { size: 'medium' },
  { size: 'large' },
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'large' },
]

// Error - use - arrow, size
export const errorStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={errorArrowSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', error: true }}
  />
);
errorStates.storyName = 'Error button table';

const errorArrowSizeStates: ButtonState[] = [
  {},
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
]

//visuallyFocused - use - arrow, size
export const focusedStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={focusedArrowSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', visuallyFocused: true }}
  />
);
focusedStates.storyName = 'Focused button table';

const focusedArrowSizeStates: ButtonState[] = [
  {},
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
]
