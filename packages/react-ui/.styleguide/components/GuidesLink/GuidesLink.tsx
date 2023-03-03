import React from 'react';
import Styled from 'react-styleguidist/lib/client/rsg-components/Styled';
import { Link } from '../../../components/Link';
import { fetch } from '../../../lib/net/fetch';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { THEMES } from '../ThemeSwitcher/constants';

interface Classes {
  root: React.CSSProperties;
}

interface GuidesLinkProps {
  classes: { [name: string]: string };
  componentName: string;
}

const styles = ({ baseBackground }: any): Classes => ({
  root: {
    backgroundColor: baseBackground,
  },
});

const GUIDES_LINK = 'https://guides.kontur.ru/components/';

const GuidesLink: React.FunctionComponent<GuidesLinkProps> = ({ componentName, classes }) => {
  const [hasGuide, setHasGuide] = React.useState(false);
  const context = React.useContext<{ theme: keyof typeof THEMES }>(Context);

  const componentLink = `${GUIDES_LINK}${componentName.toLowerCase()}`;

  React.useEffect(() => {
    fetch(componentLink).then((response) => setHasGuide(response.status === 200));
  }, [componentName]);

  return (
    <ThemeContext.Provider value={THEMES[context.theme]}>
      <div className={classes.root}>
        <Link loading={!hasGuide} target="_blank" href={componentLink}>
          Компонент в гайдах
        </Link>
      </div>
    </ThemeContext.Provider>
  );
};

export default Styled(styles)(GuidesLink);
