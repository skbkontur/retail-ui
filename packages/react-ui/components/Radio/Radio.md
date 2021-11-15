Различные виды радио-кнопок.

```jsx harmony
import { Gapped, Radio, RadioGroup } from '@skbkontur/react-ui';

const [chosen, setChosen] = React.useState(null);

<RadioGroup onValueChange={(value) => setChosen(value)}>
  <Gapped gap={3} vertical>
    <Radio value={1}>
      Обычная радио-кнопка
    </Radio>
    <Radio value={2} disabled>
      Отключенная радио-кнопка
    </Radio>
    <Radio value={3} checked={!chosen}>
      Радио-кнопка отмеченная по умолчанию
    </Radio>
    <Radio value={4} focused>
      Радио-кнопка в состоянии <b>focused</b> (меняется только обводка)
    </Radio>
    <Radio value={5} error>
      Радио-кнопка в состоянии <b>error</b>
    </Radio>
    <Radio value={6} warning>
      Радио-кнопка в состоянии <b>warning</b>
    </Radio>
  </Gapped>
</RadioGroup>
```

Радио-кнопки могут иметь сразу несколько состояний.

```jsx harmony
<Radio disabled checked warning>
  Отключенная, отмеченная радио-кнопка в состоянии <b>warning</b>
</Radio>
```
