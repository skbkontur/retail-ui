import { css } from '@emotion/css';
import { Select } from '@skbkontur/react-ui/components/Select';
import { SingleToast } from '@skbkontur/react-ui/components/SingleToast';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import React from 'react';

import { Heading } from '../Heading.js';
import { Text } from '../Text.js';
import { bodyTokens, headingTokens } from '../tokens.js';

type TWeight = 'regular' | 'medium' | 'bold' | '';

const WEIGHT_MAP: Array<{
  value: 'regular' | 'medium' | 'bold';
  label: string;
}> = [
  { value: 'regular', label: 'regular' },
  { value: 'medium', label: 'medium' },
  { value: 'bold', label: 'bold' },
];

const HEADING_TAG_OPTIONS = ['div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const TEXT_TAG_OPTIONS = [
  'span',
  'div',
  'p',
  'label',
  'time',
  'data',
  'abbr',
  'cite',
  'small',
  'legend',
  'address',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const toCamelCaseWithCapsSize = (str: string) => {
  const parts = str.split('-');
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part;
      }
      if (index === parts.length - 1) {
        return part.toUpperCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
};

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
    gap: 12px;
    align-items: last baseline;
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
    letter-spacing: 0.25px;
    font-weight: 600;
  `,
  demoRow: css`
    display: grid;
    grid-template-columns: 160px 1fr 380px;
    gap: 16px;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #e2e7eb;
  `,
  paramsCol: css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: monospace;
    font-size: 10px;
    line-height: 9px;
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

export const HeadingPlayground = () => {
  const [lang, setLang] = React.useState('React');
  const [tag, setTag] = React.useState();
  const [weight, setWeight] = React.useState<TWeight>();
  const [reset, setReset] = React.useState(true);

  const getCode = (key: string) => {
    const tagAttr = tag && tag !== 'span' ? ` as="${tag}"` : '';
    const currentWeight = weight || 'bold';
    const weightAttr = weight && weight !== 'bold' ? ` weight="${weight}"` : '';
    const resetAttr = !reset ? ' reset={false}' : '';
    const currentTag = tag || 'span';

    switch (lang) {
      case 'React':
        return `<Heading use="${key}"${tagAttr}${weightAttr}${resetAttr}>\n  Заголовок\n</Heading>`;
      case 'CSS Global': {
        const classes = [`t-${key}`];
        if (currentWeight !== 'bold') {
          classes.push(`t-${currentWeight}`);
        }
        if (reset) {
          classes.push('t-reset');
        }
        return `<${currentTag} className="${classes.join(' ')}">\n  Заголовок\n</${currentTag}>`;
      }
      case 'CSS Modules': {
        const classes = [`styles.${toCamelCaseWithCapsSize(key)}`];
        if (currentWeight !== 'bold') {
          classes.push(`styles.${currentWeight}`);
        }
        if (reset) {
          classes.push('styles.reset');
        }

        const classNameValue =
          classes.length === 1 ? `{${classes[0]}}` : `{\`${classes.map((c) => `\${${c}}`).join(' ')}\`}`;

        return `<${currentTag} className=${classNameValue}>\n  Заголовок\n</${currentTag}>`;
      }
      case 'SCSS': {
        const scssParams = [currentWeight !== 'bold' ? `$weight: '${currentWeight}'` : '', reset ? '$reset: true' : '']
          .filter(Boolean)
          .join(', ');
        return `@include t-${key}(${scssParams});`;
      }
      case 'Less': {
        const lessParams = [currentWeight !== 'bold' ? `@weight: ${currentWeight}` : '', reset ? '@reset: true' : '']
          .filter(Boolean)
          .join(', ');
        return `.t-${key}(${lessParams});`;
      }
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <SingleToast />
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <div className={styles.label}>Тег</div>
          <Select
            size="small"
            width={180}
            value={tag}
            placeholder="По умолчанию div"
            items={HEADING_TAG_OPTIONS}
            onValueChange={setTag}
          />
        </div>
        <div className={styles.controlGroup}>
          <div className={styles.label}>Начертание</div>
          <Select
            size="small"
            width={180}
            value={weight}
            placeholder="По умолчанию bold"
            items={WEIGHT_MAP.map((w) => [w.value, w.label]) as any}
            onValueChange={setWeight as any}
          />
        </div>
        <div className={styles.controlGroup}>
          <Toggle checked={reset} onValueChange={setReset}>
            Сброс стилей
          </Toggle>
        </div>
        <div style={{ flexGrow: 1 }} />
        <div className={styles.controlGroup}>
          <Switcher
            width={380}
            value={lang}
            items={['React', 'CSS Global', 'CSS Modules', 'SCSS', 'Less']}
            onValueChange={setLang}
          />
        </div>
      </div>

      {Object.entries(headingTokens).map(([key, token]) => (
        <div key={key} className={styles.demoRow}>
          <div className={styles.paramsCol}>
            <Text use="body-s" style={{ fontFamily: 'Lab Grotesque', fontWeight: 'bold', color: '#2e3438' }}>
              {key}
            </Text>
            {Object.entries(token).map(([prop, val]) => {
              let displayVal = val;
              if (prop === 'font-weight') {
                const currentWeight = weight || 'bold';
                if (currentWeight === 'bold') {
                  displayVal = '700';
                } else if (currentWeight === 'medium') {
                  displayVal = '500';
                } else if (currentWeight === 'regular') {
                  displayVal = '400';
                }
              }
              return (
                <div key={prop}>
                  {prop}: {displayVal};
                </div>
              );
            })}
          </div>
          <Heading as={(tag || 'div') as any} use={key as any} weight={(weight || 'bold') as any} reset={reset}>
            Заголовок
          </Heading>
          <div
            className={styles.codeSnippet}
            onClick={() => {
              navigator.clipboard.writeText(getCode(key));
              SingleToast.push('Скопировано');
            }}
          >
            {getCode(key)}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TextPlayground = () => {
  const [lang, setLang] = React.useState('React');
  const [tag, setTag] = React.useState();
  const [weight, setWeight] = React.useState<TWeight>();
  const [reset, setReset] = React.useState(true);

  const getCode = (key: string) => {
    const tagAttr = tag && tag !== 'span' ? ` as="${tag}"` : '';
    const currentWeight = weight || 'regular';
    const weightAttr = weight && weight !== 'regular' ? ` weight="${weight}"` : '';
    const resetAttr = !reset ? ' reset={false}' : '';
    const currentTag = tag || 'span';

    switch (lang) {
      case 'React':
        return `<Text use="${key}"${tagAttr}${weightAttr}${resetAttr}>\n  Текст\n</Text>`;
      case 'CSS Global': {
        const classes = [`t-${key}`];
        if (currentWeight !== 'regular') {
          classes.push(`t-${currentWeight}`);
        }
        if (reset) {
          classes.push('t-reset');
        }
        return `<${currentTag} className="${classes.join(' ')}">\n  Текст\n</${currentTag}>`;
      }
      case 'CSS Modules': {
        const classes = [`styles.${toCamelCaseWithCapsSize(key)}`];
        if (currentWeight !== 'regular') {
          classes.push(`styles.${currentWeight}`);
        }
        if (reset) {
          classes.push('styles.reset');
        }

        const classNameValue =
          classes.length === 1 ? `{${classes[0]}}` : `{\`${classes.map((c) => `\${${c}}`).join(' ')}\`}`;

        return `<${currentTag} className=${classNameValue}>\n  Текст\n</${currentTag}>`;
      }
      case 'SCSS': {
        const scssParams = [
          currentWeight !== 'regular' ? `$weight: '${currentWeight}'` : '',
          reset ? '$reset: true' : '',
        ]
          .filter(Boolean)
          .join(', ');
        return `@include t-${key}(${scssParams});`;
      }
      case 'Less': {
        const lessParams = [currentWeight !== 'regular' ? `@weight: ${currentWeight}` : '', reset ? '@reset: true' : '']
          .filter(Boolean)
          .join(', ');
        return `.t-${key}(${lessParams});`;
      }
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <SingleToast />
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <div className={styles.label}>Тег</div>
          <Select
            size="small"
            width={180}
            value={tag}
            placeholder="По умолчанию span"
            items={TEXT_TAG_OPTIONS}
            onValueChange={setTag}
          />
        </div>
        <div className={styles.controlGroup}>
          <div className={styles.label}>Начертание</div>
          <Select
            size="small"
            width={180}
            value={weight}
            placeholder="По умолчанию regular"
            items={WEIGHT_MAP.map((w) => [w.value, w.label]) as any}
            onValueChange={setWeight as any}
          />
        </div>
        <div className={styles.controlGroup}>
          <Toggle checked={reset} onValueChange={setReset}>
            Сброс стилей
          </Toggle>
        </div>
        <div style={{ flexGrow: 1 }} />
        <div className={styles.controlGroup}>
          <Switcher
            width={380}
            value={lang}
            items={['React', 'CSS Global', 'CSS Modules', 'SCSS', 'Less']}
            onValueChange={setLang}
          />
        </div>
      </div>

      {Object.entries(bodyTokens).map(([key, token]) => (
        <div key={key} className={styles.demoRow}>
          <div className={styles.paramsCol}>
            <Text use="body-s" style={{ fontFamily: 'Lab Grotesque', fontWeight: 'bold', color: '#2e3438' }}>
              {key}
            </Text>
            {Object.entries(token).map(([prop, val]) => {
              let displayVal = val;
              if (prop === 'font-weight') {
                const currentWeight = weight || 'regular';
                if (currentWeight === 'bold') {
                  displayVal = '700';
                } else if (currentWeight === 'medium') {
                  displayVal = '500';
                } else if (currentWeight === 'regular') {
                  displayVal = '400';
                }
              }
              return (
                <div key={prop}>
                  {prop}: {displayVal};
                </div>
              );
            })}
          </div>
          <Text as={(tag || 'span') as any} use={key as any} weight={(weight || 'regular') as any} reset={reset}>
            Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна и
            удобство работы с системой.
          </Text>
          <div
            className={styles.codeSnippet}
            onClick={() => {
              navigator.clipboard.writeText(getCode(key));
              SingleToast.push('Скопировано');
            }}
          >
            {getCode(key)}
          </div>
        </div>
      ))}
    </div>
  );
};
