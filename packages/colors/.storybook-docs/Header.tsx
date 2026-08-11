import React, { useEffect } from 'react';

import { checkAccess } from './check-access.js';

export interface HeaderProps {
  title?: string;
  packageName?: string;
  guides?: string;
  figma?: string;
  extension?: string;
}

export const Header = ({ title, packageName, guides, figma, extension }: HeaderProps = {}) => {
  const [hasAccess, setHasAccess] = React.useState(false);

  useEffect(() => {
    checkAccess().then((status) => {
      setHasAccess(status);
    });
  }, []);

  return (
    <>
      <h1>{title}</h1>

      <style>
        {`
        .header-storybook {
          display: flex;
          gap: 2px;
          align-items: flex-start;
          margin: 12px 0 24px !important;
        }

        .header-storybook a {
          position: relative;
          display: inline-flex;
          gap: 6px;
          padding: 4px 8px;
          align-items: center;
          text-decoration: none !important;
          transition: 0.15s ease;
          border-radius: 8px;
        }

        .header-storybook a:first-child {
          margin-left: -8px;
        }

        .header-storybook a:hover {
          background: rgba(0, 0, 0, 0.06);
        }

        .header-storybook a:active {
          background: rgba(0, 0, 0, 0.1);
        }

        .header-storybook a:before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          width: calc(100% + 8px);
          height: calc(100% + 8px);
        }

        .header-storybook img {
          width: 16px;
          height: 16px;
        }
        `}
      </style>

      <div className="header-storybook">
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

        {extension && (
          <a href={extension} target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/60px-Google_Chrome_icon_%28February_2022%29.svg.png"
              alt=""
            />
            Extension
          </a>
        )}

        {hasAccess && packageName && (
          <a
            href={`https://git.skbkontur.ru/ui/kontur-ui-addons/-/tree/master/packages/${packageName}`}
            target="_blank"
          >
            <img
              src="https://git.skbkontur.ru/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png"
              alt=""
            />
            GitLab
          </a>
        )}
      </div>
    </>
  );
};
