import React from 'react';
import { Token } from '@skbkontur/react-ui/components/Token';
import { TokenInput } from '@skbkontur/react-ui/components/TokenInput';
import { CSFStory } from 'creevey';

import { tooltip, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

async function getItems(query: string) {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}

export default { title: `TokenInput` };

export const TokenInputStory: CSFStory<JSX.Element> = () => {
  const [checked] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [, refContainer] = React.useState<ValidationContainer | null>(null);

  const validate = (): Nullable<ValidationInfo> => {
    if (checked) {
      return { message: 'Поле обязательно', type: 'immediate' };
    }
    return null;
  };
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
