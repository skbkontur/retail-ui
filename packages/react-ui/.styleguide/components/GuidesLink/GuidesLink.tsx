import React from 'react';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

import { Link } from '../../../components/Link';
import { fetch } from '../../../lib/net/fetch';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { THEMES } from '../ThemeSwitcher/constants';
import { Hint } from '../../../components/Hint';

interface GuidesLinkProps {
  componentName: string;
}

const GUIDES_LINK = 'https://guides.kontur.ru/components/';

const GuidesLink: React.FunctionComponent<GuidesLinkProps> = ({ componentName }) => {
  const [hasGuide, setHasGuide] = React.useState(false);
  const context = React.useContext<{ theme: keyof typeof THEMES }>(Context);

  const componentLink = `${GUIDES_LINK}${componentName.toLowerCase()}`;
  const isGuideMissing = 'Такого компонента пока нет в Контур.Гайдах';

  React.useEffect(() => {
    fetch(componentLink).then((response) => setHasGuide(response.status === 200));
  }, [componentName]);

  return (
    <ThemeContext.Provider value={THEMES[context.theme]}>
      <Hint pos="right middle" text={!hasGuide && isGuideMissing}>
        <Link loading={!hasGuide} target="_blank" href={componentLink} style={{ pointerEvents: 'all' }}>
          Компонент в Контур.Гайдах
        </Link>
      </Hint>
    </ThemeContext.Provider>
  );
};

export default GuidesLink;
