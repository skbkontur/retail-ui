import React from 'react';

import { Token } from '../../components/Token/index.js';
import { TokenInput } from '../../components/TokenInput/index.js';

const colors = ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'];

async function getItems(query: string) {
  return Promise.resolve(
    colors.filter((x) => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query),
  ).then((res: string[]) => new Promise<string[]>((resolve) => setTimeout(resolve.bind(null, res), 500)));
}

interface TokenInputPlaygroundState {
  selectedItems: string[];
}
export class TokenInputPlayground extends React.Component {
  public state: TokenInputPlaygroundState = { selectedItems: ['Красный', 'Синий'] };

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
