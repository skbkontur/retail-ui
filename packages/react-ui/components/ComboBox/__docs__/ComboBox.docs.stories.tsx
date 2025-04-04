import React from 'react';
import { getCities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/getCities';
import { MenuFooter } from '@skbkontur/react-ui/components/MenuFooter';
import { CheckAIcon } from '@skbkontur/icons/icons/CheckAIcon';
import { ComboBox, Tooltip, Group, Button, Gapped, MenuSeparator, MenuItem } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/ComboBox',
  component: ComboBox,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const maybeReject = (x) => (Math.random() * 3 < 1 ? Promise.reject() : Promise.resolve(x));

  const getItems = (q) =>
    Promise.resolve(
      [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
        { value: 4, label: 'Fourth' },
        { value: 5, label: 'Fifth' },
        { value: 6, label: 'Sixth' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    )
      .then(delay(500))
      .then(maybeReject);

  const [selected, setSelected] = React.useState({ value: 3, label: 'Third' });
  const [error, setError] = React.useState(false);

  const handleValueChange = (value) => {
    setSelected(value);
    setError(false);
  };

  const handleUnexpectedInput = () => {
    setSelected(null);
    setError(true);
  };

  const handleFocus = () => setError(false);

  return (
    <Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
      <ComboBox
        error={error}
        getItems={getItems}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
        onUnexpectedInput={handleUnexpectedInput}
        placeholder="Enter number"
        value={selected}
      />
    </Tooltip>
  );
};
Example1.storyName = 'Комбобокс с валидацией';

/** Очистить значение в `ComboBox`'е можно с помощью пустой строки, `null` или `undefined` */
export const Example2: Story = () => {
  const [value, setValue] = React.useState({ value: 2, label: 'Second' });

  const getItems = (q) => {
    return Promise.resolve(
      [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
        { value: 4, label: 'Fourth' },
        { value: 5, label: 'Fifth' },
        { value: 6, label: 'Sixth' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    );
  };

  return (
    <Group>
      <ComboBox getItems={getItems} onValueChange={setValue} placeholder="Введите число" value={value} />
      <Button onClick={() => setValue(null)}>Null</Button>
      <Button onClick={() => setValue(undefined)}>Undefined</Button>
      <Button onClick={() => setValue('')}>Пустая строка</Button>
    </Group>
  );
};
Example2.storyName = 'Очистка комбобокса';

export const Example3: Story = () => {
  const popularItems = [
    { Id: 956, City: 'Махачкала' },
    { Id: 4974, City: 'Верхняя-Пышма' },
    { Id: 4980, City: 'Екатеринбург' },
  ];

  const [value, setValue] = React.useState(null);

  const mapCity = ({ Id, City }) => ({
    value: Id,
    label: City,
  });

  const hasSelectedItem = (itemsSets) => itemsSets.some((items) => items.find((item) => value.value === item.Id));

  const shouldInsertSelectedItem = (query, items) => value && !query && !hasSelectedItem([items, popularItems]);

  const getPopularItems = (query) => (query ? [] : popularItems.map(mapCity));
  const renderSeparator = (query) => (query ? [] : <MenuSeparator />);
  const getSelectedItem = (query, items) => (!shouldInsertSelectedItem(query, items) ? [] : value);

  const prepareItems = (query, items) =>
    (!shouldInsertSelectedItem(query, items) ? items : items.slice(0, -1)).map(mapCity);

  const renderTotalCount = (foundCount, totalCount) =>
    foundCount < totalCount ? (
      <MenuFooter>
        Показано {foundCount} из {totalCount} найденных городов.
      </MenuFooter>
    ) : (
      []
    );

  const getItems = (query) =>
    getCities(query).then(({ foundItems, totalCount }) =>
      [].concat(
        getPopularItems(query),
        renderSeparator(query),
        getSelectedItem(query, foundItems),
        prepareItems(query, foundItems),
        renderTotalCount(foundItems.length, totalCount),
      ),
    );

  const renderItem = (item) => (
    <Gapped>
      <div style={{ width: 40 }}>{item.value}</div>
      <div style={{ width: 210, whiteSpace: 'normal' }}>{item.label}</div>
    </Gapped>
  );

  return (
    <ComboBox
      onValueChange={setValue}
      getItems={getItems}
      placeholder="Начните вводить название"
      value={value}
      renderItem={renderItem}
    />
  );
};
Example3.storyName = 'ComboBox with popular values, complex menu items and total count message';

export const Example4: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (q) =>
    Promise.resolve(
      [
        { approved: true, value: 1, label: 'Леонид Долецкий', email: 'first@skbkontur.ru' },
        { approved: true, value: 2, label: 'Владислав Нашкодивший', email: 'second@skbkontur.ru' },
        { approved: false, value: 3, label: 'Розенкранц Харитонов', email: 'third@skbkontur.ru' },
        { approved: false, value: 4, label: 'Надежда Дубова', email: 'fourth@skbkontur.ru' },
        { approved: true, value: 5, label: 'Владислав Сташкеевич', email: 'fifth@skbkontur.ru' },
        { approved: true, value: 6, label: 'Василиса Александровна Поволоцкая', email: 'sixth@skbkontur.ru' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    ).then(delay(500));

  const [selected, setSelected] = React.useState({
    approved: false,
    value: 3,
    label: 'Розенкранц Харитонов',
    email: 'third@skbkontur.ru',
  });
  const [error, setError] = React.useState(false);

  const handleValueChange = (value) => {
    setSelected(value);
    setError(false);
  };

  const handleUnexpectedInput = () => {
    setSelected(null);
    setError(true);
  };

  const handleFocus = () => setError(false);

  const customRenderItem = (item) => (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '55%',
          display: 'flex',
        }}
      >
        <span
          style={{
            minWidth: '20px',
          }}
        >
          {item.approved ? <CheckAIcon /> : null}
        </span>
        <span
          style={{
            flexGrow: '1',
          }}
        >
          {item.label}
        </span>
      </div>
      <div
        style={{
          opacity: '0.6',
          paddingLeft: '10px',
          boxSizing: 'border-box',
        }}
      >
        {item.email}
      </div>
    </div>
  );

  const customItemWrapper = (item) => {
    if (item.value === 3) {
      return (props) => <div {...props} />;
    }

    return (props) => <button {...props} />;
  };

  const customRenderValue = (item) => (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '55%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          opacity: '0.6',
          paddingLeft: '10px',
          boxSizing: 'border-box',
        }}
      >
        {item.email}
      </div>
    </div>
  );

  return (
    <Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
      <ComboBox
        error={error}
        getItems={getItems}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
        onUnexpectedInput={handleUnexpectedInput}
        placeholder="Enter number"
        value={selected}
        renderItem={customRenderItem}
        itemWrapper={customItemWrapper}
        renderValue={customRenderValue}
        width="400px"
      />
    </Tooltip>
  );
};
Example4.storyName = 'Переопределение `renderValue`, `renderItem` и `itemWrapper`';

export const Example5: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const getItems = (query) =>
    Promise.resolve(
      [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
        { value: 4, label: 'Fourth' },
        { value: 5, label: 'Fifth' },
        { value: 6, label: 'Sixth' },
      ]
        .filter((x) => x.label.toLowerCase().includes(query.toLowerCase()) || x.value.toString(10) === query)
        .map(({ label, ...rest }) => {
          const start = label.toLowerCase().indexOf(query.toLowerCase());
          const end = start + query.length;

          return {
            ...rest,
            label,
            highlightedLabel:
              start >= 0 ? (
                <span>
                  {label.substring(0, start)}
                  <strong
                    style={{
                      fontSize: '1.1em',
                    }}
                  >
                    {label.substring(start, end)}
                  </strong>
                  {label.substring(end)}
                </span>
              ) : null,
          };
        }),
    ).then(delay(500));

  const [selected, setSelected] = React.useState({ value: 3, label: 'Third' });
  const [error, setError] = React.useState(false);

  const handleValueChange = (value) => {
    setSelected(value);
    setError(false);
  };

  const handleUnexpectedInput = () => {
    setSelected(null);
    setError(true);
  };

  const handleFocus = () => setError(false);

  const renderItem = (item) => {
    if (item.highlightedLabel) {
      return item.highlightedLabel;
    }

    return item.label;
  };

  return (
    <Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
      <ComboBox
        error={error}
        getItems={getItems}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
        onUnexpectedInput={handleUnexpectedInput}
        placeholder="Enter number"
        value={selected}
        renderItem={renderItem}
      />
    </Tooltip>
  );
};
Example5.storyName = 'Подсветка результата поиска';

