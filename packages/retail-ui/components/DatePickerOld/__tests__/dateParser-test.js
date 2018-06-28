import dateParser from '../dateParser';

describe('DateParser', () => {
  it('should return Date object on valid string', () => {
    const str = '11.10.2015';
    expect(dateParser(str) instanceof Date).toBeTruthy();
  });

  it('should return valid Date object on valid string', () => {
    const str = '11.10.2015';
    const parsedDate = dateParser(str);
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(11);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(2015);
  });

  it('should parse 8-digit string', () => {
    const str = '11102015';
    const parsedDate = dateParser(str);
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(11);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(2015);
  });

  it('should parse 1-digit string', () => {
    const str = '1';
    const parsedDate = dateParser(str);
    const now = new Date();
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(1);
    expect(parsedDate.getMonth()).toBe(now.getMonth());
    expect(parsedDate.getFullYear()).toBe(now.getFullYear());
  });

  it('should parse 2-digit string', () => {
    const str = '12';
    const parsedDate = dateParser(str);
    const now = new Date();
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(12);
    expect(parsedDate.getMonth()).toBe(now.getMonth());
    expect(parsedDate.getFullYear()).toBe(now.getFullYear());
  });

  it('should not parse 2-digit string if it is impossible day', () => {
    const str = '32';
    const parsedDate = dateParser(str);
    expect(parsedDate).toBe(null);
  });

  it('should parse 3-digit string', () => {
    const str = '129';
    const parsedDate = dateParser(str);
    const now = new Date();
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(12);
    expect(parsedDate.getMonth()).toBe(8);
    expect(parsedDate.getFullYear()).toBe(now.getFullYear());
  });

  it('should not parse 3-digit string with impossible day or month', () => {
    const str = '120';
    const parsedDate = dateParser(str);
    expect(parsedDate).toBe(null);
  });

  it('should parse 4-digit string ', () => {
    const str = '1110';
    const parsedDate = dateParser(str);
    const now = new Date();
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(11);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(now.getFullYear());
  });

  it('should not parse 4-digit string with impossible day', () => {
    const str = '3310';
    const parsedDate = dateParser(str);
    expect(parsedDate).toBe(null);
  });

  it('should parse 5-digit string', () => {
    const str = '02105';
    const parsedDate = dateParser(str);
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(2);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(2005);
  });

  it('should parse 6-digit string', () => {
    const str = '021052';
    const parsedDate = dateParser(str);
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(2);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(1952);
  });

  it('should parse 8-digit string', () => {
    const str = '02101952';
    const parsedDate = dateParser(str);
    if (!parsedDate) {
      throw Error('Null result');
    }
    expect(parsedDate.getDate()).toBe(2);
    expect(parsedDate.getMonth()).toBe(9);
    expect(parsedDate.getFullYear()).toBe(1952);
  });

  it('should not parse ', () => {
    const str = '10.20.1202';
    const parsedDate = dateParser(str);
    expect(parsedDate).toBe(null);
  });
});
