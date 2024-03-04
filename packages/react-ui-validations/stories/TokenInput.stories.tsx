import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { Token } from '@skbkontur/react-ui/components/Token';
import { TokenInput } from '@skbkontur/react-ui/components/TokenInput';

import { ValidationContainer, ValidationInfo, ValidationWrapper, tooltip } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'TokenInput',
} as Meta;

export const Required = () => {
  const TokenInputStory = () => {
    const [checked] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const validate = (): Nullable<ValidationInfo> => {
      if (checked === false) {
        return { message: 'Поле обязательно', type: 'immediate' };
      }
      return null;
    };

    const refContainer = useRef<ValidationContainer>(null);

    return (
      <div style={{ padding: '10px' }}>
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

  return <TokenInputStory />;
};

async function getItems(query: string) {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}
