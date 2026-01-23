import React from 'react';
import type { Meta } from '@skbkontur/react-ui/typings/stories';
import { QuestionCircleIcon16Regular } from '@skbkontur/icons/icons/QuestionCircleIcon/QuestionCircleIcon16Regular';
import { Text } from '../src/Text';
import { TextTokens, TTextTokens } from '../src/TextTokens';
import { injectGlobal, css, cx } from '@emotion/css';
import {
  ThemeContext,
  DropdownMenu,
  Gapped,
  MenuHeader,
  MenuItem,
  Toast,
  Toggle,
  Tooltip,
  Link,
} from '@skbkontur/react-ui';

export default {
  title: 'Docs',
  component: Text,
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

// Add `position: sticky` for typography controls
injectGlobal(`
  [data-role=wrapper]:has([data-typography-controls]),
  [data-role=preview]:has([data-typography-controls]) {
    overflow: visible !important;
    padding-bottom: 0 !important;
  }
`);

export const TypographyStory = () => {
  const [isSpacing, setIsSpacing] = React.useState(true);
  const [isWideColumn, setIsWideColumn] = React.useState(false);
  const isMountRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    isMountRef.current = true;
  }, []);

  React.useLayoutEffect(() => {
    if (!isMountRef.current) return;

    containerRef.current?.scrollIntoView({ block: 'end' });
  }, [isSpacing, isWideColumn]);

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

  const getText = (size) => {
    if (size > 40) {
      return 'Дизайн для реального мира';
    } else if (size > 26) {
      return 'Виктор Папанек. Дизайн для реального мира';
    } else if (size > 16) {
      return 'Типографике в интерфейсах нужно уделять особое внимание.';
    } else {
      return 'Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна и удобство работы с системой.';
    }
  };

  const getCode = (size) => {
    return {
      React: `<Text tag="p" size={${size}} ${!isSpacing ? ' noSpacing' : ''}${
        isWideColumn ? ' wideColumn' : ''
      }>Текст</Text>`,
      CSS: `t${size}${isWideColumn ? 'Wide' : ''} ${!isSpacing ? ' noSpacing' : ''}`,
      SCSS: `@include t(${size}${!isSpacing ? ', $spacing: false' : ''}${isWideColumn ? ', $wideColumn: true' : ''});`,
      Less: `.t(${size}${!isSpacing ? ', @spacing: false' : ''}${isWideColumn ? ', @wideColumn: true' : ''});`,
    };
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    Toast.push('Код скопирован', null, 1000);
  };

  const TypographyTile = ({ size, opened, openMenu }) => {
    const sizeName = isWideColumn ? `${size}Wide` : size;
    const { lineHeight, margin } = TextTokens[sizeName];

    return (
      <div className={cx(styles.demo, { [styles.demoActive]: opened })} tabIndex={0} onClick={() => openMenu()}>
        <div className={styles.demoTitle}>
          <b className={styles.demoSize}>
            {size}
            {isWideColumn && 'Wide'}
          </b>
          &nbsp; font-size {size} / line-height {lineHeight.replace('px', '')}{' '}
          {isSpacing ? `/ spacing ${margin.replace('px 0', '')}` : ''}
        </div>

        <div className={styles.demoText}>
          <Text tag="p" size={size} wideColumn={isWideColumn} noSpacing={!isSpacing}>
            {getText(size)}
          </Text>
        </div>
      </div>
    );
  };

  const sizes = Object.keys(TextTokens).filter((x) => !x.includes('Wide'));

  return (
    <div className={styles.typography} ref={containerRef}>
      <Gapped gap={28} className={styles.controls} data-typography-controls>
        <Toggle checked={isSpacing} onValueChange={setIsSpacing}>
          Отступы (spacing)
        </Toggle>
        <Toggle checked={isWideColumn} onValueChange={setIsWideColumn}>
          Широкая колонка (wideColumn){' '}
          <Tooltip
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
            <QuestionCircleIcon16Regular />
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
                <MenuItem comment={lang} onClick={() => copyCode(code)}>
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