export const Example6: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  class ComboboxExample extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        items: [
          { value: 1, label: 'First' },
          { value: 2, label: 'Second' },
          { value: 3, label: 'Third' },
          { value: 4, label: 'Fourth' },
          { value: 5, label: 'Fifth' },
          { value: 6, label: 'Sixth' },
        ],
        query: '',
        selected: { value: 3, label: 'Third' },
        error: false,
        shouldRenderAddButton: false,
      };

      this.comboBoxElement = null;

      this.getItems = this.getItems.bind(this);
      this.handleValueChange = this.handleValueChange.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleInputValueChange = this.handleInputValueChange.bind(this);
      this.renderAddButton = this.renderAddButton.bind(this);
      this.refComboBox = this.refComboBox.bind(this);
      this.addItem = this.addItem.bind(this);
    }

    render() {
      return (
        <ComboBox
          error={this.state.error}
          getItems={this.getItems}
          onValueChange={this.handleValueChange}
          onFocus={this.handleFocus}
          placeholder="Enter number"
          value={this.state.selected}
          onInputValueChange={this.handleInputValueChange}
          renderAddButton={this.renderAddButton}
          ref={this.refComboBox}
        />
      );
    }

    getItems(q) {
      return Promise.resolve(
        this.state.items.filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
      ).then(delay(500));
    }

    handleInputValueChange(query) {
      const isItemExists = this.state.items.find((x) => x.label.toLowerCase() === query.toLowerCase());
      this.setState({ query, shouldRenderAddButton: !isItemExists });
    }

    handleValueChange(value) {
      this.setState({ selected: value, error: false, shouldRenderAddButton: false });
    }

    handleFocus() {
      this.setState({ error: false });
    }

    renderAddButton() {
      if (!this.state.shouldRenderAddButton) {
        return null;
      }
      return (
        <MenuItem link onClick={this.addItem}>
          + Добавить "{this.state.query}"
        </MenuItem>
      );
    }

    refComboBox(element) {
      this.comboBoxElement = element;
    }

    addItem() {
      this.setState((currentState) => {
        const newItem = {
          value: Math.max(...currentState.items.map(({ value }) => value)) + 1,
          label: currentState.query,
        };

        return {
          items: [...currentState.items, newItem],
          selected: newItem,
          error: false,
          shouldRenderAddButton: false,
        };
      });
    }
  }

  return <ComboboxExample />;
};
Example6.storyName = 'Добавление элементов в меню';

