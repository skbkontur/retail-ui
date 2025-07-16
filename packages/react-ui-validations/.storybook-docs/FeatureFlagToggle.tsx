import React from 'react';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

interface FeatureFlagToggleProps {
  isFlagEnabled: boolean;
  setIsFlagEnabled: (state: boolean) => void;
}

export function FeatureFlagToggle({ isFlagEnabled: checked, setIsFlagEnabled: onValueChange }: FeatureFlagToggleProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ paddingBottom: 18 }}>
        <Toggle checked={checked} onValueChange={onValueChange}>
          Фича-флаг {checked ? 'включен' : 'выключен'}
        </Toggle>
      </div>
      <div style={{ background: '#E2E7EB', height: 1, width: '100%', boxShadow: '50px 0 #E2E7EB, -50px 0 #E2E7EB' }} />
    </div>
  );
}
