import Select from '../Select';

const items_1: number[] = [1, 2, 3];
const commonSelect = <Select items={items_1} />;

const items_2: string[] = ['1', '2', '3'];
class StrSelect extends Select<string> {}
const strSelect = <StrSelect items={items_2} />;

const items_3: Array<[number, string]> = [[1, '1'], [2, '2'], [3, '3']];
class TuppleSelect extends Select<number, string> {}
const tuppleSelect = <TuppleSelect items={items_3} />;
