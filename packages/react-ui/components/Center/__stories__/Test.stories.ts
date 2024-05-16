import { Story } from '@storybook/react';

import { Test } from '../Test';

export default { title: 'Test', argTypes: {}, component: Test, parameters: { creevey: { skip: true } } };

// export const Simple = () => (
//   <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
//     <Test x={1000000}></Test>
//   </div>
// );
// Simple.storyName = 'simple';

export const Simple: Story = {
  args: {
    testProp: 1
  },
};
