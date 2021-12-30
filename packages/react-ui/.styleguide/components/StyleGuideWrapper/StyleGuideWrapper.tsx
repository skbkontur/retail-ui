import React, { useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';
import { useStyleGuideContext } from 'react-styleguidist/lib/client/rsg-components/Context/Context';
import { cx } from '../../../lib/theming/Emotion';
import { styles } from './StyleGuideWrapper.styles';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';

interface StyleGuideRendererProps {
  children: React.ReactNode;
  hasSidebar: boolean;
  toc: React.ReactNode;
  title: string;
  version: string;
}

function StyleGuideRenderer({ children, hasSidebar, toc, title, version }: StyleGuideRendererProps) {
  const { codeRevision, config, slots, displayMode, cssRevision } = useStyleGuideContext();
  const [theme, setTheme] = useState('light');
  if (theme === 'dark') {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    const root = document.getElementById('rsg-root');
    if (root) {
      root.style.height = '100%';
    }
  }
  return (
    <Context.Provider value={{ theme, setTheme, codeRevision, config, slots, displayMode, cssRevision }}>
      <div className={cx({ [styles.root()]: true, [styles.darkRoot(DARK_THEME)]: theme === 'dark' })}>
        <main className={cx(styles.wrapper())}>
          <div className={cx({ [styles.content()]: true, [styles.darkContent(DARK_THEME)]: theme === 'dark' })}>
            {children}
          </div>
        </main>
        {hasSidebar && (
          <div data-testid="sidebar" className={cx(styles.sidebar())}>
            <header className={cx(styles.header())}>
              <h1>{title}</h1>
              {version && <p>{version}</p>}
              <ThemeSwitcher />
            </header>
            {toc}
          </div>
        )}
        <footer className="rsg--root-55">
          <a href="https://github.com/skbkontur/retail-ui" className="rsg--link-56">
            Fork me on GitHub
          </a>
        </footer>
      </div>
    </Context.Provider>
  );
}

export default StyleGuideRenderer;
