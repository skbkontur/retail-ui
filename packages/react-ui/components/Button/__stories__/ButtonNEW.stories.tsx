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
  { use: 'default' },
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

// Arrow - default - warning - error - checked - !default  - focus - size
export const arrowSmallStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: true }}
  />
);
arrowSmallStates.storyName = 'Arrow small(default) button table';

const arrowDifferentStates: ButtonState[] = [
  { warning: true },
  { error: true },
  { checked: true },
  { visuallyFocused: true },
  { warning: true, error: true },
  { warning: true, checked: true },
  { warning: true, visuallyFocused: true },
  { error: true, checked: true },
  { error: true, visuallyFocused: true },
  { checked: true, visuallyFocused: true },
]

export const arrowMediumStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: true, size: 'medium' }}
  />
);
arrowMediumStates.storyName = 'Arrow medium button table';

export const arrowLargeStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: true, size: 'large' }}
  />
);
arrowLargeStates.storyName = 'Arrow large button table';

// Arrow left - default - warning - error - checked - !default  - focus - size
export const arrowLeftSmallStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left' }}
  />
);
arrowLeftSmallStates.storyName = 'Arrow left small(default) button table';

export const arrowLeftMediumStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left', size: 'medium' }}
  />
);
arrowLeftMediumStates.storyName = 'Arrow left medium button table';

export const arrowLeftLargeStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left', size: 'large' }}
  />
);
arrowLeftLargeStates.storyName = 'Arrow left large button table';

// Loading - checked - focused -  active - hover(checked)
export const loadingStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={loadingCheckedFocusedActiveStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', loading: true }}
  />
);
loadingStates.storyName = 'Loading button table';

const loadingCheckedFocusedActiveStates: ButtonState[] = [
  { checked: true },
  { visuallyFocused: true },
  { active: true },
  { checked: true, visuallyFocused: true },
  { checked: true, active: true },
  { visuallyFocused: true, active: true },
]

// Narrow - size
export const narrowStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={narrowtates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', narrow: true }}
  />
);
narrowStates.storyName = 'Narrow button table';

const narrowtates: ButtonState[] = [
  { size: 'small' },
  { size: 'medium' },
  { size: 'large' },
]

// Widht - align - use: link
// align - widht
export const widthStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={widthAlignStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: 'auto' }}
  />
);
widthStates.storyName = 'Width auto button table';

export const width200pxStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={widthAlignStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: '200px' }}
  />
);
width200pxStates.storyName = 'Width 200px button table';

const widthAlignStates: ButtonState[] = [
  { align: 'center' },
  { align: 'end' },
  { align: 'inherit' }, //???
  { align: 'initial' },
  { align: 'justify' },
  { align: 'left' },
  { align: 'right' },
  { align: 'start' },
  { align: 'match-parent' },//???
  { align: 'revert' },
  { align: 'unset' },

]

// Link - wight - align - warning - error - focused - disabled - и подумать с чем еще  - loading
// Icon - size - notext - child - contect

// Disabled - active - hover(checked)
export const disabledStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={disabledDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', disabled: true }}
  />
);
disabledStates.storyName = 'Disabled button table';

const disabledDifferentStates: ButtonState[] = [
  {},
  { active: true },
  { checked: true },
  { active: true, checked: true },
]

// Checked - disabled - focused
export const checkedStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={checkedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', checked: true }}
  />
);
checkedStates.storyName = 'Checked button table';

const checkedDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { visuallyFocused: true },
  { disabled: true, visuallyFocused: true },
]
