import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle';
import type { Meta } from '@storybook/react';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';

import type { TooltipExtendedPosition, ValidationInfo } from '../index.js';
import { tooltip, ValidationContainer, ValidationWrapper, ValidationsFeatureFlagsContext } from '../index.js';
import type { Story } from '../typings/stories.js';

const meta: Meta = {
  title: 'ValidationWrapper/Tooltip positions',
};

export default meta;

interface TooltipCaseGroup {
  title: string;
  description: string;
  positions: TooltipExtendedPosition[];
  tone: 'flag' | 'ok';
}

const tooltipCaseGroups: TooltipCaseGroup[] = [
  {
    title: '1. Short и middle позиции Tooltip',
    description:
      'Совпадают с Tooltip.pos. Без флага validationTooltipExtendedPositions — dev warning; с флагом — без warning.',
    positions: ['top', 'left', 'right', 'bottom', 'middle center', 'middle left', 'middle right'],
    tone: 'flag',
  },
  {
    title: '2. Left/right full позиции',
    description: 'Полные left/right позиции. После фикса в PopupPin — без runtime warning.',
    positions: ['left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'],
    tone: 'ok',
  },
  {
    title: 'Контрольная группа: top/bottom full позиции',
    description: 'Стандартные TooltipPosition — работают без флага.',
    positions: ['top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right'],
    tone: 'ok',
  },
];

const pageStyle: CSSProperties = {
  fontFamily: 'sans-serif',
  padding: 24,
};

const groupsStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 16,
};

const labelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 12,
  borderRadius: 8,
  border: '1px solid #ddd',
};

const labelHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  fontSize: 12,
};

const toneStyles: Record<TooltipCaseGroup['tone'], CSSProperties> = {
  flag: { backgroundColor: '#fff8e6', borderColor: '#e6c200' },
  ok: { backgroundColor: '#eefaf0', borderColor: '#3aa655' },
};

const toneLabels: Record<TooltipCaseGroup['tone'], string> = {
  flag: 'flag',
  ok: 'ok',
};

const togglePanelStyle: CSSProperties = {
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: '1px solid #e2e7eb',
};

const getRenderMessage = (pos: TooltipExtendedPosition) => tooltip(pos);

const TooltipPositionsFields = () => {
  const [value, setValue] = useState('abc');

  const validationInfo: ValidationInfo | null = /^\d*$/.test(value)
    ? null
    : {
        message: 'Только цифры',
        type: 'immediate',
      };

  return (
    <div className="groups" style={groupsStyle}>
      {tooltipCaseGroups.map((group) => (
        <section key={group.title}>
          <header style={{ marginBottom: 12 }}>
            <h2 style={{ margin: '0 0 8px' }}>{group.title}</h2>
            <p style={{ margin: 0 }}>{group.description}</p>
          </header>

          <div style={gridStyle}>
            {group.positions.map((pos) => (
              <label key={pos} style={{ ...labelStyle, ...toneStyles[group.tone] }}>
                <span style={labelHeaderStyle}>
                  <code>{pos}</code>
                  <b>{toneLabels[group.tone]}</b>
                </span>
                <ValidationWrapper validationInfo={validationInfo} renderMessage={getRenderMessage(pos)}>
                  <Input placeholder="Только цифры" value={value} width="100%" onValueChange={setValue} />
                </ValidationWrapper>
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export const TooltipPositions: Story = () => {
  const [extendedPositionsEnabled, setExtendedPositionsEnabled] = useState(false);

  return (
    <ValidationsFeatureFlagsContext.Provider value={{ validationTooltipExtendedPositions: extendedPositionsEnabled }}>
      <ValidationContainer>
        <main style={pageStyle}>
          <div style={togglePanelStyle}>
            <Toggle checked={extendedPositionsEnabled} onValueChange={setExtendedPositionsEnabled}>
              validationTooltipExtendedPositions: {extendedPositionsEnabled ? 'включён' : 'выключен'}
            </Toggle>
          </div>

          <h1 style={{ marginTop: 0 }}>ValidationWrapper tooltip positions</h1>
          <p>
            {extendedPositionsEnabled
              ? 'Флаг включён: все позиции из трёх групп должны работать без dev warning.'
              : 'Флаг выключен: откройте DevTools и наведите/сфокусируйте поля — группа 1 даёт dev warning, группы 2–3 без warning.'}
          </p>

          <TooltipPositionsFields />
        </main>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>
  );
};
TooltipPositions.storyName = 'Tooltip positions';
TooltipPositions.parameters = {
  creevey: {
    skip: true,
  },
};
