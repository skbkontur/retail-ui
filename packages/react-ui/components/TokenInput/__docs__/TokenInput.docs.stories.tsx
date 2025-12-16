import React from 'react';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
import { TokenInput, Token, Gapped } from '@skbkontur/react-ui';
import { cities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/cities';

import { LocaleContext } from '../../../lib/locale';
import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/TokenInput/TokenInput',
  component: TokenInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['Красный', 'Синий']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  return (
    <TokenInput
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      placeholder="Выберите или введите значения"
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  );
};

/** Проп `size` задаёт размер поля с токенами. */
export const ExampleSize: Story = () => {
  const [selectedItemsSmall, setSelectedItemsSmall] = React.useState(['Маленький']);
  const [selectedItemsMedium, setSelectedItemsMedium] = React.useState(['Средний']);
  const [selectedItemsLarge, setSelectedItemsLarge] = React.useState(['Большой']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Маленький', 'Средний', 'Большой'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <Gapped vertical>
      <TokenInput
        size={'small'}
        placeholder="Введите значение"
        getItems={getItems}
        selectedItems={selectedItemsSmall}
        onValueChange={setSelectedItemsSmall}
      />
      <TokenInput
        size={'medium'}
        placeholder="Введите значение"
        getItems={getItems}
        selectedItems={selectedItemsMedium}
        onValueChange={setSelectedItemsMedium}
      />
      <TokenInput
        size={'large'}
        placeholder="Введите значение"
        getItems={getItems}
        selectedItems={selectedItemsLarge}
        onValueChange={setSelectedItemsLarge}
      />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт ширину поля с токенами. */
export const ExampleWidth: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <TokenInput
      width={'350px'}
      placeholder="Введите значения через запятую"
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
    />
  );
};
ExampleWidth.storyName = 'Ширина поля с токенами';

/** Проп `menuWidth` задаёт максимальную ширину выпадающего списка. Может быть `auto` — по ширине текста, в пикселях, процентах от ширины поля и других конкретных единицах.
 *
 * Проп зависит от другого пропа `menuAlign`. Ширина выпадающего списка всегда будет равна `"auto"`, когда  'menuAlign'='cursor' — для поля с токенами является значением по умолчанию. */
export const ExampleMenuWidth: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <Gapped vertical>
      <TokenInput
        placeholder="Введите значение"
        menuWidth="auto"
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
      />
      <TokenInput
        placeholder="Введите значение"
        menuAlign="left"
        menuWidth={'200px'}
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
      />
      <TokenInput
        placeholder="Введите значение"
        menuAlign="left"
        menuWidth={'120%'}
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
      />
    </Gapped>
  );
};
ExampleMenuWidth.storyName = 'Ширина выпадающего списка';

/** Проп `maxMenuHeight` задаёт максимальную высоту выпадающего списка. */
export const ExampleMaхMenuHeight: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <TokenInput
      placeholder="Введите значение"
      maxMenuHeight={'100px'}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
    />
  );
};
ExampleMaхMenuHeight.storyName = 'Высота выпадающего списка';

/** Проп `menuAlign` выравнивает выпадающий список. По умолчанию `cursor` — выпадающий список отображается по линии текущего положения курсора в поле с токенами. Можно закрепить строго по левому краю через значение `"left"`. */
export const ExampleMenuAlign: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['Красный']);
  const [selectedItemsLeft, setSelectedItemsLeft] = React.useState(['Красный']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <Gapped vertical>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          menuAlign="cursor"
          getItems={getItems}
          selectedItems={selectedItems}
          onValueChange={setSelectedItems}
        />
        <span>menuAlign="cursor"</span>
      </Gapped>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          menuAlign="left"
          getItems={getItems}
          selectedItems={selectedItemsLeft}
          onValueChange={setSelectedItemsLeft}
        />
        <span>menuAlign="left"</span>
      </Gapped>
    </Gapped>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание выпадающего списка';

/** По умолчанию выпадающий список с подсказками появляется сразу при фокусе в поле и продолжает отображаться всё время, пока пользователь вводит в поле токены.
 *
 * Проп `hideMenuIfEmptyInputValue` отключает это поведение. Такой режим похож на работу [автокомплита](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_input-data-autocomplete--docs). Выпадающий список появляется, когда введён первый символ первого или последующего токена. */
export const ExampleHideMenuIfEmptyInputValue: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <Gapped vertical>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          getItems={getItems}
          selectedItems={selectedItems}
          onValueChange={setSelectedItems}
        />
        <span>Обычное поле</span>
      </Gapped>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          hideMenuIfEmptyInputValue
          getItems={getItems}
          selectedItems={selectedItems}
          onValueChange={setSelectedItems}
        />
        <span>С пропом "hideMenuIfEmptyInputValue"</span>
      </Gapped>
    </Gapped>
  );
};
ExampleHideMenuIfEmptyInputValue.storyName = 'Скрытие выпадающего списка до ввода первого символа';

/** Проп `type` задаёт тип поля:
 * - `TokenInputType.Combined` — можно и выбирать, и добавлять значения.
 * - `TokenInputType.WithReference` — в поле можно ввести только значения из справочника, но нельзя добавлять свои.
 * - `TokenInputType.WithoutReference` — можно добавлять любые значения, но подсказок из справочника нет. */
