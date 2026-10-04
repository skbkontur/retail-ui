import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { SidePage } from '@skbkontur/react-ui/components/SidePage/SidePage';
import type { Meta } from '@storybook/react';
import React from 'react';

import { ValidationContainer, ValidationWrapper, tooltip } from '../index.js';
import type { ValidationInfo } from '../index.js';

const meta: Meta = {
  title: 'SidePageWithStickyFooter',
};

export default meta;

const validationInfo: ValidationInfo = { message: 'Ошибка!', type: 'submit' };

export const ValidationTooltip = () => {
  const validationContainerRef = React.useRef<ValidationContainer>(null);

  return (
    <ValidationContainer ref={validationContainerRef}>
      <SidePage blockBackground disableAnimations ignoreOutsideClick>
        <SidePage.Header>Sticky footer validation</SidePage.Header>
        <SidePage.Body>
          <SidePage.Container>
            <div style={{ height: 700 }} />
            <ValidationWrapper renderMessage={tooltip('top center')} validationInfo={validationInfo}>
              <Input data-tid="validation-input" />
            </ValidationWrapper>
            <div style={{ height: 700 }} />
          </SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer sticky panel>
          <Button data-tid="submit" use="accent" onClick={() => validationContainerRef.current?.submit()}>
            Submit
          </Button>
        </SidePage.Footer>
      </SidePage>
    </ValidationContainer>
  );
};
