import React from 'react';

import { Gapped } from '../../Gapped/Gapped.js';
import { MaskedInput } from '../MaskedInput.js';

export const DynamicMaskSection: React.FC<{
  updateMetaFromEvent: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}> = ({ updateMetaFromEvent }) => {
  const [mask, setMask] = React.useState<'99:99' | '99-99'>('99:99');
  const [value, setValue] = React.useState('12:34');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => setMask('99:99')}>
          mask 99:99
        </button>
        <button type="button" onClick={() => setMask('99-99')}>
          mask 99-99
        </button>
        <button type="button" onClick={() => setValue('12:34')}>
          set value 12:34
        </button>
      </div>

      <MaskedInput
        mask={mask}
        maskChar="_"
        alwaysShowMask
        value={value}
        onValueChange={setValue}
        onFocus={updateMetaFromEvent}
        onBlur={updateMetaFromEvent}
        onSelect={updateMetaFromEvent}
        onMouseUp={updateMetaFromEvent}
      />
    </div>
  );
};

export const DynamicMaskWithUnmaskSection: React.FC<{
  updateMetaFromEvent: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}> = ({ updateMetaFromEvent }) => {
  const [value, setValue] = React.useState('1234');
  const [selection, setSelection] = React.useState<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });
  const mask = value.includes('0') ? '99-99-99' : '99-99';

  const updateSelectionFromEvent = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      setSelection({
        start: e.currentTarget.selectionStart,
        end: e.currentTarget.selectionEnd,
      });
      updateMetaFromEvent(e);
    },
    [updateMetaFromEvent],
  );

  return (
    <Gapped vertical gap={8}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => setValue('1234')}>
          reset value to 1234
        </button>
        <div>
          active mask: <code>{mask}</code>
        </div>
      </div>

      <MaskedInput
        mask={mask}
        maskChar="_"
        value={value}
        onValueChange={setValue}
        unmask
        onFocus={updateSelectionFromEvent}
        onBlur={updateSelectionFromEvent}
        onKeyUp={updateSelectionFromEvent}
        onSelect={updateSelectionFromEvent}
        onMouseUp={updateSelectionFromEvent}
      />

      <div style={{ color: '#666', fontSize: 12 }}>
        value: <code>{value}</code>, selection: <code>{String(selection.start)}</code>..{' '}
        <code>{String(selection.end)}</code>
      </div>
    </Gapped>
  );
};
