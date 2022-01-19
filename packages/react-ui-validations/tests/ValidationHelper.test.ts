import { Nullable } from '../typings/Types';
import { Validation, ValidationBehaviour } from '../src';
import { getVisibleValidation } from '../src/ValidationHelper';

describe('ValidationHelper', () => {
  describe('getVisibleValidation', () => {
    const visible: Record<ValidationBehaviour, Validation> = {
      immediate: { behaviour: 'immediate', message: 'visible', level: 'error', independent: false },
      lostfocus: { behaviour: 'lostfocus', message: 'visible', level: 'error', independent: false },
      submit: { behaviour: 'submit', message: 'visible', level: 'error', independent: false },
    };

    const actual: Record<ValidationBehaviour, Validation> = {
      immediate: { behaviour: 'immediate', message: 'actual', level: 'error', independent: false },
      lostfocus: { behaviour: 'lostfocus', message: 'actual', level: 'error', independent: false },
      submit: { behaviour: 'submit', message: 'actual', level: 'error', independent: false },
    };

    interface Combination {
      visible: Nullable<Validation>;
      actual: Nullable<Validation>;
      expectedWhenChanging: Nullable<Validation>;
      expectedWhenNotChanging: Nullable<Validation>;
    }

    const combinations: Combination[] = [
      {
        visible: null,
        actual: null,
        expectedWhenChanging: null,
        expectedWhenNotChanging: null,
      },
      {
        visible: null,
        actual: actual.immediate,
        expectedWhenChanging: actual.immediate,
        expectedWhenNotChanging: actual.immediate,
      },
      {
        visible: null,
        actual: actual.lostfocus,
        expectedWhenChanging: null,
        expectedWhenNotChanging: null,
      },
      {
        visible: null,
        actual: actual.submit,
        expectedWhenChanging: null,
        expectedWhenNotChanging: null,
      },

      {
        visible: visible.immediate,
        actual: null,
        expectedWhenChanging: null,
        expectedWhenNotChanging: null,
      },
      {
        visible: visible.immediate,
        actual: actual.immediate,
        expectedWhenChanging: actual.immediate,
        expectedWhenNotChanging: actual.immediate,
      },
      {
        visible: visible.immediate,
        actual: actual.lostfocus,
        expectedWhenChanging: null,
        expectedWhenNotChanging: actual.lostfocus,
      },
      {
        visible: visible.immediate,
        actual: actual.submit,
        expectedWhenChanging: null,
        expectedWhenNotChanging: null,
      },

      {
        visible: visible.lostfocus,
        actual: null,
        expectedWhenChanging: visible.lostfocus,
        expectedWhenNotChanging: null,
      },
      {
        visible: visible.lostfocus,
        actual: actual.immediate,
        expectedWhenChanging: actual.immediate,
        expectedWhenNotChanging: actual.immediate,
      },
      {
        visible: visible.lostfocus,
        actual: actual.lostfocus,
        expectedWhenChanging: visible.lostfocus,
        expectedWhenNotChanging: actual.lostfocus,
      },
      {
        visible: visible.lostfocus,
        actual: actual.submit,
        expectedWhenChanging: visible.lostfocus,
        expectedWhenNotChanging: null,
      },

      {
        visible: visible.submit,
        actual: null,
        expectedWhenChanging: visible.submit,
        expectedWhenNotChanging: null,
      },
      {
        visible: visible.submit,
        actual: actual.immediate,
        expectedWhenChanging: actual.immediate,
        expectedWhenNotChanging: actual.immediate,
      },
      {
        visible: visible.submit,
        actual: actual.lostfocus,
        expectedWhenChanging: visible.submit,
        expectedWhenNotChanging: actual.lostfocus,
      },
      {
        visible: visible.submit,
        actual: actual.submit,
        expectedWhenChanging: visible.submit,
        expectedWhenNotChanging: visible.submit,
      },
    ];

    const getType = (v: Nullable<Validation>): string => {
      return v ? v.behaviour : 'none';
    };

    for (const combination of combinations) {
      const v = combination.visible;
      const a = combination.actual;
      it(`from('${getType(v)}') -> to('${getType(a)}') when Changing`, () => {
        expect(getVisibleValidation(v, a, true)).toBe(combination.expectedWhenChanging);
      });
      it(`from('${getType(v)}') -> to('${getType(a)}') when NotChanging`, () => {
        expect(getVisibleValidation(v, a, false)).toBe(combination.expectedWhenNotChanging);
      });
    }
  });
});
