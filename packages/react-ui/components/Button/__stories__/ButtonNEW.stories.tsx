import React from 'react';
import { ComponentTable } from '../../../internal/ComponentTable';
import { Button, ButtonProps } from '../Button';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePack from '@skbkontur/react-icons/ArchivePack';

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
const testingLinkState: ButtonState[] = [
  { use: 'link' },
]

// Use - checked (hover) - active
export const mainBtnTable = () => (
  <ComponentTable
    Component={Button}
    rows={useStates.map((x) => ({ props: x }))}
    cols={activeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
mainBtnTable.storyName = 'Main Button table';

const activeDifferentStates: ButtonState[] = [
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
    rows={warningDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', warning: true }}
  />
);
warningStates.storyName = 'Warning button table';

const warningDifferentStates: ButtonState[] = [
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
    rows={errorDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', error: true }}
  />
);
errorStates.storyName = 'Error button table';

const errorDifferentStates: ButtonState[] = [
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
    rows={focusedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', visuallyFocused: true }}
  />
);
focusedStates.storyName = 'Focused button table';

const focusedDifferentStates: ButtonState[] = [
  {},
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
]

//Borderless - disabled  - loading - checked - visuallyFocused, error, warning -active,
export const borderlessStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={borderlessDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', borderless: true }}
  />
);
borderlessStates.storyName = 'Borderless button table';

const borderlessDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { loading: true },
  { checked: true },
  { visuallyFocused: true },
  { error: true },
  { warning: true },
  { active: true },
]

export const sizeStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
sizeStates.storyName = 'Size button table';

const sizeDifferentStates: ButtonState[] = [
  { size: 'small' },
  { size: 'medium' },
  { size: 'large' },
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

// Loading - checked - focused -  active
export const loadingStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={loadingDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', loading: true }}
  />
);
loadingStates.storyName = 'Loading button table';

const loadingDifferentStates: ButtonState[] = [
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
    rows={narrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', narrow: true }}
  />
);
narrowStates.storyName = 'Narrow button table';

const narrowDifferentStates: ButtonState[] = [
  { size: 'small' },
  { size: 'medium' },
  { size: 'large' },
]

// Widht - align
export const widthStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={widthDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: 'auto' }}
  />
);
widthStates.storyName = 'Width auto button table';

export const width200pxStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={widthDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: '200px' }}
  />
);
width200pxStates.storyName = 'Width 200px button table';

const widthDifferentStates: ButtonState[] = [
  { align: 'center' },
  { align: 'end' },
  { align: 'justify' },
  { align: 'left' },
  { align: 'right' },
  { align: 'start' },
]

// Link - wight - align - warning - error - focused - disabled - loading
export const linkStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingLinkState.map((x) => ({ props: x }))}
    rows={linkDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', use: 'link' }}
  />
);
linkStates.storyName = 'Link statess';

const linkDifferentStates: ButtonState[] = [
  { children: 'Default width' },
  { width: 'auto' },
  { width: 200 },
  { align: 'center' },
  { align: 'left' },
  { align: 'right' },
  { align: 'end' },
  { align: 'start' },
  { align: 'justify' },
  { warning: true },
  { warning: true, size: 'medium' },
  { warning: true, size: 'large' },
  { error: true },
  { error: true, size: 'medium' },
  { error: true, size: 'large' },
  { visuallyFocused: true },
  { visuallyFocused: true, size: 'medium' },
  { visuallyFocused: true, size: 'large' },
  { disabled: true },
  { disabled: true, size: 'medium' },
  { disabled: true, size: 'large' },
  { loading: true },
  { loading: true, size: 'medium' },
  { loading: true, size: 'large' },
]

// Icon - size - notext - child - content
export const IconStates = () => (
  <table>
    <tr>
      <th></th>
      <th>Size: default</th>
      <th>Size: medium</th>
      <th>Size: large</th>
    </tr>
    <tr>
      <td>Icon</td>
      <td><Button icon={<OkIcon />} >Button</Button></td>
      <td><Button icon={<OkIcon />} size='medium'>Button</Button></td>
      <td><Button icon={<OkIcon />} size='large'>Button</Button></td>
    </tr>
    <tr>
      <td>Icon no text</td>
      <td><Button icon={<OkIcon />} /></td>
      <td><Button icon={<OkIcon />} size='medium' /></td>
      <td><Button icon={<OkIcon />} size='large' /></td>
    </tr>
    <tr>
      <td>Icon as children</td>
      <td><Button>{<OkIcon />}Button</Button></td>
      <td><Button size='medium' >{<OkIcon />}Button</Button></td>
      <td><Button size='large' >{<OkIcon />}Button</Button></td>
    </tr>
    <tr>
      <td>Different use</td>
      <td><Button icon={<OkIcon />} use='danger'>Button</Button></td>
      <td><Button icon={<OkIcon />} use='primary' size='medium'>Button</Button></td>
      <td><Button icon={<OkIcon />} use='success' size='large'>Button</Button></td>
    </tr>
    <tr>
      <td>Link</td>
      <td><Button icon={<OkIcon />} use='link'>Button</Button></td>
      <td><Button icon={<ArchivePack />} use='link' size='medium'>Button</Button></td>
      <td><Button icon={<ArchivePack />} use='link' size='large'>Button</Button></td>
    </tr>
    <tr>
      <td>Long text</td>
      <td><Button icon={<OkIcon />} width="200px">With icon, fixed width and long-lon-long text</Button></td>
    </tr>
  </table>
);
IconStates.storyName = 'Icon states table';

// Disabled - active - checked (hover)- focused - loading
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
  { visuallyFocused: true },
  { loading: true },
  { active: true, checked: true },
  { active: true, visuallyFocused: true },
  { active: true, loading: true },
  { checked: true, visuallyFocused: true },
  { checked: true, loading: true },
  { visuallyFocused: true, loading: true }
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

//Different logic states
// warning - error - focused - disabled - checked  - loading
export const differentPrioritizationStates = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={differentPriorityStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
differentPrioritizationStates.storyName = 'Different prioritization states';

const differentPriorityStates: ButtonState[] = [
  { warning: true, error: true },
  { warning: true, visuallyFocused: true },
  { warning: true, disabled: true },
  { warning: true, checked: true },
  { warning: true, loading: true },
  { error: true, visuallyFocused: true },
  { error: true, disabled: true },
  { error: true, checked: true },
  { error: true, loading: true },
  { visuallyFocused: true, disabled: true },
  { visuallyFocused: true, checked: true },
  { visuallyFocused: true, loading: true },
  { disabled: true, checked: true },
  { disabled: true, loading: true },
  { warning: true, error: true, visuallyFocused: true },
  { warning: true, error: true, disabled: true },
  { warning: true, error: true, checked: true },
  { warning: true, error: true, loading: true },
  { warning: true, visuallyFocused: true, disabled: true },
  { warning: true, visuallyFocused: true, checked: true },
  { warning: true, visuallyFocused: true, loading: true },
  { warning: true, disabled: true, checked: true },
  { warning: true, disabled: true, loading: true },
  { warning: true, checked: true, loading: true },
  { error: true, visuallyFocused: true, disabled: true },
  { error: true, visuallyFocused: true, checked: true },
  { error: true, visuallyFocused: true, loading: true },
  { visuallyFocused: true, disabled: true, checked: true },
  { visuallyFocused: true, disabled: true, loading: true },
  { disabled: true, checked: true, loading: true },
]
