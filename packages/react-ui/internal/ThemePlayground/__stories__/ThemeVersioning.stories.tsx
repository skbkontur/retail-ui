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

const TEST_THEME_BASE = createThemeFromClass(TestThemeClass);

const TEST_THEME_V_1_0 = createThemeFromClass(
  class extends (class {} as typeof TestThemeClass) {
    public static color = 'red';
    public static textTransform = 'lowercase';
  },
  { themeMarkers: [markThemeVersion(1.0)], prototypeTheme: TEST_THEME_BASE },
);

const TEST_THEME_V_1_1 = createThemeFromClass(
  class extends (class {} as typeof TestThemeClass) {
    public static color = 'green';
    public static fontStyle = 'italic';
  },
  { themeMarkers: [markThemeVersion(1.1)], prototypeTheme: TEST_THEME_V_1_0 },
);

const Component = ({ theme }: { theme: TestThemeIn }) => {
  const styles = {
    color: theme.color,
    fontStyle: theme.fontStyle,
    textTransform: theme.textTransform as CSSProperties['textTransform'],
  };

  const themeVersions = Object.entries({
    '1.0': isThemeVersionGTE(theme, 1.0),
    '1.1': isThemeVersionGTE(theme, 1.1),
  })
    .filter(([_, isDetected]) => isDetected === true)
    .map(([version]) => version);

  return (
    <>
      <div style={styles}>
        Test Component.&nbsp;
        {themeVersions.length
          ? 'Detected theme versions: ' + themeVersions.join(', ') + '.'
          : 'No theme versions detected.'}
      </div>
      <pre>{JSON.stringify(styles, null, 2)}</pre>
    </>
  );
};

export const BaseTheme: Story = () => <Component theme={TEST_THEME_BASE} />;

export const Theme1_0: Story = () => <Component theme={TEST_THEME_V_1_0} />;
Theme1_0.storyName = 'Theme 1.0';

export const Theme1_1: Story = () => <Component theme={TEST_THEME_V_1_1} />;
Theme1_1.storyName = 'Theme 1.1';
