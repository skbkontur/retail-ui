/* eslint-disable no-nested-ternary */
import type { CSSProperties } from 'react';
import React from 'react';

import type { Story, Meta } from '../../../typings/stories';
import { createTheme, isThemeGTE, markThemeVersion } from '../../../lib/theming/ThemeHelpers';
import { BasicThemeClassForExtension } from '../../../internal/themes/BasicTheme';
import type { ThemeVersions } from '../../../lib/theming/ThemeVersions';

export default {
  title: 'ThemeVersions/Test',
  parameters: {
    creevey: {
      skip: {
        'no themes': { in: /^(?!\bchrome2022\b)/ },
      },
    },
  },
} as Meta;

class TestThemeClass extends BasicThemeClassForExtension {
  public static color = 'initial';
  public static textTransform = 'none';
  public static fontStyle = 'normal';
}

type TestThemeIn = Partial<typeof TestThemeClass>;

const TEST_THEME_BASIC = createTheme({ themeClass: TestThemeClass });

const TEST_THEME_1_0 = createTheme({
  themeClass: class extends (class {} as typeof TestThemeClass) {
    public static color = 'red';
    public static textTransform = 'lowercase';
  },
  themeMarkers: [markThemeVersion('1.0' as ThemeVersions)],
  prototypeTheme: TEST_THEME_BASIC,
});

const TEST_THEME_1_1 = createTheme({
  themeClass: class extends (class {} as typeof TestThemeClass) {
    public static color = 'green';
    public static fontStyle = 'italic';
  },
  themeMarkers: [markThemeVersion('1.1' as ThemeVersions)],
  prototypeTheme: TEST_THEME_1_0,
});

const Component = ({ theme }: { theme: TestThemeIn }) => {
  const styles = {
    color: theme.color,
    fontStyle: theme.fontStyle,
    textTransform: theme.textTransform as CSSProperties['textTransform'],
  };

  const themeVersionList = Object.entries({
    '1_0': isThemeGTE(theme, '1.0' as ThemeVersions),
    '1_1': isThemeGTE(theme, '1.1' as ThemeVersions),
  })
    .filter(([, isDetected]) => isDetected)
    .map(([version]) => <li>{version}</li>);

  return (
    <div>
      <span style={styles}>Test Component.</span>
      <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(styles, null, 2)}</div>
      <div>
        <span>Detected theme versions:&nbsp;{themeVersionList.length === 0 && 'none'}</span>

        {isThemeGTE(theme, '1.1' as ThemeVersions) ? (
          <ul>{themeVersionList}</ul>
        ) : isThemeGTE(theme, '1.0' as ThemeVersions) ? (
          <ol>{themeVersionList}</ol>
        ) : null}
      </div>
    </div>
  );
};

export const BasicTheme: Story = () => <Component theme={TEST_THEME_BASIC} />;

export const Theme1_0: Story = () => <Component theme={TEST_THEME_1_0} />;
Theme1_0.storyName = 'Theme 1_0';

export const Theme1_1: Story = () => <Component theme={TEST_THEME_1_1} />;
Theme1_1.storyName = 'Theme 1_1';
