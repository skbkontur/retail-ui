import React, { useEffect } from 'react';

import { css } from '../lib/theming/Emotion';

import { checkAccess } from './check-access';

const COMPONENT_PATH = 'packages/react-ui/components';

export interface HeaderProps {
  title?: string;
  component?: string;
  guides?: string;
  figma?: string;
}

export const Header = ({ component, guides, figma }: HeaderProps = {}) => {
  const [hasAccess, setHasAccess] = React.useState(false);

  useEffect(() => {
    checkAccess().then(() => {
      setHasAccess(true);
    });
  }, []);

  const styles = css`
    & {
      display: flex;
      gap: 2px;
      align-items: flex-start;
      padding: 12px 0 24px;
    }

    a {
      position: relative;
      display: inline-flex;
      gap: 6px;
      padding: 4px 8px;
      align-items: center;
      text-decoration: none !important;
      transition: 0.15s ease;
      border-radius: 8px;
    }

    a:first-child {
      margin-left: -8px;
    }

    a:hover {
      background: rgba(0, 0, 0, 0.06);
    }

    a:active {
      background: rgba(0, 0, 0, 0.1);
    }

    a:before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
    }

    img {
      width: 16px;
      height: 16px;
    }
  `;

  return (
    <>
      <h1>{component}</h1>

      <div className={styles}>
        {guides && (
          <a href={guides} target="_blank">
            <img src="https://tech.skbkontur.ru/kontur-ui/favicon.svg" alt="" />
            Гайды
          </a>
        )}

        {figma && (
          <a href={figma} target="_blank">
            <img src="https://static.figma.com/app/icon/1/favicon.svg" alt="" />
            Figma
          </a>
        )}

        {hasAccess && component && (
          <a href={`https://yt.skbkontur.ru/issues/IF?q=${component}`} target="_blank">
            <img src="https://yt.skbkontur.ru/static/favicon.ico" alt="" />
            YouTrack
          </a>
        )}

        {hasAccess && component && (
          <a href={`https://git.skbkontur.ru/ui/react-ui/-/tree/master/${COMPONENT_PATH}/${component}`} target="_blank">
            <img
              src="https://git.skbkontur.ru/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png"
              alt=""
            />
            GitLab
          </a>
        )}

        {component && (
          <a href={`https://github.com/skbkontur/retail-ui/tree/master/${COMPONENT_PATH}/${component}`} target="_blank">
            <img src="https://github.githubassets.com/favicons/favicon.svg" alt="" />
            GitHub
          </a>
        )}
      </div>
    </>
  );
};
