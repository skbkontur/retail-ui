import React from 'react';
import { Button } from '../Button';


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

// 1	Default	True	  True
export const ButtonDefaultActiveChecked = () => {
  return <Button active checked>Hello</Button>
}

//2	Default	True	  False
export const ButtonDefaultActiveNotChecked = () => {
  return <Button active>Hello</Button>
}

// 3	Default	False	  True
export const ButtonDefaultNotActiveChecked = () => {
  return <Button checked>Hello</Button>
}

// 4	Default	False 	False
export const ButtonDefaultNotActiveNotChecked = () => {
  return <Button>Hello</Button>
}

// 5	Primary	True	  True
export const ButtonPrimaryActiveChecked = () => {
  return <Button use='primary' active checked>Hello</Button>
}

// 6	Primary	True	  False
export const ButtonPrimaryActiveNotChecked = () => {
  return <Button use='primary' active>Hello</Button>
}

// 7	Primary	False	  True
export const ButtonPrimaryNotActiveChecked = () => {
  return <Button use='primary' checked>Hello</Button>
}

// 8	Primary	False 	False
export const ButtonPrimaryNotActiveNotChecked = () => {
  return <Button use='primary'>Hello</Button>
}

// 9	Success	True	  True
export const ButtonSuccessActiveChecked = () => {
  return <Button use='success' active checked>Hello</Button>
}

// 10	Success	True	  False
export const ButtonSuccessActiveNotChecked = () => {
  return <Button use='success' active>Hello</Button>
}

// 11	Success	False	  True
export const ButtonSuccessNotActiveChecked = () => {
  return <Button use='success' checked>Hello</Button>
}

// 12	Success	False 	False
export const ButtonSuccessNotActiveNotChecked = () => {
  return <Button use='success'>Hello</Button>
}

// 13	Danger	True	  True
export const ButtonDangerActiveChecked = () => {
  return <Button use='danger' active checked>Hello</Button>
}

// 14	Danger	True	  False
export const ButtonDangerActiveNotChecked = () => {
  return <Button use='danger' active>Hello</Button>
}

// 15	Danger	False	  True
export const ButtonDangerNotActiveChecked = () => {
  return <Button use='danger' checked>Hello</Button>
}

// 16	Danger	False 	False
export const ButtonDangerNotActiveNotChecked = () => {
  return <Button use='danger'>Hello</Button>
}
// 17	Pay	    True	  True
export const ButtonPayActiveChecked = () => {
  return <Button use='pay' active checked>Hello</Button>
}
// 18	Pay	    True	  False
export const ButtonPayActiveNotChecked = () => {
  return <Button use='pay' active>Hello</Button>
}
// 19	Pay	    False	  True
export const ButtonPayNotActiveChecked = () => {
  return <Button use='pay' checked>Hello</Button>
}
// 20	Pay	    False 	False
export const ButtonPayNotActiveNotChecked = () => {
  return <Button use='pay'>Hello</Button>
}
// 21	Link	  True	  True
export const ButtonLinkActiveChecked = () => {
  return <Button use='link' active checked>Hello</Button>
}
// 22	Link	  True	  False
export const ButtonLinkActiveNotChecked = () => {
  return <Button use='link' active>Hello</Button>
}
// 23	Link	  False	  True
export const ButtonLinkNotActiveChecked = () => {
  return <Button use='link' checked>Hello</Button>
}
// 24	Link	  False 	False
export const ButtonLinkNotActiveNotChecked = () => {
  return <Button use='link' active checked>Hello</Button>
}

// export const CheckedCombinations: Story = () => (
//   <ComponentCombinator
//     Component={Button}
//     presetProps={{ children: 'Button', checked: true }}
//     combinations={[useStates, activeStates, checkedStates]}
//   />
// );
// CheckedCombinations.storyName = 'checked combinations';


// ButtonDefaultActiveChecked.story = {
//   parameters: {
//     creevy: {
//       // tests: {
//       //   async idle(this: {}) {
//       //     const element = await this.browser
//       //   },
//       // }
//     }
//   }
// }