export const ExampleType: Story = () => {
  const [selectedItemsCombined, setSelectedItemsCombined] = React.useState([]);
  const [selectedItemsWithReference, setSelectedItemsWithReference] = React.useState([]);
  const [selectedItemsWithoutReference, setSelectedItemsWithoutReference] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Маленький', 'Средний', 'Большой'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
      ),
    ).then(delay(500));

  return (
    <Gapped vertical>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          type={TokenInputType.Combined}
          getItems={getItems}
          selectedItems={selectedItemsCombined}
          onValueChange={setSelectedItemsCombined}
        />
        <span>TokenInputType.Combined</span>
      </Gapped>
      <Gapped>
        <TokenInput
          placeholder="Введите значение"
          type={TokenInputType.WithReference}
          getItems={getItems}
          selectedItems={selectedItemsWithReference}
          onValueChange={setSelectedItemsWithReference}
        />
        <span>TokenInputType.WithReference</span>
      </Gapped>
      <Gapped>
        <TokenInput
          placeholder="Введите значение через запятую"
          type={TokenInputType.WithoutReference}
          getItems={getItems}
          selectedItems={selectedItemsWithoutReference}
          onValueChange={setSelectedItemsWithoutReference}
        />
        <span>TokenInputType.WithoutReference</span>
      </Gapped>
    </Gapped>
  );
};
ExampleType.storyName = 'Тип';

/** Проп `delimiters` определяет знак разделителя токенов при вводе. По умолчанию запятая.
 *
 * Работает только с типами `TokenInputType.WithoutReference` и `TokenInputType.Combined`.
 *
 * При смене разделителей смените текст для подсказки добавления нового токена, по умолчанию — «Нажмите запятую».
 */
export const ExampleDelimiters: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['Красный', 'Синий']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  const customLocale = {
    TokenInput: {
      addButtonComment: 'Нажмите точку',
    },
  };

  return (
    <LocaleContext.Provider
      value={{
        locale: customLocale,
      }}
    >
      <TokenInput
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
        type={TokenInputType.Combined}
        placeholder="Выберите или введите значения"
        delimiters={['.']}
        renderToken={(item, tokenProps) => (
          <Token key={item.toString()} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </LocaleContext.Provider>
  );
};
ExampleDelimiters.storyName = 'Знак разделителя';

/** Проп `disabled` блокирует поле с токенами. Поле меняет цвет на серый и становится недоступно для редактирования. */
export const ExampleDisabled: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['Красный', 'Синий']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  return (
    <TokenInput
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      placeholder="Выберите или введите значения"
      disabled
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  );
};
ExampleDisabled.storyName = 'Состояние блокировки';

/**  Проп `error` переводит поле с токенами в состояние ошибки. Поле подсвечивается красной рамкой. */
export const ExampleError: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['Красный', 'Синий']);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    ).then(delay(500));

  return (
    <TokenInput
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      placeholder="Выберите или введите значения"
      error
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  );
};
ExampleError.storyName = 'Состояния ошибки';

/** Проп `renderToken` задаёт функцию, которая отображает токен и даёт возможность кастомизировать внешний вид и поведение токена. */
export const ExampleRenderToken: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState(['aaa', 'bbb', 'ccc']);

  async function getItems(query) {
    return ['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query));
  }

  return (
    <TokenInput
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
ExampleRenderToken.storyName = 'Поле с кастомными токенами';

/** Пропсы `totalCount` и `renderTotalCount` позволяют добавить в выпадающий список счётчик найденных значений.
 * - `renderTotalCount` — задаёт функцию, которая отображает сообщение о количестве значений.
 * - `totalCount` — определяет общее количество значений.
 *
 * В примере также настроено ограничение количества значений в результате поиска.
 */
export const ExampleTotalCount: Story = () => {
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
        placeholder="Выберите или введите значение"
        renderTotalCount={renderTotalCount}
        totalCount={totalCount}
      />
    </div>
  );
};
ExampleTotalCount.storyName = 'Счётчик найденных значений и ограничение количества значений в выпадающем списке';

/** Проп `onKeyDown` вызывает HTML-событие `onkeydown`. Вызывая `preventDefault` на его события можно нативно блокировать ввод конкретных символов. */
export const ExampleOnKeyDown: Story = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const tokenInputRef = React.useRef<TokenInput>(null);

  const items = ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'];

  const getItems = (query: string) => {
    return Promise.resolve(items.filter((item) => item.includes(query)));
  };

  return (
    <TokenInput<string>
      ref={tokenInputRef}
      selectedItems={value}
      onValueChange={setValue}
      getItems={getItems}
      placeholder="Запрещён символ @"
      onKeyDown={(e) => {
        if (e.key === '@') {
          e.preventDefault();
          tokenInputRef.current?.blink();
        }
      }}
    />
  );
};
ExampleOnKeyDown.storyName = 'Запрет ввода определённых символов';

/** В примере показано, как передать кастомный тип значений для справочника. */
export const ExampleCustomItems: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));
  const getGenericItems = () => [
    { id: '1', value: 'Красный' },
    { id: '2', value: 'Оранжевый' },
    { id: '3', value: 'Жёлтый' },
    { id: '4', value: 'Зелёный' },
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
        placeholder="Выберите или введите значение"
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
ExampleCustomItems.storyName = 'Кастомный тип элементов списка';

/** Функция `debounce` из lodash некорректно работает с `async/promise`, поэтому лучше использовать кастомную функцию, как в примере ниже. */
export const ExampleFuncDebounceAsync: Story = () => {
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

  const items = ['Красный', 'Оранжевый', 'Жёлтый', 'Зелёный', 'Голубой', 'Синий', 'Фиолетовый'];

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
      placeholder="Выберите или введите значение"
    />
  );
};
ExampleFuncDebounceAsync.storyName = 'Кастомизация debounce-функции getItems()';
