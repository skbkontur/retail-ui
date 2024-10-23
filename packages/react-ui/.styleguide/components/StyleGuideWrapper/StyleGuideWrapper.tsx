import React, { useContext, useState } from 'react';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';
import { useStyleGuideContext } from 'react-styleguidist/lib/client/rsg-components/Context/Context';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { getStyles } from './StyleGuideWrapper.styles';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { DEFAULT_THEME_WRAPPER } from '../ThemeSwitcher/constants';

interface StyleGuideRendererProps {
  children: React.ReactNode;
  hasSidebar: boolean;
  toc: React.ReactNode;
  title: string;
  version: string;
}

function StyleGuideRenderer({ children, hasSidebar, toc, title, version }: StyleGuideRendererProps) {
  const emotion = useContext(EmotionContext);
  const { codeRevision, config, slots, displayMode, cssRevision } = useStyleGuideContext();
  const [theme, setTheme] = useState(DEFAULT_THEME_WRAPPER);
  document.body.style.fontFamily = 'Lab Grotesque, Roboto, Helvetica Neue, Arial, sans-serif';
  document.body.style.fontSize = '14px';

  const isThemeDark = theme.toLowerCase().includes('dark');

  if (isThemeDark) {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    const root = document.getElementById('rsg-root');
    if (root) {
      root.style.height = '100%';
    }
  }

  const styles = getStyles(emotion);
  return (
    <Context.Provider value={{ theme, setTheme, codeRevision, config, slots, displayMode, cssRevision }}>
      <div className={emotion.cx(styles.root(), { [styles.darkRoot(DARK_THEME)]: isThemeDark })}>
        <main className={styles.wrapper()}>
          <div className={emotion.cx(styles.content(), { [styles.darkContent(DARK_THEME)]: isThemeDark })}>
            {children}
          </div>
        </main>
        {hasSidebar && (
          <div data-testid="sidebar" className={styles.sidebar()}>
            <header className={styles.header()}>
              <h1>{title}</h1>
              {version && <p>{version}</p>}
              <ThemeSwitcher />
            </header>
            {toc}
          </div>
        )}
        <footer className={styles.footer()}>
          <a href="https://github.com/skbkontur/retail-ui" className={styles.footerLink()}>
            Fork me on GitHub
          </a>
        </footer>
      </div>
    </Context.Provider>
  );
}

export default StyleGuideRenderer;
