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

import { Text, TextProps } from '../Text.js';
import { tokens } from '../tokens.js';

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
  [data-role="preview"] * {
    font-family: Lab Grotesque, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-role=wrapper]:has([data-typography-controls]),
  [data-role=preview]:has([data-typography-controls]) {
    overflow: visible !important;
    padding-bottom: 0 !important;
  }
`);

/**
 * Пример текста с заголовками и парагарфами
 */
export const ExampleBasic = () => {
  return (
    <>
      <Text as="h1" size={48} spacing>
        Как создать службу охраны труда
      </Text>
      <Text as="h2" size={24} weight="bold" spacing>
        Когда требуется создавать службу охраны труда
      </Text>
      <Text as="p" size={18} spacing wide>
        Работодатели с численностью более 50 человек создают свою службу охраны труда или вводят в штатное расписание
        должность специалиста по охране труда в обязательном порядке (ч. 1 ст. 223 ТК РФ). Предприятия с меньшим штатом
        организуют СОТ с учетом своей специфики.
      </Text>
      <Text as="p" size={18} spacing wide>
        Трудовой кодекс требует создавать СОТ у работодателей, «осуществляющих производственную деятельность». Из-за
        этой формулировки некоторые думают, что служба охраны труда нужна только на промышленных предприятиях — это
        заблуждение.
      </Text>
    </>
  );
};

ExampleBasic.storyName = 'Базовый пример';

export const TypographyStory = () => {
  const [hasSpacing, setHasSpacing] = React.useState(true);
  const [isWide, setIsWide] = React.useState(false);
  const [weight, setWeight] = React.useState<TextProps['weight'] | null>(null);

  const isMountRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);

  type TTextSizes = TextProps['size'];

  React.useEffect(() => {
    isMountRef.current = true;
  }, []);

  React.useLayoutEffect(() => {
    if (!isMountRef.current) return;
    containerRef.current?.scrollIntoView({ block: 'end' });
  }, [hasSpacing, isWide, weight]);

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
      display: flex;
      gap: 24px;
      align-items: center;
      white-space: nowrap;
      padding: 20px 32px;
      background: ${theme.bgDefault};
      border-top: 1px solid ${theme.menuSeparatorBorderColor};
      margin: 0 -20px;
    `,
    demo: css`
      display: grid;
      grid-template-columns: 350px ${isWide ? '1fr' : '0.8fr'};
      align-items: center;
      gap: 16px;
      width: calc(100% - 32px);
      padding: 8px 16px;
      border: 0;
      border-radius: 8px;
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
    const s = Number(size);
    if (s > 40) return 'Дизайн для реального мира';
    if (s > 26) return 'Виктор Папанек. Дизайн для реального мира';
    if (s > 16) return 'Типографике в интерфейсах нужно уделять особое внимание.';
    return 'Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна и удобство работы с системой.';
  };

  const getCode = (size: TTextSizes) => {
    const weightProp = weight ? ` weight="${weight}"` : '';
    return {
      React: `<Text as="p" size={${size}}${weightProp}${hasSpacing ? ' spacing' : ''}${isWide ? ' wide' : ''}>Текст</Text>`,
      CSS: `t${size}${isWide ? 't-wide' : ''}${hasSpacing ? ' t-spacing' : ''}`,
      'CSS Module': `\${text.t${size}}${isWide ? ' ${text.wide}' : ''}${hasSpacing ? ' ${text.spacing}' : ''}`,
      SCSS: `@include t(${size}${hasSpacing ? ', $spacing: true' : ''}${isWide ? ', $wide: true' : ''});`,
      Less: `.t(${size}${hasSpacing ? ', @spacing: true' : ''}${isWide ? ', @wide: true' : ''});`,
    };
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    SingleToast.push('Код скопирован', { showTime: 1000 });
  };

  const TypographyTile = ({ size, opened, openMenu }: { size: TTextSizes; opened: boolean; openMenu: () => void }) => {
    const tokenKey = (isWide ? `${size}Wide` : size) as keyof typeof tokens;
    const token = tokens[tokenKey] || tokens[size as keyof typeof tokens];

    const lineHeight = token.lineHeight.replace('px', '');
    const margin = token.marginBottom ? token.marginBottom.replace('px 0', '') : '0';

    return (
      <div className={cx(styles.demo, { [styles.demoActive]: opened })} tabIndex={0} onClick={openMenu}>
        <div className={styles.demoTitle}>
          <b className={styles.demoSize}>
            {size}
            {isWide && ' wide'}
          </b>
          &nbsp; font-size {size} / line-height {lineHeight} {hasSpacing ? `/ spacing ${margin}` : ''}
        </div>

        <div className={styles.demoText}>
          <Text as="p" size={size} wide={isWide} spacing={hasSpacing} weight={weight}>
            {getText(size)}
          </Text>
        </div>
      </div>
    );
  };

  const sizes = Object.keys(tokens).map((x) => (isNaN(Number(x)) ? x : Number(x))) as TTextSizes[];

  return (
    <div className={styles.typography} ref={containerRef}>
      <SingleToast />
      <div className={styles.controls} data-typography-controls>
        <Toggle checked={hasSpacing} onValueChange={setHasSpacing}>
          Отступы (spacing)
        </Toggle>
        <Toggle checked={isWide} onValueChange={setIsWide}>
          Широкая колонка (wide){' '}
          <Tooltip
            useWrapper
            render={() => (
              <div style={{ maxWidth: 200 }}>
                Если длина строки больше 40 символов, увеличивается высота строки и абзацный отступ.{' '}
              </div>
            )}
          >
            <IconQuestionCircleRegular16 />
          </Tooltip>
        </Toggle>

        <div
          className={css`
            flex-grow: 1;
          `}
        />

        <Select
          width={200}
          value={weight}
          items={[
            [null, 'Начертание по умолчанию'],
            ['regular', 'Regular (400)'],
            ['medium', 'Medium (500)'],
            ['bold', 'Bold (700)'],
          ]}
          placeholder="Выберите начертание"
          onValueChange={setWeight}
        />
      </div>

      {sizes.map((size) => {
        const token = tokens[size as keyof typeof tokens];
        const hasWideVersion = 'wideLineHeight' in token;

        if (isWide && !hasWideVersion) {
          return null;
        }

        return (
          <DropdownMenu
            key={String(size)}
            caption={({ openMenu, opened }) => <TypographyTile size={size} opened={opened} openMenu={openMenu} />}
          >
            <MenuHeader>Скопировать код</MenuHeader>
            {Object.entries(getCode(size)).map(([lang, code]) => (
              <MenuItem key={lang} comment={lang} onClick={() => copyCode(code)}>
                {code}
              </MenuItem>
            ))}
          </DropdownMenu>
        );
      })}
    </div>
  );
};

TypographyStory.storyName = 'Стили типографики';
