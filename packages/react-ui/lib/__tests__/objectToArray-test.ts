import { addTestKeyToObjectsInArray } from '../testUtils';
import { objectToArray } from '../utils';

const testSuites = addTestKeyToObjectsInArray(
  [
    {
      object: { a: 1, b: 2 },
      expected: [
        ['a', 1],
        ['b', 2],
      ],
      type: '{ string, number }',
    },
    {
      object: { name: 'Vasya', gender: 'undefined' },
      expected: [
        ['name', 'Vasya'],
        ['gender', 'undefined'],
      ],
      type: '{ string, string }',
    },
    {
      object: { 1: 'first', 2: 'second' },
      expected: [
        ['1', 'first'],
        ['2', 'second'],
      ],
      type: '{ number, string }',
    },
    {
      object: { 1: 5, 2: 10 },
      expected: [
        ['1', 5],
        ['2', 10],
      ],
      type: '{ number, number }',
    },
  ],
  'type',
);

describe('objectToArray', () => {
  it.each(testSuites)('converts object of type %s into an array', ({ object, expected }) => {
    expect(objectToArray(object)).toEqual(expected);
  });
});
