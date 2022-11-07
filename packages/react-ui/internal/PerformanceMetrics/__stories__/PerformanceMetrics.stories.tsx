import React from 'react';

import { PerformanceMetrics } from '../PerformanceMetrics';
import { Input } from '../../../components/Input';
import { Tooltip } from '../../../components/Tooltip';

function getTooltipContent() {
  return 'Tooltip content';
}
const INPUTS_COUNT = 150;
const INPUT_WIDTH = 50;
const DUMMY = new Array(INPUTS_COUNT).fill('');
const WRAPPER_STYLES = { marginRight: 10, marginBottom: 10, display: 'inline-block' };

const inputs = (
  <div>
    {DUMMY.map((i, index) => (
      <div key={index} style={WRAPPER_STYLES}>
        <Input width={INPUT_WIDTH} />
      </div>
    ))}
  </div>
);

const inputsWithTooltip = (
  <div>
    {DUMMY.map((i, index) => (
      <div key={index} style={WRAPPER_STYLES}>
        <Tooltip trigger={'hover'} render={getTooltipContent}>
          <Input width={INPUT_WIDTH} />
        </Tooltip>
      </div>
    ))}
  </div>
);

export default { title: 'PerformanceMetrics', parameters: { creevey: { skip: [true] } } };

export const BareInputsVsTooltipInput = () => {
  return (
    <div>
      <PerformanceMetrics componentsA={inputs} componentsB={inputsWithTooltip} />
    </div>
  );
};
BareInputsVsTooltipInput.storyName = 'Bare Inputs vs Tooltip+Input';
