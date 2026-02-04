import { describe, test, expect } from 'vitest';
import { getPromo } from '../lib/helpers/get-promo';

describe('getPromo', () => {
  test('should transform color to promo', () => {
    const red = getPromo('#FE4C4C');
    expect(red).toBe('oklch(36% 0.11 353.1)');

    const orange = getPromo('#FC7630');
    expect(orange).toBe('oklch(34.5% 0.11 9.7)');

    const green = getPromo('#26AD50');
    expect(green).toBe('oklch(34.7% 0.06 188.6)');

    const mint = getPromo('#00BEA2');
    expect(mint).toBe('oklch(34.7% 0.068 228)');

    const blue = getPromo('#2291FF');
    expect(blue).toBe('oklch(34.5% 0.13 264.2)');

    const blueDeep = getPromo('#366AF3');
    expect(blueDeep).toBe('oklch(32.1% 0.128 278.7)');

    const violet = getPromo('#844BEC');
    expect(violet).toBe('oklch(34.8% 0.125 294.2)');

    const purple = getPromo('#B750D1');
    expect(purple).toBe('oklch(36.5% 0.13 295)');

    const yellow = getPromo('#FAB800');
    expect(yellow).toBe('oklch(45.2% 0.11 47.4)');
  });
});
