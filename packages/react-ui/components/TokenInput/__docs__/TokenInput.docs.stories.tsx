import React from 'react';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
import { TokenInput, Token } from '@skbkontur/react-ui';
import { cities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/cities';

import type { Meta, Story } from '../../../typings/stories';

const meta: Meta = {
  title: 'Input data/TokenInput/TokenInput',
  component: TokenInput,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Example1: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const delay =
    (time: number) =>
    (args?: string[]): Promise<string[]> =>
      new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q: string): Promise<string[]> =>
    Promise.resolve(
      ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  return (
    <div style={{ width: '300px' }}>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
        renderToken={(item, tokenProps) => (
          <Token key={item} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </div>
  );
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const delay =
    (time: number) =>
    (args?: string[]): Promise<string[]> =>
      new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q: string): Promise<string[]> =>
    Promise.resolve(
      ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  return (
    <div style={{ width: '300px' }}>
      <TokenInput size={'small'} getItems={getItems} selectedItems={selectedItems} onValueChange={setSelectedItems} />
      <TokenInput size={'medium'} getItems={getItems} selectedItems={selectedItems} onValueChange={setSelectedItems} />
      <TokenInput size={'large'} getItems={getItems} selectedItems={selectedItems} onValueChange={setSelectedItems} />
    </div>
  );
};
Example2.storyName = 'Размер';

export const Example3: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(['aaa', 'bbb', 'ccc']);

  async function getItems(query: string): Promise<string[]> {
    return ['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query));
  }

  return (
    <TokenInput
      disabled
      type={TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      renderToken={(item, tokenProps) => (
        <Token key={item} {...tokenProps} disabled={item === 'bbb' || tokenProps.disabled}>
          {item}
        </Token>
      )}
    />
  );
};
Example3.storyName = 'Заблокированный TokenInput с кастомными Token';

export const Example4: Story = () => {
  const delay =
    (time: number) =>
    (args?: string[]): Promise<string[]> =>
      new Promise((resolve) => setTimeout(resolve, time, args));
  const maxItems = 5;

  const [totalCount, setTotalCount] = React.useState(cities.length);
  const [value, setValue] = React.useState<string[]>([]);

  const getItems = (query: string): Promise<string[]> => {
    const items = cities
      .map((x) => x.City)
      .filter((x) => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query);
    const result = items.slice(0, maxItems);
    setTotalCount(items.length);

    return Promise.resolve(result).then(delay(500));
  };

  const renderTotalCount = (foundCount: number, totalCount: number) => (
    <span>
      Показано {foundCount} из {totalCount} найденных городов
    </span>
  );

  return (
    <div style={{ width: '300px' }}>
      <TokenInput
        type={TokenInputType.Combined}
        selectedItems={value}
        onValueChange={setValue}
        getItems={getItems}
        placeholder="Начните вводить название"
        renderTotalCount={renderTotalCount}
        totalCount={totalCount}
      />
    </div>
  );
};
Example4.storyName = 'Ограничение количества токенов в выпадающем списке';

export const Example5: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState<Array<{ id: string; value: string }>>([]);

  const delay = (time: number) => (args?: unknown) => new Promise((resolve) => setTimeout(resolve, time, args));
  const getGenericItems = (): Array<{ id: string; value: string }> => [
    { id: '111', value: 'aaa' },
    { id: '222', value: 'bbb' },
    { id: '333', value: 'ccc' },
    { id: '444', value: 'ddd' },
  ];
  const renderItem = (item: { id: string; value: string }) => item.value;
  const renderValue = (value: { id: string; value: string }) => value.value;
  const valueToItem = (item: string) => ({
    id: Math.random().toString(),
    value: item,
  });
  const getModelItems = async (query: string): Promise<Array<{ id: string; value: string }>> => {
    await delay(400);
    return getGenericItems().filter((s) => s.value.includes(query));
  };

  return (
    <div style={{ width: '300px' }}>
      <TokenInput
        selectedItems={selectedItems}
        renderItem={renderItem}
        renderValue={renderValue}
        valueToItem={valueToItem}
        valueToString={renderValue}
        getItems={getModelItems}
        onValueChange={setSelectedItems}
        placeholder="placeholder"
        type={TokenInputType.Combined}
        renderToken={(item, tokenProps) => (
          <Token key={item.id} {...tokenProps}>
            {item.value}
          </Token>
        )}
      />
    </div>
  );
};
Example5.storyName = 'Кастомный тип элементов меню';

/** Функция debounce из lodash некорректно работает с async/promise, поэтому лучше использовать кастомную функцию, как в примере ниже. */
export const Example6: Story = () => {
  const [value, setValue] = React.useState<string[]>([]);

  function debounceAsync<T extends (...args: string[]) => Promise<string[]>>(callback: T, wait: number): T {
    let timeoutId: NodeJS.Timeout | null = null;

    return ((...args: string[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      return new Promise((resolve) => {
        const timeoutPromise = new Promise((resolve) => {
          timeoutId = setTimeout(resolve, wait);
        });
        timeoutPromise.then(async () => {
          resolve(await callback(...args));
        });
      });
    }) as T;
  }

  const items = ['kon', 'kod', 'kof', 'kor', 'kos'];

  const getItems = async (query: string): Promise<string[]> => {
    console.log('query: ', query);
    return items.filter((item) => item.includes(query));
  };

  return (
    <TokenInput
      style={{ width: '300px' }}
      type={TokenInputType.Combined}
      selectedItems={value}
      onValueChange={setValue}
      getItems={debounceAsync(getItems, 300)}
      placeholder="Начните вводить название"
    />
  );
};
Example6.storyName = 'Дебаунс функции getItems';

export const Example7: Story = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const tokenInputRef = React.useRef<TokenInput>(null);

  const items = ['kon', 'kod', 'kof', 'kor', 'kos'];

  const getItems = (query: string) => {
    return Promise.resolve(items.filter((item) => item.includes(query)));
  };

  return (
    <TokenInput<string>
      ref={tokenInputRef}
      selectedItems={value}
      onValueChange={setValue}
      getItems={getItems}
      placeholder="Цифра 2 запрещена"
      onKeyDown={(e) => {
        if (e.key === '2') {
          e.preventDefault();
          tokenInputRef.current?.blink();
        }
      }}
    />
  );
};
Example7.storyName = 'Запрет ввода определённых символов';
