import React from 'react';

import { Heading } from '../Heading.js';
import { Text } from '../Text.js';
import { bodyTokens, headingTokens } from '../tokens.js';

import styles from './colors.module.css';

// oxlint-disable-next-line import/no-default-export
export default {
  title: 'Typography',
};

const headingText = 'Заголовок';
const bodyText =
  'Интерфейсы во многом состоят из текста, и от того как набран этот текст, зависит общее восприятие дизайна и удобство работы с системой.';

const itemStyle = { margin: '16px 0' };
const labelStyle = { fontSize: '12px', color: '#666', marginBottom: '4px' };
const boxStyle = { border: '1px solid black' };

export const AllStyles = () => (
  <div style={{ padding: '16px' }}>
    <h2>Heading</h2>
    {Object.keys(headingTokens).map((key) => (
      <div key={key} style={itemStyle}>
        <div style={labelStyle}>
          {key} ({headingTokens[key as keyof typeof headingTokens]['font-size']})
        </div>
        <div style={boxStyle}>
          <Heading use={key as any}>{headingText}</Heading>
        </div>
      </div>
    ))}

    <h2 style={{ marginTop: '40px' }}>Body</h2>
    {Object.keys(bodyTokens).map((key) => (
      <div key={key} style={itemStyle}>
        <div style={labelStyle}>
          {key} ({bodyTokens[key as keyof typeof bodyTokens]['font-size']})
        </div>
        <div style={boxStyle}>
          <Text use={key as any}>{bodyText}</Text>
        </div>
      </div>
    ))}
  </div>
);

export const Weight = () => (
  <div style={{ padding: '16px' }}>
    <h2>Custom weights</h2>
    {(['regular', 'medium', 'bold'] as const).map((weight) => (
      <div key={weight} style={itemStyle}>
        <div style={labelStyle}>body-m ({weight})</div>
        <div style={boxStyle}>
          <Text use="body-m" weight={weight}>
            {headingText}
          </Text>
        </div>
      </div>
    ))}
  </div>
);

export const Reset = () => (
  <div style={{ padding: '16px' }}>
    <h2>Reset</h2>

    <h3>Heading (as=h2)</h3>

    <div style={itemStyle}>
      <div style={labelStyle}>With reset (Default / true)</div>
      <div style={{ ...boxStyle }}>
        <Heading as="h2" use="heading-m">
          {headingText}
        </Heading>
      </div>
    </div>

    <div style={itemStyle}>
      <div style={labelStyle}>Without reset (reset=false)</div>
      <div style={{ ...boxStyle }}>
        <Heading as="h2" use="heading-m" reset={false}>
          {headingText}
        </Heading>
      </div>
    </div>

    <h3>Text (as=p)</h3>

    <div style={itemStyle}>
      <div style={labelStyle}>With reset (Default / true)</div>
      <div style={{ ...boxStyle }}>
        <Text as="p" use="body-m">
          {headingText}
        </Text>
      </div>
    </div>

    <div style={itemStyle}>
      <div style={labelStyle}>Without reset (reset=false)</div>
      <div style={{ ...boxStyle }}>
        <Text as="p" use="body-m" reset={false}>
          {headingText}
        </Text>
      </div>
    </div>
  </div>
);

export const CustomStyles = () => (
  <div style={{ padding: '16px' }}>
    <h2>Custom styles</h2>
    <div style={itemStyle}>
      <div style={labelStyle}>with custom style</div>
      <div style={boxStyle}>
        <Text use="body-m" style={{ color: 'blue' }}>
          {headingText}
        </Text>
      </div>
    </div>

    <div style={itemStyle}>
      <div style={labelStyle}>with custom className</div>
      <div style={boxStyle}>
        <Text use="body-m" className={styles.red}>
          {bodyText}
        </Text>
      </div>
    </div>
  </div>
);
