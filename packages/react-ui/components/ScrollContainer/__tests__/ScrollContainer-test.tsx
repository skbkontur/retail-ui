// import { mount } from 'enzyme';
// import React from 'react';

// import { MenuItem } from '../../MenuItem';
// import { ScrollContainer } from '../ScrollContainer';
import { convertScrollbarXScrollState, convertScrollbarYScrollState } from '../ScrollContainer.helpers';

// describe('ScrollContainer', () => {
//   test('rendering with vertical scroll active', () => {
//     const wrapper = mount(
//       <ScrollContainer maxHeight={50}>
//         {new Array(50).fill('').map((i, index) => (
//           <MenuItem key={index}>{'test'}</MenuItem>
//         ))}
//       </ScrollContainer>,
//     );

//     expect(wrapper.find('[data-tid="ScrollContainer__ScrollBar-y"]')).toHaveLength(1);
//   });

//   test('rendering with horizontal scroll active', () => {
//     const wrapper = mount(
//       <ScrollContainer maxWidth={200}>
//         {new Array(50).fill('').map((i, index) => (
//           <div key={index} style={{ width: 350 }}>
//             {'test'}
//           </div>
//         ))}
//       </ScrollContainer>,
//     );

//     console.log(wrapper.find('[data-tid="ScrollContainer__ScrollBar-x"]').length);

//     expect(wrapper.find('[data-tid="ScrollContainer__ScrollBar-x"]')).toHaveLength(1);
//   });
// });

describe('convertScrollbarXScrollState', () => {
  test('begin position left', () => {
    expect(convertScrollbarXScrollState('begin')).toBe('left');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarXScrollState('middle')).toBe('scroll');
  });

  test('end position right', () => {
    expect(convertScrollbarXScrollState('end')).toBe('right');
  });
});

describe('convertScrollbarYScrollState', () => {
  test('begin position top', () => {
    expect(convertScrollbarYScrollState('begin')).toBe('top');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarYScrollState('middle')).toBe('scroll');
  });

  test('end position bottom', () => {
    expect(convertScrollbarYScrollState('end')).toBe('bottom');
  });
});
