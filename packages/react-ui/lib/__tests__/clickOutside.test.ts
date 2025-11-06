import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { clickOutside } from '../utils';

describe('clickOutside integration tests', () => {
  let onClickOutside: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onClickOutside = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should trigger onClickOutside when clickOutside is called', async () => {
    const handleNativeDocClick = (event: Event) => {
      onClickOutside(event);
    };

    document.addEventListener('mousedown', handleNativeDocClick);

    clickOutside('mousedown');

    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(onClickOutside).toHaveBeenCalledTimes(1);

    document.removeEventListener('mousedown', handleNativeDocClick);
  });
});
