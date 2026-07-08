import { Input } from '@skbkontur/react-ui/components/Input/Input';
import React from 'react';

import { ValidationContainer, ValidationWrapper, ValidationsFeatureFlagsContext, tooltip } from '../../../../index.js';
import type { ValidationInfo } from '../../../../index.js';
import type { Meta, Story } from '../../../../typings/stories.js';
import type { Nullable } from '../../../../typings/Types.js';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExtendedTooltipPositions: Story = () => {
  const [value, setValue] = React.useState('abc');

  const validate = (): Nullable<ValidationInfo> => {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'immediate' };
    }
    return null;
  };

  return (
    <ValidationsFeatureFlagsContext.Provider value={{ validationTooltipExtendedPositions: true }}>
      <ValidationContainer>
        <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('top')}>
          <Input placeholder="Только цифры" value={value} width={240} onValueChange={setValue} />
        </ValidationWrapper>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>
  );
};
