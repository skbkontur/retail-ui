import React from 'react';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
import { TokenInput, Token } from '@skbkontur/react-ui';
import { cities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/cities';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/TokenInput/TokenInput',
  component: TokenInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
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
          <Token key={item.toString()} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </div>
  );
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
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
  const [selectedItems, setSelectedItems] = React.useState(['aaa', 'bbb', 'ccc']);

  async function getItems(query) {
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
        <Token key={item.toString()} {...tokenProps} disabled={item === 'bbb' || tokenProps.disabled}>
          {item}
        </Token>
      )}
    />
  );
};
Example3.storyName = 'Заблокированный TokenInput с кастомными Token';

export const Example4: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));
  const maxItems = 5;

  const [totalCount, setTotalCount] = React.useState(cities.length);
  const [value, setValue] = React.useState([]);

  const getItems = (query) => {
    const items = cities
      .map((x) => x.City)
      .filter((x) => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query);
    const result = items.slice(0, maxItems);
    setTotalCount(items.length);

    return Promise.resolve(result).then(delay(500));
  };

  const renderTotalCount = (foundCount, totalCount) => (
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
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));
  const getGenericItems = () => [
    { id: '111', value: 'aaa' },
    { id: '222', value: 'bbb' },
    { id: '333', value: 'ccc' },
    { id: '444', value: 'ddd' },
  ];
  const renderItem = (item) => item.value;
  const renderValue = (value) => value.value;
  const valueToItem = (item) => ({
    value: item,
  });
  const getModelItems = async (query) => {
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
  const [value, setValue] = React.useState([]);

  function debounceAsync(callback, wait) {
    let timeoutId = null;

    return (...args) => {
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
    };
  }

  const items = ['kon', 'kod', 'kof', 'kor', 'kos'];

  const getItems = async (query) => {
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
