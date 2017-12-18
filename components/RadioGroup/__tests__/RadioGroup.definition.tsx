import RadioGroup from '../index';

const items_1 = [1, 2, 3];
const group_1 = (
  <RadioGroup
    items={items_1}
    onChange={(event, value) => console.log(value.toFixed())}
    renderItem={(value, data) => <span>{value.toFixed()}</span>}
  />
);

const items_2 = [1, 2, 3];
class IntRadioGroup extends RadioGroup<number, number> {}
const group_2 = (
  <IntRadioGroup
    items={items_2}
    onChange={(event, value) => console.log(value.toFixed())}
    renderItem={(value, data) => (
      <span>
        {value.toFixed()} {data.toFixed()}
      </span>
    )}
  />
);

const items_3: Array<[number, string]> = [[1, 'one'], [2, 'two'], [3, 'three']];
class TuppleRadioGroup extends RadioGroup<number, string> {}
const group_3 = (
  <TuppleRadioGroup
    items={items_3}
    onChange={(event, value) => console.log(value.toFixed())}
    renderItem={(value, data) => (
      <span>
        {value.toFixed()} {data.slice(0)}
      </span>
    )}
  />
);
