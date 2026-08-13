import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import React from 'react';

import { MenuHeader } from '../../MenuHeader/index.js';
import type { TimePickerExtendedItem } from '../helpers/TimePicker.shared.js';
import { TimePicker } from '../TimePicker.js';

/**
 * Тип элемента выводится из `source` и виден только в `renderItem`:
 * значение поля в любом источнике — время строкой.
 * Проверки выполняет `tsc`: если выведение поедет, сборка типов упадет на присваиваниях ниже.
 */

interface Slot {
  value: string;
  slotId: number;
}

const slots: Slot[] = [{ value: '09:00', slotId: 1 }];
const times = ['09:00', '10:00'];

const StringSource = () => (
  <TimePicker
    source={times}
    renderItem={(item) => {
      const asString: string = item;

      return asString;
    }}
    onValueChange={(time) => {
      const asString: string = time;

      return asString;
    }}
  />
);

const ObjectSource = () => (
  <TimePicker
    source={slots}
    renderItem={(item) => `${item.value} / ${item.slotId}`}
    onValueChange={(time) => {
      const asString: string = time;

      // @ts-expect-error наружу приходит время, а не элемент источника
      const wrong: Slot = time;

      return [asString, wrong];
    }}
  />
);

const StringSourceWithMenuElements = () => (
  <TimePicker
    source={[<MenuHeader key={'header'}>Утро</MenuHeader>, '09:00', () => <MenuHeader>Вечер</MenuHeader>]}
    renderItem={(item) => {
      const asString: string = item;

      return asString;
    }}
  />
);

const ObjectSourceWithMenuElements = () => (
  <TimePicker
    source={[<MenuHeader key={'header'}>Утро</MenuHeader>, ...slots]}
    renderItem={(item) => `${item.value} / ${item.slotId}`}
  />
);

const FunctionSource = () => (
  <TimePicker
    source={() => times}
    renderItem={(item) => {
      const asString: string = item;

      return asString;
    }}
  />
);

const PromiseFunctionSource = () => (
  <TimePicker source={() => Promise.resolve(slots)} renderItem={(item) => `${item.value} / ${item.slotId}`} />
);

const AnnotatedSource = () => {
  const items: Array<TimePickerExtendedItem<Slot>> = [<MenuHeader key={'header'}>Утро</MenuHeader>, ...slots];

  return <TimePicker source={items} renderItem={(item) => `${item.value} / ${item.slotId}`} />;
};

const NoSource = () => (
  <TimePicker
    onValueChange={(time) => {
      const asString: string = time;

      return asString;
    }}
  />
);

const SetStateAsHandler = () => {
  const [time, setTime] = React.useState('');

  return <TimePicker source={slots} value={time} onValueChange={setTime} />;
};

const ElementVariable = () => {
  const header: ReactElement = <MenuHeader>Утро</MenuHeader>;

  return <TimePicker source={[header, '09:00']} onValueChange={(time: string) => time} />;
};

/**
 * Негативные проверки: смешивать строки и объекты в одном источнике нельзя
 * ни при выведении типа, ни при явно заданном объектном типе, а значением поля бывает только время.
 */
const MixedArraySource = () => (
  // @ts-expect-error строки и объекты в одном source
  <TimePicker source={[{ value: '09:00', slotId: 1 }, '10:00']} />
);

const MixedArraySourceWithExplicitType = () => (
  // @ts-expect-error строки и объекты в одном source
  <TimePicker<Slot> source={[{ value: '09:00', slotId: 1 }, '10:00']} />
);

const MixedFunctionSource = () => (
  // @ts-expect-error строки и объекты в одном source
  <TimePicker source={() => [{ value: '09:00', slotId: 1 }, '10:00']} />
);

const MixedPromiseSource = () => (
  // @ts-expect-error строки и объекты в одном source
  <TimePicker source={() => Promise.resolve([{ value: '09:00', slotId: 1 }, '10:00'])} />
);

const ObjectValue = () => (
  // @ts-expect-error значение поля — только время строкой
  <TimePicker source={slots} value={{ value: '09:00', slotId: 1 }} />
);

const ItemAsHandlerArgument = () => (
  // @ts-expect-error наружу приходит время, а не элемент источника
  <TimePicker source={slots} onValueChange={(item: Slot) => item} />
);

// Негативные кейсы существуют только для проверки типов и не рендерятся.
void [
  MixedArraySource,
  MixedArraySourceWithExplicitType,
  MixedFunctionSource,
  MixedPromiseSource,
  ObjectValue,
  ItemAsHandlerArgument,
];

describe('<TimePicker /> item type inference', () => {
  it.each([
    ['string source', StringSource],
    ['object source', ObjectSource],
    ['string source with menu elements', StringSourceWithMenuElements],
    ['object source with menu elements', ObjectSourceWithMenuElements],
    ['function source', FunctionSource],
    ['promise function source', PromiseFunctionSource],
    ['annotated source', AnnotatedSource],
    ['without source', NoSource],
    ['setState as handler', SetStateAsHandler],
    ['element in a variable', ElementVariable],
  ])('renders %s', (_name, Example) => {
    const { unmount } = render(<Example />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    unmount();
  });
});
