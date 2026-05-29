import { css } from '@emotion/css';
import { Select } from '@skbkontur/react-ui/components/Select';
import { SingleToast } from '@skbkontur/react-ui/components/SingleToast';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip';
import React from 'react';

import { Text } from '../Text.js';
import { tokens } from '../tokens.js';

type TTextSizes = string;
type TWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type TTag =
  | 'span'
  | 'div'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'time'
  | 'data'
  | 'abbr'
  | 'cite'
  | 'small'
  | 'mark'
  | 'code'
  | 'legend'
  | 'address';

const WEIGHT_MAP: Array<{ value: TWeight; label: string }> = [
  { value: '100', label: 'thin' },
  { value: '200', label: 'extra-light' },
  { value: '300', label: 'light' },
  { value: '400', label: 'regular' },
  { value: '500', label: 'medium' },
  { value: '600', label: 'semi-bold' },
  { value: '700', label: 'bold' },
  { value: '800', label: 'extra-bold' },
  { value: '900', label: 'black' },
];

const TAG_OPTIONS: TTag[] = [
  'span',
  'div',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'label',
  'time',
  'data',
  'abbr',
  'cite',
  'small',
  'mark',
  'code',
  'legend',
  'address',
];

export const TypographyPlayground = () => {
  const [isWide, setIsWide] = React.useState(false);
  const [weight, setWeight] = React.useState<TWeight>('400');
  const [lang, setLang] = React.useState('React');
  const [tag, setTag] = React.useState<TTag>('span');

  const styles = {
    wrapper: css`
      display: flex;
      flex-direction: column;
      font-family: 'Lab Grotesque', sans-serif;
    `,
    controls: css`
      position: sticky;
      top: 15px;
      z-index: 10;
      display: flex;
      gap: 16px;
      align-items: flex-end;
      padding: 9px 24px;
      background: #ffffff;
      border-bottom: 1px solid #e2e7eb;
      margin: 0 -24px 4px;
    `,
    controlGroup: css`
      display: flex;
      flex-direction: column;
      gap: 6px;
    `,
    label: css`
      font-size: 11px;
      color: #858585;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    `,
    toggleContainer: css`
      height: 32px;
      display: flex;
      align-items: center;
    `,
    demoRow: css`
      display: grid;
      grid-template-columns: 144px 1fr 380px;
      gap: 16px;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e2e7eb;
      transition: opacity 0.2s;
    `,
    paramsCol: css`
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-family: monospace;
      font-size: 12px;
      color: #858585;
    `,
    codeSnippet: css`
      font-family: monospace;
      font-size: 13px;
      color: #2e3438;
      background: #f6f8fa;
      border: 1px solid #e2e7eb;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      display: block;
      word-break: keep-all;
      white-space: pre-wrap;
      &:hover {
        border-color: #0070f3;
        background: #f0f7ff;
        color: #0070f3;
      }
    `,
  };

  const getWeightName = (w: TWeight) => WEIGHT_MAP.find((item) => item.value === w)?.label || 'regular';

  const getText = (size: TTextSizes) => {
    const s = Number(size);
    if (s > 36) {
      return 'Дизайн для реального мира';
    }
    if (s > 26) {
      return 'Виктор Папанек. Дизайн для реального мира';
    }
    if (s > 16) {
      return 'Типографике в интерфейсах нужно уделять особое внимание.';
    }
    return 'Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна.';
  };

  const getCode = (size: TTextSizes) => {
    const wName = getWeightName(weight);
    const hasWide = 'wideLineHeight' in (tokens[size as unknown as keyof typeof tokens] as any);
    const wideProp = isWide && hasWide ? ' wide' : '';
    const weightProp = wName !== 'regular' ? ` weight="${wName}"` : '';
    const tagProp = tag !== 'span' ? ` as="${tag}"` : '';

    switch (lang) {
      case 'React':
        return `<Text size="${size}"${tagProp}${wideProp}${weightProp}>Текст</Text>`;
      case 'CSS Global':
        return `t${size}${wName !== 'regular' ? `-${wName}` : ''}${wideProp ? ' t-wide' : ''}`;
      case 'CSS Modules':
        return `${`\${text.t${size}}`}${wName !== 'regular' ? ` \${text.${wName}}` : ''}${wideProp ? ' ${text.wide}' : ''}`;
      case 'SCSS':
        return `@include t(${size}${wName !== 'regular' ? `, $weight: ${wName}` : ''}${wideProp ? ', $wide: true' : ''});`;
      case 'Less':
        return `.t(${size}${wName !== 'regular' ? `, @weight: ${wName}` : ''}${wideProp ? ', @wide: true' : ''});`;
      default:
        return '';
    }
  };

  const sizes = Object.keys(tokens).filter((k) => !k.toLowerCase().includes('wide'));

  return (
    <div className={styles.wrapper}>
      <SingleToast />
      <div className={styles.controls}>
        {lang === 'React' && (
          <div className={styles.controlGroup}>
            <div className={styles.label}>Тег (as)</div>
            <Select
              size="small"
              width={140}
              value={tag}
              items={TAG_OPTIONS.map((t) => [t, t] as [TTag, string]) as Array<[TTag, string]>}
              onValueChange={setTag}
            />
          </div>
        )}

        <div className={styles.controlGroup}>
          <div className={styles.label}>Начертание (weight)</div>
          <Select
            size="small"
            width={140}
            value={weight}
            items={
              WEIGHT_MAP.map((w) => [w.value, `${w.label} (${w.value})`] as [TWeight, string]) as Array<
                [TWeight, string]
              >
            }
            onValueChange={setWeight}
          />
        </div>

        <div className={styles.toggleContainer}>
          <Toggle checked={isWide} onValueChange={setIsWide}>
            Широкая колонка
          </Toggle>
        </div>

        <div
          className={css`
            flex-grow: 1;
          `}
        />

        <div className={styles.controlGroup}>
          <Switcher
            width={380}
            value={lang}
            items={['React', 'CSS Global', 'CSS Modules', 'SCSS', 'Less']}
            onValueChange={setLang}
          />
        </div>
      </div>

      {sizes.map((size) => {
        const token = tokens[size as unknown as keyof typeof tokens] as any;
        const hasWide = 'wideLineHeight' in token;

        return (
          <div
            key={size}
            className={css`
              ${styles.demoRow};
              opacity: ${!hasWide && isWide ? 0.3 : 1};
            `}
          >
            <div className={styles.paramsCol}>
              <div style={{ position: 'absolute', top: -2, left: -26, padding: '1px 2px', fontWeight: 'bold' }}>
                {token.fontSize.replace('px', '')}
              </div>
              <div>font-size: {token.fontSize};</div>
              <div>line-height: {isWide && hasWide ? token.wideLineHeight : token.lineHeight};</div>
              <div>font-weight: {weight};</div>
            </div>

            <Text as={tag} size={size as unknown as any} wide={isWide && hasWide} weight={getWeightName(weight) as any}>
              {getText(size)}
            </Text>

            <div
              className={styles.codeSnippet}
              onClick={() => {
                navigator.clipboard.writeText(getCode(size));
                SingleToast.push('Код скопирован');
              }}
            >
              {getCode(size)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
