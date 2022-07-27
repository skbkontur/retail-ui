Базовый пример чекбокса.

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Checkbox checked={checked} onValueChange={setChecked}>
  Обычный чекбокс
</Checkbox>;
```

У чекбокса есть несколько состояний.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const CheckboxWithState = ({children, ...props}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked} {...props}>
      {children}
    </Checkbox>
  )
};

<Gapped vertical>
  <CheckboxWithState>
    Обычный чекбокс
  </CheckboxWithState>
  <CheckboxWithState error>
    Чекбокс в состоянии ошибки
  </CheckboxWithState>
  <CheckboxWithState warning>
    Чекбокс в состоянии предупреждения
  </CheckboxWithState>
</Gapped>
```

Пример использования методов чекбокса `focus()` и `blur()`.

```jsx harmony
import { Button, Checkbox, Gapped } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);

let checkboxInstance = React.useRef(null);

<Gapped vertical>
  <Checkbox
    ref={el => checkboxInstance = el}
    checked={checked}
    onValueChange={setChecked}
    >
    Пример чекбокса с программным фокусом
  </Checkbox>
  <Gapped gap={12}>
    <Button
      onClick={() => {
        checkboxInstance.focus();
      }}
    >
      Дать фокус
    </Button>
    <Button
      onClick={() => {
        checkboxInstance.blur();
      }}
    >
      Забрать фокус
    </Button>
  </Gapped>
</Gapped>
```

Чекбокс может находится в неопределённом состоянии. <br/> Это состояние полностью копирует поведение состояния [`indeterminate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate) из HTML.

Это состояние влияет только на внешний вид и не влияет на состояние `checked`.

```jsx harmony
import { Button, Checkbox, Gapped } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);
const [isIndeterminate, setIsIndeterminate] = React.useState(true);


<Gapped vertical>
  <Checkbox
    checked={checked}
    onValueChange={setChecked}
    isIndeterminate={isIndeterminate}
    setIsIndeterminate={setIsIndeterminate}
  >
    Неопределённый чекбокс
  </Checkbox>
  <Gapped>
    <Button onClick={() => setIsIndeterminate(true)}>
      Перевести в неопределённое состояние
    </Button>
    <Button onClick={() => setIsIndeterminate(false)}>
      Сбросить неопределённое состояние
    </Button>
  </Gapped>
</Gapped>
```

Пример использования неопределённого состояния чекбокса

```jsx harmony
const [checkedSiblings, setCheckedSiblings] = React.useState([]);
const siblingCheckboxes = [1, 2];

let parentCheckboxRef;

React.useEffect(() => {
  if (checkedSiblings.length === 0 || checkedSiblings.length === siblingCheckboxes.length) {
    parentCheckboxRef.resetIndeterminate();
  } else if (checkedSiblings.length !== 0) {
    parentCheckboxRef.setIndeterminate();
  }
}, [JSON.stringify(checkedSiblings)]);

<>
  <Checkbox checked={checkedSiblings.length === siblingCheckboxes.length} ref={(el) => (parentCheckboxRef = el)}>
    Родитель
  </Checkbox>
  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
    {siblingCheckboxes.map((id) => {
      return (
        <Checkbox
          key={id}
          checked={checkedSiblings.includes(id)}
          onValueChange={() => {
            const siblingIndex = checkedSiblings.indexOf(id);

            if (siblingIndex === -1) {
              setCheckedSiblings((prev) => [...prev, id]);
            } else {
              setCheckedSiblings((prev) =>
                prev.filter((siblingId) => {
                  return siblingId !== id;
                }),
              );
            }
          }}
        >
          Ребёнок ({id})
        </Checkbox>
      );
    })}
  </div>
</>
```