/** Если нужно сбросить контрол без изменения `value`, то можно использовать метод `reset`. */
export const Example7: Story = () => {
  const [selected, setSelected] = React.useState({ value: 1, label: 'First' });
  const ref = React.useRef(null);

  const handleReset = () => {
    if (ref.current) {
      ref.current.reset();
    }
  };

  const getItems = (q) =>
    Promise.resolve(
      [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    );

  return (
    <div>
      <ComboBox ref={ref} getItems={getItems} onValueChange={setSelected} placeholder="Enter number" value={selected} />
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};
Example7.storyName = 'Сброс значения';

export const Example9: Story = () => {
  const getItems = (q) => {
    return Promise.resolve(
      [
        { value: 1, label: 'Маленький' },
        { value: 2, label: 'Средний' },
        { value: 3, label: 'Большой' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    );
  };

  const [valueSmall, setValueSmall] = React.useState('Маленький');
  const [valueMedium, setValueMedium] = React.useState('Средний');
  const [valueLarge, setValueLarge] = React.useState('Большой');

  return (
    <Gapped vertical>
      <ComboBox
        getItems={getItems}
        onValueChange={setValueSmall}
        placeholder="Введите число"
        value={valueSmall}
        size={'small'}
      />
      <ComboBox
        getItems={getItems}
        onValueChange={setValueMedium}
        placeholder="Введите число"
        value={valueMedium}
        size={'medium'}
      />
      <ComboBox
        getItems={getItems}
        onValueChange={setValueLarge}
        placeholder="Введите число"
        value={valueLarge}
        size={'large'}
      />
    </Gapped>
  );
};
Example9.storyName = 'Размер';
