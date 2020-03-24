import * as ColorFunctions from '../ColorFunctions';

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
        expect(ColorFunctions.contrast('#ffd6d6')).toBe('#000000');
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
    describe('rgb', () => {
      test('detects valid', () => {
        expect(ColorFunctions.isValid('rgb(50, 100, 150)')).toBe(true);
      });
      test('detects invalid params count', () => {
        expect(ColorFunctions.isValid('rgb(50, 100, 150, 0.2)')).toBe(false);
      });
      test('detects invalid r value', () => {
        expect(ColorFunctions.isValid('rgb(ff, 100, 150)')).toBe(false);
      });
      test('detects invalid g value', () => {
        expect(ColorFunctions.isValid('rgb(50, ff, 150)')).toBe(false);
      });
      test('detects invalid b value', () => {
        expect(ColorFunctions.isValid('rgb(50, 100, ff)')).toBe(false);
      });
    });
    describe('rgba', () => {
      test('detects valid', () => {
        expect(ColorFunctions.isValid('rgba(50, 100, 150, 0.2)')).toBe(true);
      });
      test('detects invalid params count', () => {
        expect(ColorFunctions.isValid('rgba(50, 100, 150)')).toBe(false);
      });
      test('detects invalid r value', () => {
        expect(ColorFunctions.isValid('rgba(ff, 100, 150, 20%)')).toBe(false);
      });
      test('detects invalid g value', () => {
        expect(ColorFunctions.isValid('rgba(50, ff, 150, 20%)')).toBe(false);
      });
      test('detects invalid b value', () => {
        expect(ColorFunctions.isValid('rgba(50, 100, ff, 20%)')).toBe(false);
      });
      test('detects invalid a value', () => {
        expect(ColorFunctions.isValid('rgba(50, 100, 150, 20)')).toBe(false);
      });
    });
    describe('hsl', () => {
      test('detects valid', () => {
        expect(ColorFunctions.isValid('hsl(50, 50%, 100%)')).toBe(true);
      });
      test('detects invalid params count', () => {
        expect(ColorFunctions.isValid('hsl(50, 50%, 100%, 20%)')).toBe(false);
      });
      test('detects invalid h value', () => {
        expect(ColorFunctions.isValid('hsl(50%, 50%, 100%)')).toBe(false);
      });
      test('detects invalid s value', () => {
        expect(ColorFunctions.isValid('hsl(50, 50, 100%)')).toBe(false);
      });
      test('detects invalid l value', () => {
        expect(ColorFunctions.isValid('hsl(50, 50%, 100)')).toBe(false);
      });
    });
    describe('hsla', () => {
      test('detects valid', () => {
        expect(ColorFunctions.isValid('hsla(50, 50%, 100%, 0.2)')).toBe(true);
      });
      test('detects invalid params count', () => {
        expect(ColorFunctions.isValid('hsla(50, 50%, 100%)')).toBe(false);
      });
      test('detects invalid h value', () => {
        expect(ColorFunctions.isValid('hsla(50%, 50%, 100%, 20%)')).toBe(false);
      });
      test('detects invalid s value', () => {
        expect(ColorFunctions.isValid('hsla(50, 50, 100%, 20%)')).toBe(false);
      });
      test('detects invalid l value', () => {
        expect(ColorFunctions.isValid('hsla(50, 50%, 100, 20%)')).toBe(false);
      });
      test('detects invalid a value', () => {
        expect(ColorFunctions.isValid('hsla(50, 50%, 100%, 20)')).toBe(false);
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
