/* eslint-disable no-nested-ternary */
import React, { CSSProperties } from 'react';

import { Story, Meta } from '../../../typings/stories';
import { createTheme, isThemeVersion, markThemeVersion } from '../../../lib/theming/ThemeHelpers';
import { BasicThemeClassForExtension } from '../../../internal/themes/BasicTheme';

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
type TestVersions = '1.0' | '1.1';

const TEST_THEME_BASIC = createTheme({ themeClass: TestThemeClass });

const TEST_THEME_1_0 = createTheme({
  themeClass: class extends (class {} as typeof TestThemeClass) {
    public static color = 'red';
    public static textTransform = 'lowercase';
  },
  themeMarkers: [markThemeVersion<TestVersions>('1.0')],
  prototypeTheme: TEST_THEME_BASIC,
});

const TEST_THEME_1_1 = createTheme({
  themeClass: class extends (class {} as typeof TestThemeClass) {
    public static color = 'green';
    public static fontStyle = 'italic';
  },
  themeMarkers: [markThemeVersion<TestVersions>('1.1')],
  prototypeTheme: TEST_THEME_1_0,
});

const Component = ({ theme }: { theme: TestThemeIn }) => {
  const styles = {
    color: theme.color,
    fontStyle: theme.fontStyle,
    textTransform: theme.textTransform as CSSProperties['textTransform'],
  };

  const themeVersionList = Object.entries({
    '1_0': isThemeVersion<TestVersions>(theme, '1.0'),
    '1_1': isThemeVersion<TestVersions>(theme, '1.1'),
  })
    .filter(([_, isDetected]) => isDetected)
    .map(([version]) => <li>{version}</li>);

  return (
    <div>
      <span style={styles}>Test Component.</span>
      <pre>{JSON.stringify(styles, null, 2)}</pre>
      <div>
        <span>Detected theme versions:&nbsp;{themeVersionList.length === 0 && 'none'}</span>

        {isThemeVersion<TestVersions>(theme, '1.1') ? (
          <ul>{themeVersionList}</ul>
        ) : isThemeVersion<TestVersions>(theme, '1.0') ? (
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
