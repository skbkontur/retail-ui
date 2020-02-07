import { getDistTag, TAGS } from '../index';

describe('package', () => {
  describe('distTag', () => {
    const { LATEST, UNSTABLE, OLD, LTS } = TAGS;
    it.each([
      // invalid
      ['!valid(v)', 'invalid', ['any'], [], null],

      // valid, no git tag
      ['no git tag', '1.0.0', ['any'], [], UNSTABLE],
      ['no git tag', '1.0.0', ['any'], ['@skbkontur/react-ui@any'], UNSTABLE],

      // valid, git tag, master branch
      ['v > npm@latest, master, git tag', '1.0.0', ['master'], ['@skbkontur/react-ui@1.0.0'], LATEST],
      ['v = npm@latest, master, git tag', '0.3.2', ['master'], ['@skbkontur/react-ui@0.3.2'], LATEST],
      ['v < npm@latest, master, git tag', '0.3.1', ['master'], ['@skbkontur/react-ui@0.3.1'], null],

      // valid, git tag, lts branch
      ['v > npm@lts && diff == patch, lts, git tag', '0.1.2', ['lts'], ['@skbkontur/react-ui@0.1.2'], LTS],
      ['v > npm@lts && diff != patch, lts, git tag', '0.2.0', ['lts'], ['@skbkontur/react-ui@0.2.0'], null],
      ['v = npm@lts, lts, git tag', '0.1.1', ['lts'], ['@skbkontur/react-ui@0.1.1'], LTS],
      ['v < npm@lts, lts, git tag', '0.1.0', ['lts'], ['@skbkontur/react-ui@0.1.0'], null],

      // valid, git tag, any other branch
      ['!master && !lts, git tag', '10.0.0', ['10.0.x'], ['@skbkontur/react-ui@10.0.0'], OLD],
    ])('%s', (label, version, revBranches, revTags, result) => {
      const npmTags = {
        latest: '0.3.2',
        lts: '0.1.1',
      };
      expect(getDistTag(version, npmTags, revBranches, revTags)).toBe(result);
    });

    it('!valid(npm@latest)', () => {
      expect(getDistTag('0.0.0', {}, ['master'], ['@skbkontur/react-ui@0.0.0'])).toBe(null);
    });

    it('!valid(npm@lts)', () => {
      expect(getDistTag('0.0.0', {}, ['lts'], ['@skbkontur/react-ui@0.0.0'])).toBe(null);
    });
  });
});
