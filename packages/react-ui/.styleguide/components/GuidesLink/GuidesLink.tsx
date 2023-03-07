import React from 'react';
import { Link } from '../../../components/Link';
import { fetch } from '../../../lib/net/fetch';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { THEMES } from '../ThemeSwitcher/constants';

interface GuidesLinkProps {
  componentName: string;
}

const GUIDES_LINK = 'https://guides.kontur.ru/components/';

const GuidesLink: React.FunctionComponent<GuidesLinkProps> = ({ componentName }) => {
  const [hasGuide, setHasGuide] = React.useState(false);
  const context = React.useContext<{ theme: keyof typeof THEMES }>(Context);

  const componentLink = `${GUIDES_LINK}${componentName.toLowerCase()}`;

  React.useEffect(() => {
    fetch(componentLink).then((response) => setHasGuide(response.status === 200));
  }, [componentName]);

  return (
    <ThemeContext.Provider value={THEMES[context.theme]}>
      <Link loading={!hasGuide} target="_blank" href={componentLink}>
        Компонент в гайдах
      </Link>
    </ThemeContext.Provider>
  );
};

export default GuidesLink;
