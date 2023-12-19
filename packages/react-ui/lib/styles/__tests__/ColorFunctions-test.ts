import * as ColorFunctions from '../ColorFunctions';

const validWaysToWriteRGB = [
  'rgb(0, 255, 255)',
  'rgb(0, 255, 255, 1)',
  'rgb(0, 255, 255, 100%)',
  'rgb(0%, 100%, 100%)',
  'rgb(0%, 100%, 100%, 1)',
  'rgb(0%, 100%, 100%, 100%)',
  'rgb(0 255 255)',
  'rgb(0 255 255 / 1)',
  'rgb(0 255 255 / 100%)',
  'rgb(0% 100% 100%)',
  'rgb(0% 100% 100% / 1)',
  'rgb(0% 100% 100% / 100%)',
  'rgba(0, 255, 255)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 255, 255, 100%)',
  'rgba(0%, 100%, 100%)',
  'rgba(0%, 100%, 100%, 1)',
  'rgba(0%, 100%, 100%, 100%)',
  'rgba(0 255 255)',
  'rgba(0 255 255 / 1)',
  'rgba(0 255 255 / 100%)',
  'rgba(0% 100% 100%)',
  'rgba(0% 100% 100% / 1)',
  'rgba(0% 100% 100% / 100%)',
];

const invalidWaysToWriteRGB = [
  'rgb(ff, 100, 150, 0.2)', // r
  'rgb(50, ff, 150, 0.2)', // g
  'rgb(50, 100, ff, 0.2)', // b
  'rgb(50, 100, 150, ff)', // a
  'rgba(ff, 100, 150, 20%)', // r
  'rgba(50, ff, 150, 20%)', // g
  'rgba(50, 100, ff, 20%)', // b
  'rgba(50, 100, 150, 20)', // a
];

const validWaysToWriteHSL = [
  'hsl(180, 100%, 50%)',
  'hsl(180, 100%, 50%, 1)',
  'hsl(180, 100%, 50%, 100%)',
  'hsl(180deg, 100%, 50%)',
  'hsl(180deg, 100%, 50%, 1)',
  'hsl(180deg, 100%, 50%, 100%)',
  'hsl(180 100% 50%)',
  'hsl(180 100% 50% / 1)',
  'hsl(180 100% 50% / 100%)',
  'hsl(180deg 100% 50%)',
  'hsl(180deg 100% 50% / 1)',
  'hsl(180deg 100% 50% / 100%)',
  'hsla(180, 100%, 50%)',
  'hsla(180, 100%, 50%, 1)',
  'hsla(180, 100%, 50%, 100%)',
  'hsla(180deg, 100%, 50%)',
  'hsla(180deg, 100%, 50%, 1)',
  'hsla(180deg, 100%, 50%, 100%)',
  'hsla(180 100% 50%)',
  'hsla(180 100% 50% / 1)',
  'hsla(180 100% 50% / 100%)',
  'hsla(180deg 100% 50%)',
  'hsla(180deg 100% 50% / 1)',
  'hsla(180deg 100% 50% / 100%)',
];

