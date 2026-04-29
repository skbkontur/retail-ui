import { injectGlobal, css, cx } from '@emotion/css';
import { IconQuestionCircleRegular16 } from '@skbkontur/icons/IconQuestionCircleRegular16';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Link } from '@skbkontur/react-ui/components/Link';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { Toast } from '@skbkontur/react-ui/components/Toast';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import type { Meta } from '@storybook/react';
import React from 'react';

import { Text } from '../src/Text';
import { TextTokens } from '../src/TextTokens';

export default {
  title: 'Typography',
  component: Text,
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

injectGlobal(`
  [data-role=wrapper]:has([data-typography-controls]),
  [data-role=preview]:has([data-typography-controls]) {
    overflow: visible !important;
    padding-bottom: 0 !important;
  }
`);

export const TypographyStory = () => {
  const [hasSpacing, setHasSpacing] = React.useState(true);
  const [isWideColumn, setIsWideColumn] = React.useState(false);
  const isMountRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    isMountRef.current = true;
  }, []);

  React.useLayoutEffect(() => {
    if (!isMountRef.current) {
      return;
    }

    containerRef.current?.scrollIntoView({ block: 'end' });
  }, [hasSpacing, isWideColumn]);

  const styles = {
    typography: css`
      display: flex;
      flex-direction: column;

      &,
      * {
        font-family: 'Lab Grotesque', 'Helvetica Neue', Roboto, Arial, sans-serif;
      }
    `,
    controls: css`
      position: sticky;
      bottom: 0;
      order: 1;
      white-space: nowrap;
      padding: 20px 32px;
      background: ${theme.bgDefault};
      border-top: 1px solid ${theme.menuSeparatorBorderColor};
      margin: 0 -20px;
    `,
    heading: css`
      padding: 0 16px;
      width: 50%;
    `,
    demo: css`
      display: grid;
      grid-template-columns: 350px ${isWideColumn ? '1fr' : '0.8fr'};
      align-items: center;
      gap: 16px;
      width: calc(100% - 32px);
      padding: 8px 16px;
      border: 0;
      border-radius: 8px;
      font-family: inherit;
      text-align: left;
      background: none;
      cursor: pointer;
      transition: 0.15s ease;
      color: ${theme.textColorDefault};

      &:hover {
        background: ${theme.menuItemHoverBg};
      }

      &:focus-visible {
        outline: 2px solid currentColor;
      }

      &:active {
        background: ${theme.menuItemSelectedBg};
      }
    `,
    demoActive: css`
      background: ${theme.menuItemHoverBg};
    `,
    demoTitle: css`
      font-size: 13px;
    `,
    demoSize: css`
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      color: white;
      padding: 2px 4px;
    `,
    demoText: css`
      display: flex;
    `,
  };

  const getText = (size: TTextSizes) => {
    if (size > 40) return 'Дизайн для реального мира';
    if (size > 26) return 'Виктор Папанек. Дизайн для реального мира';
    if (size > 16) return 'Типографике в интерфейсах нужно уделять особое внимание.';
    return 'Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна и удобство работы с системой.';
  };

  const getCode = (size: TTextSizes) => {
    return {
      React: `<Text tag="p" size={${size}} ${hasSpacing ? ' spacing' : ''}${
        isWideColumn ? ' wideColumn' : ''
      }>Текст</Text>`,
      CSS: `t${size}${isWideColumn ? 'Wide' : ''} ${hasSpacing ? ' tSpacing' : ''}`,
      SCSS: `@include t(${size}${hasSpacing ? ', $spacing: true' : ''}${isWideColumn ? ', $wideColumn: true' : ''});`,
      Less: `.t(${size}${hasSpacing ? ', @spacing: true' : ''}${isWideColumn ? ', @wideColumn: true' : ''});`,
    };
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    SingleToast.push('Код скопирован', { showTime: 1000 });
  };

  const TypographyTile = ({ size, opened, openMenu }: { size: TTextSizes; opened: boolean; openMenu: () => void }) => {
    const sizeName = (isWideColumn ? `${size}Wide` : size) as TTextTokens;
    const { lineHeight, margin } = TextTokens[sizeName];

    return (
      <div className={cx(styles.demo, { [styles.demoActive]: opened })} tabIndex={0} onClick={() => openMenu()}>
        <div className={styles.demoTitle}>
          <b className={styles.demoSize}>
            {size}
            {isWideColumn && 'Wide'}
          </b>
          &nbsp; font-size {size} / line-height {lineHeight.replace('px', '')}{' '}
          {hasSpacing ? `/ spacing ${margin.replace('px 0', '')}` : ''}
        </div>

        <div className={styles.demoText}>
          <Text tag="p" size={size} wideColumn={isWideColumn} spacing={hasSpacing}>
            {getText(size)}
          </Text>
        </div>
      </div>
    );
  };

  const sizes = Object.keys(TextTokens)
    .filter((x) => !x.includes('Wide'))
    .map(Number) as TTextSizes[];
  return (
    <div className={styles.typography} ref={containerRef}>
      <Gapped gap={28} className={styles.controls} data-typography-controls>
        <Toggle checked={hasSpacing} onValueChange={setHasSpacing}>
          Отступы (spacing)
        </Toggle>
        <Toggle checked={isWideColumn} onValueChange={setIsWideColumn}>
          Широкая колонка (wideColumn){' '}
          <Tooltip
            useWrapper
            render={() => (
              <div style={{ maxWidth: 200 }}>
                Если длина строки больше 40&nbsp;символов, увеличивается высота строки и абзацный отступ.{' '}
                <Link
                  target="_blank"
                  href="https://guides.kontur.ru/principles/text/text-styles/#Dlya_zagolovkov,_lidov_i_obichnogo_teksta"
                >
                  Подробнее в гайде
                </Link>
              </div>
            )}
          >
            <IconQuestionCircleRegular16 />
          </Tooltip>
        </Toggle>
      </Gapped>
      {sizes.map(
        (size) =>
          (!isWideColumn || (isWideColumn && `${size}Wide` in TextTokens)) && (
            <DropdownMenu
              caption={({ openMenu, opened }) => <TypographyTile size={size} opened={opened} openMenu={openMenu} />}
              key={size}
            >
              <MenuHeader>Скопировать код</MenuHeader>
              {Object.entries(getCode(size)).map(([lang, code]) => (
                <MenuItem key={lang} comment={lang} onClick={() => copyCode(code)}>
                  {code}
                </MenuItem>
              ))}
            </DropdownMenu>
          )
      )}
    </div>
  );
};
TypographyStory.storyName = 'Типографика';
