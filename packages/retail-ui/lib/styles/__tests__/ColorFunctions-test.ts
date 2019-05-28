import ColorFunctions from '../ColorFunctions';

describe('ColorFunctions', () => {
  test('returns empty string for unexpected input', () => {
    expect(ColorFunctions.lighten(null as any, '10%')).toBe('');
    expect(ColorFunctions.darken(null as any, '10%')).toBe('');
  });

  describe('extracts red', () => {
    test('from keyword', () => {
      expect(ColorFunctions.red('crimson')).toBe(220);
    });
    test('from hex', () => {
      expect(ColorFunctions.red('#dc143c')).toBe(220);
    });
    test('from rgb', () => {
      expect(ColorFunctions.red('rgb(220, 20, 60)')).toBe(220);
    });
    test('from hsl', () => {
      expect(ColorFunctions.red('hsl(348, 83%, 47%)')).toBe(219);
    });
  });

  describe('extracts green', () => {
    test('from keyword', () => {
      expect(ColorFunctions.green('crimson')).toBe(20);
    });
    test('from hex', () => {
      expect(ColorFunctions.green('#dc143c')).toBe(20);
    });
    test('from rgb', () => {
      expect(ColorFunctions.green('rgb(220, 20, 60)')).toBe(20);
    });
    test('from hsl', () => {
      expect(ColorFunctions.green('hsl(348, 83%, 47%)')).toBe(20);
    });
  });

  describe('extracts blue', () => {
    test('from keyword', () => {
      expect(ColorFunctions.blue('crimson')).toBe(60);
    });
    test('from hex', () => {
      expect(ColorFunctions.blue('#dc143c')).toBe(60);
    });
    test('from rgb', () => {
      expect(ColorFunctions.blue('rgb(220, 20, 60)')).toBe(60);
    });
    test('from hsl', () => {
      expect(ColorFunctions.blue('hsl(348, 83%, 47%)')).toBe(60);
    });
  });

  describe('extracts alpha', () => {
    test('from keyword', () => {
      expect(ColorFunctions.alpha('crimson')).toBe(1);
    });
    test('from hex', () => {
      expect(ColorFunctions.alpha('#dc143c')).toBe(1);
    });
    test('from rgb', () => {
      expect(ColorFunctions.alpha('rgb(220, 20, 60)')).toBe(1);
    });
    test('from hsl', () => {
      expect(ColorFunctions.alpha('hsl(348, 83%, 47%)')).toBe(1);
    });
    test('from rgba number', () => {
      expect(ColorFunctions.alpha('rgba(220, 20, 60, 0.2)')).toBe(0.2);
    });
    test('from rgba %', () => {
      expect(ColorFunctions.alpha('rgba(220, 20, 60, 20%)')).toBe(0.2);
    });
    test('from hsla number', () => {
      expect(ColorFunctions.alpha('hsla(348, 83%, 47%, 0.2)')).toBe(0.2);
    });
    test('from hsla %', () => {
      expect(ColorFunctions.alpha('hsla(348, 83%, 47%, 20%)')).toBe(0.2);
    });
  });

  describe('lightens absolute', () => {
    test('from hex number', () => {
      expect(ColorFunctions.lighten('#80e619', 0.2)).toBe('#b3f075');
    });
    test('from hex %', () => {
      expect(ColorFunctions.lighten('#80e619', '20%')).toBe('#b3f075');
    });

    test('from rgb number', () => {
      expect(ColorFunctions.lighten('rgb(128, 230, 25)', 0.2)).toBe('rgb(179, 240, 117)');
    });
    test('from rgb %', () => {
      expect(ColorFunctions.lighten('rgb(128, 230, 25)', '20%')).toBe('rgb(179, 240, 117)');
    });

    test('from rgba number', () => {
      expect(ColorFunctions.lighten('rgba(128, 230, 25, 33%)', 0.2)).toBe('rgba(179, 240, 117, 0.33)');
    });
    test('from rgba %', () => {
      expect(ColorFunctions.lighten('rgba(128, 230, 25, 0.33)', '20%')).toBe('rgba(179, 240, 117, 0.33)');
    });

    test('from hsl number', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', 0.2)).toBe('hsl(90, 0.8, 0.7)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', '20%')).toBe('hsl(90, 0.8, 0.7)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 33%)', 0.2)).toBe('hsla(90, 0.8, 0.7, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 0.33)', '20%')).toBe('hsla(90, 0.8, 0.7, 0.33)');
    });
  });

  describe('lightens relative', () => {
    test('from hex number', () => {
      expect(ColorFunctions.lighten('#80e619', 0.2, 'relative')).toBe('#99eb47');
    });
    test('from hex %', () => {
      expect(ColorFunctions.lighten('#80e619', '20%', 'relative')).toBe('#99eb47');
    });

    test('from rgb number', () => {
      expect(ColorFunctions.lighten('rgb(128, 230, 25)', 0.2, 'relative')).toBe('rgb(153, 235, 71)');
    });
    test('from rgb %', () => {
      expect(ColorFunctions.lighten('rgb(128, 230, 25)', '20%', 'relative')).toBe('rgb(153, 235, 71)');
    });

    test('from rgba number', () => {
      expect(ColorFunctions.lighten('rgba(128, 230, 25, 33%)', 0.2, 'relative')).toBe('rgba(153, 235, 71, 0.33)');
    });
    test('from rgba %', () => {
      expect(ColorFunctions.lighten('rgba(128, 230, 25, 0.33)', '20%', 'relative')).toBe('rgba(153, 235, 71, 0.33)');
    });

    test('from hsl number', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', 0.2, 'relative')).toBe('hsl(90, 0.8, 0.6)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', '20%', 'relative')).toBe('hsl(90, 0.8, 0.6)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 33%)', 0.2, 'relative')).toBe('hsla(90, 0.8, 0.6, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 0.33)', '20%', 'relative')).toBe('hsla(90, 0.8, 0.6, 0.33)');
    });
  });

  describe('darkens absolute', () => {
    test('from hex number', () => {
      expect(ColorFunctions.darken('#80e619', 0.2)).toBe('#4d8a0f');
    });
    test('from hex %', () => {
      expect(ColorFunctions.darken('#80e619', '20%')).toBe('#4d8a0f');
    });

    test('from rgb number', () => {
      expect(ColorFunctions.darken('rgb(128, 230, 25)', 0.2)).toBe('rgb(77, 138, 15)');
    });
    test('from rgb %', () => {
      expect(ColorFunctions.darken('rgb(128, 230, 25)', '20%')).toBe('rgb(77, 138, 15)');
    });

    test('from rgba number', () => {
      expect(ColorFunctions.darken('rgba(128, 230, 25, 33%)', 0.2)).toBe('rgba(77, 138, 15, 0.33)');
    });
    test('from rgba %', () => {
      expect(ColorFunctions.darken('rgba(128, 230, 25, 0.33)', '20%')).toBe('rgba(77, 138, 15, 0.33)');
    });

    test('from hsl number', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', 0.2)).toBe('hsl(90, 0.8, 0.3)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', '20%')).toBe('hsl(90, 0.8, 0.3)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 33%)', 0.2)).toBe('hsla(90, 0.8, 0.3, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 0.33)', '20%')).toBe('hsla(90, 0.8, 0.3, 0.33)');
    });
  });

  describe('darkens relative', () => {
    test('from hex number', () => {
      expect(ColorFunctions.darken('#80e619', 0.2, 'relative')).toBe('#66b814');
    });
    test('from hex %', () => {
      expect(ColorFunctions.darken('#80e619', '20%', 'relative')).toBe('#66b814');
    });

    test('from rgb number', () => {
      expect(ColorFunctions.darken('rgb(128, 230, 25)', 0.2, 'relative')).toBe('rgb(102, 184, 20)');
    });
    test('from rgb %', () => {
      expect(ColorFunctions.darken('rgb(128, 230, 25)', '20%', 'relative')).toBe('rgb(102, 184, 20)');
    });

    test('from rgba number', () => {
      expect(ColorFunctions.darken('rgba(128, 230, 25, 33%)', 0.2, 'relative')).toBe('rgba(102, 184, 20, 0.33)');
    });
    test('from rgba %', () => {
      expect(ColorFunctions.darken('rgba(128, 230, 25, 0.33)', '20%', 'relative')).toBe('rgba(102, 184, 20, 0.33)');
    });

    test('from hsl number', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', 0.2, 'relative')).toBe('hsl(90, 0.8, 0.4)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', '20%', 'relative')).toBe('hsl(90, 0.8, 0.4)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 33%)', 0.2, 'relative')).toBe('hsla(90, 0.8, 0.4, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 0.33)', '20%', 'relative')).toBe('hsla(90, 0.8, 0.4, 0.33)');
    });
  });

  describe('contrasts', () => {
    describe('to light', () => {
      test('default', () => {
        expect(ColorFunctions.contrast('#d70c17')).toBe('#ffffff');
      });
      test('custom', () => {
        expect(ColorFunctions.contrast('#d70c17', undefined, '#eee')).toBe('#eeeeee');
      });
    });

    describe('to dark', () => {
      test('default', () => {
        expect(ColorFunctions.contrast('#ffd6d6')).toBe('#000000');
      });
      test('custom', () => {
        expect(ColorFunctions.contrast('#ffd6d6', '#222')).toBe('#222222');
      });
    });
  });
});
