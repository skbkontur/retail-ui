import { isDarkTheme, isThemeVersion } from '../../ThemeHelpers';
import { DARK_THEME } from '../DarkTheme';
import { LIGHT_THEME } from '../LightTheme';
import * as DarkThemeImports from '../DarkTheme';
import * as LightThemeImports from '../LightTheme';
import { Theme } from '../../Theme';

interface ThemeVersion {
  major: number;
  minor: number;
}

interface ThemeWithNameAndVersion {
  theme: Theme;
  name: string;
  version: ThemeVersion | null;
}

describe('themes', () => {
  const ALL_LIGHT_THEMES = getThemesFromImports(LightThemeImports);
  const ALL_DARK_THEMES = getThemesFromImports(DarkThemeImports);
  const ALL_THEMES = [...ALL_LIGHT_THEMES, ...ALL_DARK_THEMES];
  const THEMES_WITH_VERSIONS_IN_NAMES = ALL_THEMES.filter(
    ({ name }) => name !== 'LIGHT_THEME' && name !== 'DARK_THEME',
  );

  describe('versions', () => {
    test.each(ALL_THEMES)('$name has a version', ({ theme }) => {
      expect(isThemeVersion(theme, '0.0')).toBe(true);
    });

    test.each(THEMES_WITH_VERSIONS_IN_NAMES)('name of $name matches its version: $version', ({ theme, version }) => {
      expect(version).toBeTruthy();

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { major, minor } = version!;

      expect(isThemeVersion(theme, `${BigInt(major)}.${BigInt(minor)}`)).toBe(true);
      expect(isThemeVersion(theme, `${BigInt(major)}.${BigInt(minor + 1)}`)).toBe(false);
    });

    describe('latests', () => {
      const LATEST_LIGHT_THEME = getLatestTheme(ALL_LIGHT_THEMES);
      const LATEST_DARK_THEME = getLatestTheme(ALL_DARK_THEMES);

      test.each`
        defaultTheme   | defaultThemeName | latestTheme                 | latestThemeName
        ${LIGHT_THEME} | ${'LIGHT_THEME'} | ${LATEST_LIGHT_THEME.theme} | ${LATEST_LIGHT_THEME.name}
        ${DARK_THEME}  | ${'DARK_THEME'}  | ${LATEST_DARK_THEME.theme}  | ${LATEST_DARK_THEME.name}
      `('$defaultThemeName should be equal to the latest theme: $latestThemeName', ({ defaultTheme, latestTheme }) => {
        expect(latestTheme).toBeDefined();
        expect(defaultTheme).toBe(latestTheme);
      });
    });
  });

  describe('lightness and darkness', () => {
    test.each(ALL_LIGHT_THEMES)('$name should be light', ({ theme, name }) => {
      expect(isDarkTheme(theme)).toBe(false);
      expect(name).toMatch(/LIGHT_THEME/);
      expect(name).not.toMatch(/DARK_THEME/);
    });

    test.each(ALL_DARK_THEMES)('$name should be dark', ({ theme, name }) => {
      expect(isDarkTheme(theme)).toBe(true);
      expect(name).not.toMatch(/LIGHT_THEME/);
      expect(name).toMatch(/DARK_THEME/);
    });
  });

  describe('test utils', () => {
    describe('getVersionFromThemeName', () => {
      test.each`
        name                   | version
        ${'LIGHT_THEME'}       | ${null}
        ${'LIGHT_THEME_1'}     | ${null}
        ${'LIGHT_THEME_1_X'}   | ${null}
        ${'LIGHT_THEME_1_0'}   | ${{ major: 1, minor: 0 }}
        ${'LIGHT_THEME_1_0_0'} | ${{ major: 0, minor: 0 }}
        ${'LIGHT_THEME_10_10'} | ${{ major: 10, minor: 10 }}
        ${'LIGHT_THEME_00_00'} | ${{ major: 0, minor: 0 }}
      `('$name should result to $version', ({ name, version }) => {
        expect(getVersionFromThemeName(name)).toStrictEqual(version);
      });
    });

    describe('getThemesFromImports', () => {
      const mockTheme = {} as Theme;
      const mockThemesImports = {
        LIGHT_THEME: mockTheme,
        LIGHT_THEME_1_0: mockTheme,
        LIGHT_THEME_1_1: mockTheme,
        DARK_THEME: mockTheme,
        DARK_THEME_1_0: mockTheme,
        DARK_THEME_1_1: mockTheme,
      };

      test('should remove __esModule flag', () => {
        const THEMES = getThemesFromImports({
          ...mockThemesImports,
          //@ts-expect-error
          __esModule: true,
        });

        expect(THEMES.length).toBe(Object.entries(mockThemesImports).length);
        expect(THEMES.find(({ name }) => name === 'LIGHT_THEME')).toBeDefined();
        expect(THEMES.find(({ name }) => name === '__esModule')).not.toBeDefined();
      });

      test.each(Object.keys(mockThemesImports))('%s should present', (themeName) => {
        const THEMES = getThemesFromImports(mockThemesImports);
        expect(THEMES.find(({ name }) => name === themeName)).toBeDefined();
      });

      test.each(getThemesFromImports(mockThemesImports))('$name version should be $version', ({ name, version }) => {
        expect(version).toStrictEqual(getVersionFromThemeName(name));
      });
    });

    describe('getLatestTheme', () => {
      const mockTheme = {} as Theme;
      const mockLightThemesImports = {
        LIGHT_THEME_0_0: mockTheme,
        LIGHT_THEME_20_0: mockTheme,
        LIGHT_THEME: mockTheme,
        LIGHT_THEME_1_0: mockTheme,
        LIGHT_THEME_1_1: mockTheme,
        LIGHT_THEME_0_9: mockTheme,
      };
      const mockDarkThemesImports = {
        DARK_THEME_0_9: mockTheme,
        DARK_THEME_2_1: mockTheme,
        DARK_THEME_0_0: mockTheme,
        DARK_THEME_10_0: mockTheme,
        DARK_THEME_1_0: mockTheme,
        DARK_THEME: mockTheme,
      };

      const LIGHT_THEMES = getThemesFromImports(mockLightThemesImports);
      const DARK_THEMES = getThemesFromImports(mockDarkThemesImports);

      test.each`
        themes          | latestThemeName
        ${LIGHT_THEMES} | ${'LIGHT_THEME_20_0'}
        ${DARK_THEMES}  | ${'DARK_THEME_10_0'}
      `('the latest theme is $latestThemeName', ({ themes, latestThemeName }) => {
        const { name } = getLatestTheme(themes);
        expect(name).toBe(latestThemeName);
      });
    });
  });
});

function getVersionFromThemeName(name: string): ThemeVersion | null {
  const versionString = name.match(/\d+_\d+$/g);

  if (!versionString) {
    return null;
  }

  const [major, minor] = versionString[0].split('_').map(Number);

  return { major, minor };
}

function getThemesFromImports(themes: Record<string, Theme>): ThemeWithNameAndVersion[] {
  return Object.entries(themes)
    .filter(([key]) => key !== '__esModule')
    .map(([name, theme]) => ({ theme, name, version: getVersionFromThemeName(name) }));
}

function getLatestTheme(themes: ThemeWithNameAndVersion[]): ThemeWithNameAndVersion {
  let latestTheme = themes[0];

  for (const theme of themes) {
    const { version: themeVersion } = theme;
    const { version: latestThemeVersion } = latestTheme;

    if (!themeVersion) {
      continue;
    }

    if (
      !latestThemeVersion ||
      latestThemeVersion.major < themeVersion.major ||
      (latestThemeVersion.major === themeVersion.major && latestThemeVersion.minor < themeVersion.minor)
    ) {
      latestTheme = theme;
    }
  }

  return latestTheme;
}
