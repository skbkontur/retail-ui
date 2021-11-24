import { definePublicProperties } from '../withClassWrapper';

const properties = {
  number: 1,
  string: 'value',
  alwaysFalsy: () => false,
};

const indexableProperties = [...Object.entries(properties)];

class TestClass {
  [p: string]: any;

  constructor() {
    definePublicProperties(this, indexableProperties);
  }
}

describe('definePublicProperties', () => {
  it('adds properties defined in function call to the class instance', () => {
    const instance = new TestClass();

    for (let property of indexableProperties) {
      const [key, _] = property;
      expect(instance.hasOwnProperty(key)).toBe(true);
    }
  });

  it('returns correct values from properties defined in function call', () => {
    const instance = new TestClass();

    for (let property of indexableProperties) {
      const [key, value] = property;
      expect(instance[key]).toBe(value);
    }
  });
});
