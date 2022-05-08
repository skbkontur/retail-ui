import { storiesOf } from '@storybook/react';
import React from 'react';
import { Token } from '@skbkontur/react-ui/components/Token';
import { TokenInput, TokenInputProps } from '@skbkontur/react-ui/components/TokenInput';

import { ValidationContainer, ValidationInfo, ValidationWrapper, tooltip } from '../src';
import { Nullable } from '../typings/Types';

storiesOf('TokenInput', module).add('required', () => <TokenInputStory />);

async function getItems(query: string) {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}

type TokenInputStoryState = {
  checked: boolean;
} & Pick<TokenInputProps<string>, 'selectedItems'>;
class TokenInputStory extends React.Component {
  public state: TokenInputStoryState = {
    checked: false,
    selectedItems: [],
  };

  private container: ValidationContainer | null = null;

  public validate(): Nullable<ValidationInfo> {
    const { checked } = this.state;
    if (checked === false) {
      return { message: 'Поле обязательно', type: 'immediate' };
    }
    return null;
  }

  public render() {
    return (
      <div style={{ padding: '10px' }}>
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validate()} renderMessage={tooltip('right middle')}>
            <TokenInput
              getItems={getItems}
              selectedItems={this.state.selectedItems}
              onValueChange={(itemsNew) => this.setState({ selectedItems: itemsNew })}
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
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
