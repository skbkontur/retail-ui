/* eslint-disable no-nested-ternary */
import React, { CSSProperties } from 'react';

import { Story, Meta } from '../../../typings/stories';
import { createThemeFromClass, isThemeVersionGTE, markThemeVersion } from '../../../lib/theming/ThemeHelpers';

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

class TestThemeClass {
  public static color = 'initial';
  public static textTransform = 'none';
  public static fontStyle = 'normal';
}

type TestThemeIn = Partial<typeof TestThemeClass>;

const TEST_THEME_BASIC = createThemeFromClass(TestThemeClass);

const TEST_THEME_1_0 = createThemeFromClass(
  class extends (class {} as typeof TestThemeClass) {
    public static color = 'red';
    public static textTransform = 'lowercase';
  },
  { themeMarkers: [markThemeVersion(1, 0)], prototypeTheme: TEST_THEME_BASIC },
);

const TEST_THEME_1_1 = createThemeFromClass(
  class extends (class {} as typeof TestThemeClass) {
    public static color = 'green';
    public static fontStyle = 'italic';
  },
  { themeMarkers: [markThemeVersion(1, 1)], prototypeTheme: TEST_THEME_1_0 },
);

const Component = ({ theme }: { theme: TestThemeIn }) => {
  const styles = {
    color: theme.color,
    fontStyle: theme.fontStyle,
    textTransform: theme.textTransform as CSSProperties['textTransform'],
  };

  const themeVersionList = Object.entries({
    '1_0': isThemeVersionGTE(theme, 1, 0),
    '1_1': isThemeVersionGTE(theme, 1, 1),
  })
    .filter(([_, isDetected]) => isDetected)
    .map(([version]) => <li>{version}</li>);

  return (
    <div>
      <span style={styles}>Test Component.</span>
      <pre>{JSON.stringify(styles, null, 2)}</pre>
      <div>
        <span>Detected theme versions:&nbsp;{themeVersionList.length === 0 && 'none'}</span>

        {isThemeVersionGTE(theme, 1, 1) ? (
          <ul>{themeVersionList}</ul>
        ) : isThemeVersionGTE(theme, 1, 0) ? (
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
