import React, { useEffect, useState } from 'react';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';
import { useStyleGuideContext } from 'react-styleguidist/lib/client/rsg-components/Context/Context';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { cx } from '../../../lib/theming/Emotion';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { DEFAULT_THEME_WRAPPER } from '../ThemeSwitcher/constants';

import { styles } from './StyleGuideWrapper.styles';
import { Notification } from '../Notification/Notification';

interface StyleGuideRendererProps {
  children: React.ReactNode;
  hasSidebar: boolean;
  toc: React.ReactNode;
  title: string;
  version: string;
}

function StyleGuideRenderer({ children, hasSidebar, toc, title, version }: StyleGuideRendererProps) {
  const { codeRevision, config, slots, displayMode, cssRevision } = useStyleGuideContext();
  const [theme, setTheme] = useState(DEFAULT_THEME_WRAPPER);
  document.body.style.fontFamily = 'Lab Grotesque, Roboto, Helvetica Neue, Arial, sans-serif';
  document.body.style.fontSize = '14px';
  document.body.style.overscrollBehaviorY = 'none';

  const isThemeDark = theme.toLowerCase().includes('dark');

  if (isThemeDark) {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    const root = document.getElementById('rsg-root');
    if (root) {
      root.style.height = '100%';
    }
  }

  return (
    <Context.Provider value={{ theme, setTheme, codeRevision, config, slots, displayMode, cssRevision }}>
      <Notification />
      <div className={cx(styles.root(), { [styles.darkRoot(DARK_THEME)]: isThemeDark })}>
        <main className={styles.wrapper()}>
          <div className={cx(styles.content(), { [styles.darkContent(DARK_THEME)]: isThemeDark })}>{children}</div>
        </main>
        {hasSidebar && (
          <div data-testid="sidebar" className={cx(styles.sidebar(), styles.sidebarNotice())}>
            <header className={styles.header()}>
              <div className={styles.heading()}>
                <h1>{title}</h1>
                <a
                  href="https://github.com/skbkontur/retail-ui"
                  className={styles.github()}
                  aria-label="GitHub"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" viewBox="0 0 17 16">
                    <clipPath id="a">
                      <path d="M0 0h16.333v16H0z" />
                    </clipPath>
                    <g clipPath="url(#a)">
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M8.142 0C3.64 0 0 3.667 0 8.203a8.2 8.2 0 0 0 5.568 7.782c.404.081.552-.177.552-.394 0-.19-.013-.842-.013-1.521-2.265.489-2.737-.978-2.737-.978-.364-.95-.903-1.195-.903-1.195-.742-.503.054-.503.054-.503.822.055 1.254.842 1.254.842.727 1.25 1.9.897 2.372.68.067-.53.283-.897.512-1.1-1.806-.19-3.707-.897-3.707-4.048 0-.896.324-1.63.836-2.2-.08-.203-.364-1.046.081-2.173 0 0 .687-.217 2.238.842a7.8 7.8 0 0 1 2.035-.272 7.8 7.8 0 0 1 2.036.272c1.55-1.06 2.238-.842 2.238-.842.445 1.127.161 1.97.08 2.173.526.57.836 1.304.836 2.2 0 3.151-1.9 3.844-3.72 4.047.296.258.552.747.552 1.521 0 1.1-.013 1.983-.013 2.255 0 .217.148.475.553.394a8.2 8.2 0 0 0 5.567-7.782C16.284 3.667 12.631 0 8.142 0"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              {version && <p>{version}</p>}
              <ThemeSwitcher />
            </header>
            {toc}
          </div>
        )}
      </div>
    </Context.Provider>
  );
}

export default StyleGuideRenderer;
