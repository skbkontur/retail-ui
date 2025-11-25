import React from 'react';
import { ReactUIFeatureFlagsContext, Textarea } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import { FeatureFlagToggle } from '../../FeatureFlagToggle';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Пустая история нужна, чтобы страница нормально собиралась */
export const Default: Story = () => {
  return <div />;
};

export const TextareaBaselineAlign: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  return (
    <div>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ textareaBaselineAlign: isFlagEnabled }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <label htmlFor="bat">Baseline align text</label>
          <Textarea id="bat" value="Textarea baseline align" size="large" />
        </div>
      </ReactUIFeatureFlagsContext.Provider>
    </div>
  );
};
