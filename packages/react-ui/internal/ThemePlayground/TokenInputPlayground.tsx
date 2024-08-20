import React from 'react';

import { TokenInput } from '../../components/TokenInput';
import { Token } from '../../components/Token';

async function getItems(query: string) {
  return Promise.resolve(
    ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
      (x) => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query,
    ),
  ).then((res: string[]) => new Promise<string[]>((resolve) => setTimeout(resolve.bind(null, res), 500)));
}

interface TokenInputPlaygroundState {
  selectedItems: string[];
}
export class TokenInputPlayground extends React.Component {
  public state: TokenInputPlaygroundState = { selectedItems: ['First', 'Second'] };

  public render() {
    return (
      <TokenInput
        getItems={getItems}
        selectedItems={this.state.selectedItems}
        renderToken={(item, { isActive, onClick, onRemove }) => (
          <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove}>
            {item}
          </Token>
        )}
        onValueChange={(itemsNew) => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}