const invalidWaysToWriteHSL = [
  'hsl(50%, 50%, 100%, 20%)', // h
  'hsl(50, 50, 100%, 20%)', // s
  'hsl(50, 50%, 100, 20%)', // l
  'hsl(50, 50%, 100%, ff)', // a
  'hsla(50%, 50%, 100%, 20%)', // h
  'hsla(50, 50, 100%, 20%)', // s
  'hsla(50, 50%, 100, 20%)', // l
  'hsla(50, 50%, 100%, ff)', // a
];

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
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', 0.2)).toBe('hsl(90, 80%, 70%)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', '20%')).toBe('hsl(90, 80%, 70%)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 33%)', 0.2)).toBe('hsla(90, 80%, 70%, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 0.33)', '20%')).toBe('hsla(90, 80%, 70%, 0.33)');
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
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', 0.2, 'relative')).toBe('hsl(90, 80%, 60%)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.lighten('hsl(90, 80%, 50%)', '20%', 'relative')).toBe('hsl(90, 80%, 60%)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 33%)', 0.2, 'relative')).toBe('hsla(90, 80%, 60%, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.lighten('hsla(90, 80%, 50%, 0.33)', '20%', 'relative')).toBe('hsla(90, 80%, 60%, 0.33)');
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
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', 0.2)).toBe('hsl(90, 80%, 30%)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', '20%')).toBe('hsl(90, 80%, 30%)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 33%)', 0.2)).toBe('hsla(90, 80%, 30%, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 0.33)', '20%')).toBe('hsla(90, 80%, 30%, 0.33)');
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
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', 0.2, 'relative')).toBe('hsl(90, 80%, 40%)');
    });
    test('from hsl %', () => {
      expect(ColorFunctions.darken('hsl(90, 80%, 50%)', '20%', 'relative')).toBe('hsl(90, 80%, 40%)');
    });

    test('from hsla number', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 33%)', 0.2, 'relative')).toBe('hsla(90, 80%, 40%, 0.33)');
    });
    test('from hsla %', () => {
      expect(ColorFunctions.darken('hsla(90, 80%, 50%, 0.33)', '20%', 'relative')).toBe('hsla(90, 80%, 40%, 0.33)');
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
        expect(ColorFunctions.contrast('#ffd6d6')).toBe('#333333');
      });
      test('custom', () => {
        expect(ColorFunctions.contrast('#ffd6d6', '#222')).toBe('#222222');
      });
    });
  });
  describe('isValid', () => {
    describe('hex', () => {
      describe('3 digits', () => {
        test('detects valid', () => {
          expect(ColorFunctions.isValid('#34f')).toBe(true);
        });
        test('detects invalid', () => {
          expect(ColorFunctions.isValid('#cg3')).toBe(false);
        });
      });
      describe('6 digits', () => {
        test('detects valid', () => {
          expect(ColorFunctions.isValid('#33aa9e')).toBe(true);
        });
        test('detects invalid', () => {
          expect(ColorFunctions.isValid('#d70cv7')).toBe(false);
        });
      });
    });
    describe('rgb(a)', () => {
      test.each(invalidWaysToWriteRGB)('cannot process %s', (rgb) => {
        expect(ColorFunctions.isValid(rgb)).toBe(false);
      });
      test.each(validWaysToWriteRGB)('can process %s', (rgb) => {
        expect(ColorFunctions.isValid(rgb)).toBe(true);
      });
    });
    describe('hsl(a)', () => {
      test.each(invalidWaysToWriteHSL)('cannot process %s', (rgb) => {
        expect(ColorFunctions.isValid(rgb)).toBe(false);
      });
      test.each(validWaysToWriteHSL)('can process %s', (rgb) => {
        expect(ColorFunctions.isValid(rgb)).toBe(true);
      });

      test('alpha value can be higher than 1 in hsl', () => {
        expect(ColorFunctions.isValid('hsl(50, 50%, 100%, 20)')).toBe(true);
      });
      test('alpha value can be higher than 1 in hsla', () => {
        expect(ColorFunctions.isValid('hsla(50, 50%, 100%, 20)')).toBe(true);
      });
    });
  });

  describe('fade', () => {
    test('from hex', () => {
      expect(ColorFunctions.fade('#80e619', 0.2)).toBe('rgba(128, 230, 25, 0.2)');
    });
    test('from rgb', () => {
      expect(ColorFunctions.fade('rgb(122, 122, 122)', 0.2)).toBe('rgba(122, 122, 122, 0.2)');
    });
    test('from rgba', () => {
      expect(ColorFunctions.fade('rgba(122, 122, 122, 0.5)', 0.2)).toBe('rgba(122, 122, 122, 0.2)');
    });
    test('from hsl', () => {
      expect(ColorFunctions.fade('hsl(30, 20%, 10%)', 0.2)).toBe('hsla(33, 22%, 10%, 0.2)');
    });
    test('from hsla', () => {
      expect(ColorFunctions.fade('hsla(30, 20%, 10%, 0.5)', 0.2)).toBe('hsla(33, 22%, 10%, 0.2)');
    });
    test('from transparent', () => {
      expect(ColorFunctions.fade('transparent', 0.2)).toBe('transparent');
    });
  });
});
