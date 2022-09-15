import React, { useContext, useState } from 'react';

import { css, keyframes } from '../../lib/theming/Emotion';
import { Button } from '../../components/Button';
import { Gapped } from '../../components/Gapped';
import { Input } from '../../components/Input';
import { Toggle } from '../../components/Toggle';

import { FakeUserActions, FakeUserAction } from './FakeUserActions';

type Helper<V> = [V, (value: V) => void];

interface Helpers {
  background: Helper<string>;
  textLeft: Helper<string>;
  textRight: Helper<string>;
  withText: Helper<boolean>;
  hasBaseline: Helper<boolean>;
  baselineShift: Helper<number>;
}

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

const userActsSets: FakeUserAction[][] = [
  [],
  ['hover'],
  ['active'],
  ['focus'],
  ['hover', 'focus'],
  ['active', 'focus'],
];

const HelpersContext = React.createContext<Helpers>({
  background: ['', () => null],
  textLeft: ['Слева', () => null],
  textRight: ['Справа', () => null],
  withText: [false, () => null],
  hasBaseline: [false, () => null],
  baselineShift: [0, () => null],
});

const Controls: React.FunctionComponent = () => {
  const {
    background: [background, setBackground],
    textLeft: [textLeft, setTextLeft],
    textRight: [textRight, setTextRight],
    withText: [withText, setWithText],
    hasBaseline: [hasBaseline, setHasBaseline],
    baselineShift: [baselineShift, setBaselineShift],
  } = useContext(HelpersContext);

  return (
    <Gapped vertical gap={20} style={{ margin: 10, padding: '20px 10px', background: '#eee' }}>
      <Gapped>
        <Input
          value={background}
          onValueChange={setBackground}
          style={{ width: 120 }}
          rightIcon={
            <input
              style={{ width: 20, height: 20 }}
              type="color"
              value={background}
              onChange={(e) => setBackground(e.currentTarget.value)}
            />
          }
        />
        Фон
      </Gapped>
      <Gapped>
        <Toggle checked={withText} onValueChange={setWithText}>
          Текст
        </Toggle>
        <Gapped style={{ position: 'absolute', marginTop: -20 }}>
          <Input value={textLeft} onValueChange={setTextLeft} width={70} disabled={!withText} />
          <span> и </span>
          <Input value={textRight} onValueChange={setTextRight} width={70} disabled={!withText} />
        </Gapped>
      </Gapped>
      <Gapped>
        <Toggle checked={hasBaseline} onValueChange={setHasBaseline}>
          Базовая линия
        </Toggle>
        <Gapped style={{ position: 'absolute', marginTop: -20 }}>
          <Button onClick={() => setBaselineShift(baselineShift - 1)} disabled={!hasBaseline}>
            ⬆
          </Button>
          {baselineShift}
          <Button onClick={() => setBaselineShift(baselineShift + 1)} disabled={!hasBaseline}>
            ⬇
          </Button>
        </Gapped>
      </Gapped>
    </Gapped>
  );
};

const ManualRow: React.FunctionComponent<{
  children: React.ReactElement;
  propName?: string;
  propValue?: unknown;
}> = ({ children, propName, propValue }) => {
  const {
    background: [background],
    textLeft: [textLeft],
    textRight: [textRight],
    withText: [withText],
    hasBaseline: [hasBaseline],
    baselineShift: [baselineShift],
  } = useContext(HelpersContext);

  return (
    <tr>
      <td>
        {propValue}
        {hasBaseline && (
          <span className="baseline" style={{ marginTop: baselineShift }}>
            1
          </span>
        )}
      </td>
      {userActsSets.map((_userActs, i) => (
        <td key={i} style={{ background }}>
          {withText && <span>{textLeft}</span>}
          <FakeUserActions acts={_userActs}>
            {React.cloneElement(children, {
              // children: 'Текст',
              ...(propName ? { [propName]: propValue } : {}),
            })}
          </FakeUserActions>
          {withText && <span>{textRight}</span>}
        </td>
      ))}
    </tr>
  );
};

const Table: React.FunctionComponent<{
  children: React.ReactElement;
  propName?: string;
  propValues?: unknown[];
}> = ({ children, propName = '', propValues = [] }) => {
  return (
    <table id="FakeUserActionsTable" className={tableClass}>
      <thead>
        <tr>
          <td>
            <sub>{propName}</sub>\<sup>style</sup>
          </td>
          {userActsSets.map((_userActs, i) => (
            <td key={i}>{_userActs.join('\n + \n')}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        <ManualRow>{children}</ManualRow>
        {propValues.map((value, index) => (
          <ManualRow key={index} propName={propName} propValue={value}>
            {children}
          </ManualRow>
        ))}
      </tbody>
    </table>
  );
};

export const FakeUserActionsTable: React.FunctionComponent<{
  children: React.ReactElement;
  propName?: string;
  propValues?: unknown[];
}> = ({ children, propName, propValues }) => {
  const helpers: Helpers = {
    background: useState<string>('#fff'),
    textLeft: useState<string>('Слева'),
    textRight: useState<string>('Справа'),
    withText: useState<boolean>(false),
    hasBaseline: useState<boolean>(false),
    baselineShift: useState<number>(0),
  };

  return (
    <div>
      <HelpersContext.Provider value={helpers}>
        <Table propName={propName} propValues={propValues}>
          {children}
        </Table>
        <Controls />
      </HelpersContext.Provider>
    </div>
  );
};
