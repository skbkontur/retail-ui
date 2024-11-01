import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Token } from '@skbkontur/react-ui/components/Token';
import { TokenInput } from '@skbkontur/react-ui/components/TokenInput';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper, tooltip } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'TokenInput',
} as Meta;

export const Required = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [checked] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const validate = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'immediate' };
    }
    return null;
  };

  return (
    <div style={{ padding: 10 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('right middle')}>
          <TokenInput
            getItems={getItems}
            selectedItems={selectedItems}
            onValueChange={setSelectedItems}
            renderToken={(item, { isActive, onClick, onRemove }) => (
              <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove}>
                {item}
              </Token>
            )}
          />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

async function getItems(query: string) {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}
