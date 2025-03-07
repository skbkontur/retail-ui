import { getStateForValue } from '../helpers/getStateForValue';

describe('DateRangePicker value pick', () => {
  it(`should set value to 1st field and set focus to 2nd`, () => {
    expect(
      getStateForValue('start', '10.10.2000', {
        currentStart: '',
        currentEnd: '',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '',
      focus: 'end',
      isOpen: true,
    });
  });

  it(`should set value to 2nd field, save save focus in 2nd and close picker`, () => {
    expect(
      getStateForValue('end', '20.10.2025', {
        currentStart: '10.10.2000',
        currentEnd: '',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '20.10.2025',
      focus: 'end',
      isOpen: false,
    });
  });

  it(`should update 2nd field, save focus in 2nd and close picker`, () => {
    expect(
      getStateForValue('end', '15.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '20.10.2000',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '15.10.2000',
      focus: 'end',
      isOpen: false,
    });
  });

  it(`should set value to 1st field, reset value in 2nd, focus in 2nd`, () => {
    expect(
      getStateForValue('start', '15.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '10.10.2000',
      }),
    ).toEqual({
      start: '15.10.2000',
      end: '',
      focus: 'end',
      isOpen: true,
    });
  });

  it(`should move value from 2nd to 1st field, reset value in 2nd, focus in 2nd`, () => {
    expect(
      getStateForValue('end', '01.10.2000', {
        currentStart: '15.10.2000',
        currentEnd: '',
      }),
    ).toEqual({
      start: '01.10.2000',
      end: '',
      focus: 'end',
      isOpen: true,
    });
  });

  it(`should save state if 1st value < minDate`, () => {
    expect(
      getStateForValue('start', '01.10.2000', {
        currentStart: '20.10.2010',
        currentEnd: '05.10.2020',
        minDate: '10.10.2010',
      }),
    ).toEqual({
      start: '20.10.2010',
      end: '05.10.2020',
      focus: 'start',
      isOpen: true,
    });
  });

  it(`should save state if 2nd value > maxDate`, () => {
    expect(
      getStateForValue('end', '10.10.2030', {
        currentStart: '20.10.2010',
        currentEnd: '05.10.2020',
        maxDate: '10.10.2020',
      }),
    ).toEqual({
      start: '20.10.2010',
      end: '05.10.2020',
      focus: 'end',
      isOpen: true,
    });
  });
});

describe('select dates when start equals end', () => {
  it(`should set equal value to 1st field, save focus in 1st and close picker`, () => {
    expect(
      getStateForValue('start', '10.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '10.10.2000',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '10.10.2000',
      focus: 'start',
      isOpen: false,
    });
  });

  it(`should set equal value to 2nd field, save focus in 2nd and close picker`, () => {
    expect(
      getStateForValue('end', '10.10.2025', {
        currentStart: '10.10.2000',
        currentEnd: '',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '10.10.2025',
      focus: 'end',
      isOpen: false,
    });
  });

  it(`should set equal value to filled 2nd field, save focus in 2nd and close picker`, () => {
    expect(
      getStateForValue('end', '10.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '15.10.2000',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '10.10.2000',
      focus: 'end',
      isOpen: false,
    });
  });
});

describe('select date equals to current field', () => {
  it(`should save equal value in 1st field, save focus in 1st and close picker`, () => {
    expect(
      getStateForValue('start', '10.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '15.10.2000',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '15.10.2000',
      focus: 'start',
      isOpen: false,
    });
  });

  it(`should save equal value in 2nd field, save focus in 2nd and close picker`, () => {
    expect(
      getStateForValue('end', '15.10.2000', {
        currentStart: '10.10.2000',
        currentEnd: '15.10.2000',
      }),
    ).toEqual({
      start: '10.10.2000',
      end: '15.10.2000',
      focus: 'end',
      isOpen: false,
    });
  });
});
