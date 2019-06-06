import { getDistTag, TAGS } from '../index';

describe('package', () => {
  describe('distTag', () => {
    const { LATEST, UNSTABLE, OLD, LTS } = TAGS;
    it.each([
      // invalid
      ['!valid(v)', 'invalid', 'any', false, null],

      // valid, no git tag
      ['no git tag', '1.0.0', 'any', false, UNSTABLE],

      // valid, git tag, master branch
      ['v > npm@latest, master, git tag', '1.0.0', 'master', true, LATEST],
      ['v = npm@latest, master, git tag', '0.3.2', 'master', true, LATEST],
      ['v < npm@latest, master, git tag', '0.3.1', 'master', true, null],

      // valid, git tag, lts branch
      ['v > npm@lts && diff == patch, lts, git tag', '0.1.2', 'lts', true, LTS],
      ['v > npm@lts && diff != patch, lts, git tag', '0.2.0', 'lts', true, null],
      ['v = npm@lts, lts, git tag', '0.1.1', 'lts', true, LTS],
      ['v < npm@lts, lts, git tag', '0.1.0', 'lts', true, null],

      // valid, git tag, any other branch
      ['!master && !lts, git tag', '10.0.0', 'v10.0.x', ['retail-ui@10.0.0'], OLD],
    ])('%s', (label, version, gitBranch, isGitTagExists, result) => {
      const npmTags = {
        latest: '0.3.2',
        lts: '0.1.1',
      };
      expect(getDistTag(version, npmTags, gitBranch, isGitTagExists)).toBe(result);
    });

    it('!valid(npm@latest)', () => {
      expect(getDistTag('0.0.0', {}, 'master', true)).toBe(null);
    });

    it('!valid(npm@lts)', () => {
      expect(getDistTag('0.0.0', {}, 'lts', true)).toBe(null);
    });
  });
});
