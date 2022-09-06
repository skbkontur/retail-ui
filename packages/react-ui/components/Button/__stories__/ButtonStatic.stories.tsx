import React, { useContext, useState } from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonProps, ButtonStyle, ButtonUse } from '../Button';
import { css, keyframes } from '../../../lib/theming/Emotion';
import { Toggle } from '../../Toggle';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';

export default { title: 'Button/Static' } as Meta;

const baselineAnimation = keyframes`
  0% {
    border-bottom-color: red;
  }
  33% {
    border-bottom-color: green;
  }
  66% {
    border-bottom-color: white;
  }
  100% {
    border-bottom-color: red;
  }
`;

const tableClass = css`
  tr td:not(:first-child) {
    padding: 10px;
    vertical-align: middle;
    text-align: center;
  }

  thead td,
  tr td:first-child {
    white-space: pre-wrap;
    line-height: 10px;
    font-family: monospace;
  }

  td[colspan] {
    text-align: left !important;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 12px;
  }

  .baseline {
    position: absolute;
    border-bottom: solid 1px red;
    box-shadow: 1px 0 0 0 green;
    left: 0;
    width: 100%;
    z-index: 10;
    color: transparent;
    animation: ${baselineAnimation} 10s infinite;
    pointer-events: none;
  }
`;

const manuals: ButtonStyle[][] = [[], ['hover'], ['active'], ['focus'], ['hover', 'focus'], ['active', 'focus']];
const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay', 'link', 'text', 'backless'];

type Helper<V> = [V, (value: V) => void];
type Helpers = {
  background: Helper<string>;
  content: Helper<string>;
  withText: Helper<boolean>;
  hasBaseline: Helper<boolean>;
  baselineShift: Helper<number>;
};

const HelpersContext = React.createContext<Helpers>({
  background: ['', () => null],
  content: ['Текст', () => null],
  withText: [false, () => null],
  hasBaseline: [false, () => null],
  baselineShift: [0, () => null],
});

const Manual: React.FunctionComponent<{ use: ButtonUse; children: React.ReactElement }> = ({ use, children }) => {
  const {
    background: [background],
    content: [content],
    withText: [withText],
    hasBaseline: [hasBaseline],
    baselineShift: [baselineShift],
  } = useContext(HelpersContext);

  return (
    <tr>
      <td>
        {use}
        {hasBaseline && (
          <span className="baseline" style={{ marginTop: baselineShift }}>
            1
          </span>
        )}
      </td>
      {manuals.map((manual, i) => (
        <td key={i} style={{ background }}>
          {withText && <span>слева</span>}
          {React.cloneElement<ButtonProps>(children, {
            use,
            manual,
            children: content,
          })}
          {withText && <span>справа</span>}
        </td>
      ))}
    </tr>
  );
};

const Controls: React.FunctionComponent = () => {
  const {
    background: [background, setBackground],
    content: [content, setContent],
    withText: [withText, setWithText],
    hasBaseline: [hasBaseline, setHasBaseline],
    baselineShift: [baselineShift, setBaselineShift],
  } = useContext(HelpersContext);

  return (
    <Gapped vertical gap={20} style={{ margin: 10, padding: '20px 10px', background: '#eee' }}>
      <Gapped>
        <Input value={content} onValueChange={setContent} style={{ width: 100 }} />
        Содержимое
      </Gapped>
      <Gapped>
        <Input value={background} onValueChange={setBackground} style={{ width: 100 }} />
        Фон
      </Gapped>
      <Toggle checked={withText} onValueChange={setWithText}>
        Текст слева и справа
      </Toggle>
      <Gapped>
        <Toggle checked={hasBaseline} onValueChange={setHasBaseline}>
          Базовая линия
        </Toggle>
        {hasBaseline && (
          <Gapped style={{ position: 'absolute', marginTop: -20 }}>
            <Button onClick={() => setBaselineShift(baselineShift - 1)}>⬆</Button>
            {baselineShift}
            <Button onClick={() => setBaselineShift(baselineShift + 1)}>⬇</Button>
          </Gapped>
        )}
      </Gapped>
    </Gapped>
  );
};

const Table: React.FunctionComponent<{ button: React.ReactElement }> = ({ button }) => {
  return (
    <table id="screen" className={tableClass}>
      <thead>
        <tr>
          <td>
            <sub>use</sub>\<sup>acts</sup>
          </td>
          {manuals.map((states, i) => (
            <td key={i}>{states.join('\n + \n')}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {uses.map((use) => (
          <Manual key={use} use={use}>
            {button}
          </Manual>
        ))}
      </tbody>
    </table>
  );
};

const ManualActs: React.FunctionComponent<{ children: React.ReactElement }> = ({ children }) => {
  const helpers: Helpers = {
    background: useState<string>('#fff'),
    content: useState<string>('Текст'),
    withText: useState<boolean>(false),
    hasBaseline: useState<boolean>(false),
    baselineShift: useState<number>(0),
  };

  return (
    <div>
      <HelpersContext.Provider value={helpers}>
        <Table button={children} />
        <Controls />
      </HelpersContext.Provider>
    </div>
  );
};

export const Default: Story = () => (
  <ManualActs>
    <Button
      use="link"
      theme={{
        btnLinkLineBorderBottomColor: 'red',
        btnLinkHoverLineBorderBottomColor: 'blue',
        btnLinkActiveLineBorderBottomColor: 'green',
      }}
    />
  </ManualActs>
);

export const Borderless: Story = () => (
  <ManualActs>
    <Button borderless />
  </ManualActs>
);

export const Checked: Story = () => (
  <ManualActs>
    <Button checked />
  </ManualActs>
);

export const Disabled: Story = () => (
  <ManualActs>
    <Button disabled />
  </ManualActs>
);

export const Arrow: Story = () => (
  <ManualActs>
    <Button arrow />
  </ManualActs>
);

export const ArrowLeft: Story = () => (
  <ManualActs>
    <Button arrow="left" />
  </ManualActs>
);

export const BorderlessAndArrow: Story = () => (
  <ManualActs>
    <Button borderless arrow />
  </ManualActs>
);

export const BorderlessAndArrowLeft: Story = () => (
  <ManualActs>
    <Button borderless arrow="left" />
  </ManualActs>
);

export const Icon: Story = () => (
  <ManualActs>
    <Button icon={<Ok />} />
  </ManualActs>
);

export const IconAndDisabled: Story = () => (
  <ManualActs>
    <Button icon={<Ok />} disabled />
  </ManualActs>
);

export const Medium: Story = () => (
  <ManualActs>
    <Button size="medium" />
  </ManualActs>
);

export const MediumAndArrow: Story = () => (
  <ManualActs>
    <Button size="medium" arrow />
  </ManualActs>
);

export const MediumAndArrowLeft: Story = () => (
  <ManualActs>
    <Button size="medium" arrow="left" />
  </ManualActs>
);

export const Large: Story = () => (
  <ManualActs>
    <Button size="large" />
  </ManualActs>
);

export const LargeAndArrow: Story = () => (
  <ManualActs>
    <Button size="large" arrow />
  </ManualActs>
);

export const LargeAndArrowLeft: Story = () => (
  <ManualActs>
    <Button size="large" arrow="left" />
  </ManualActs>
);
