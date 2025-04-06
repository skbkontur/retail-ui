import React from 'react';
import { Checkbox, Gapped, Button } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Checkbox',
  component: Checkbox,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked}>
      Обычный чекбокс
    </Checkbox>
  );
};
Example1.storyName = 'Базовый пример чекбокса';

export const Example2: Story = () => {
  const CheckboxWithState = ({ children, ...props }) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <Checkbox checked={checked} onValueChange={setChecked} {...props}>
        {children}
      </Checkbox>
    );
  };

  return (
    <Gapped vertical>
      <CheckboxWithState>Обычный чекбокс</CheckboxWithState>
      <CheckboxWithState error>Чекбокс в состоянии ошибки</CheckboxWithState>
      <CheckboxWithState warning>Чекбокс в состоянии предупреждения</CheckboxWithState>
    </Gapped>
  );
};
Example2.storyName = 'Cостояния';

export const Example3: Story = () => {
  return (
    <Gapped vertical>
      <Checkbox size="small" checked>
        Маленький
      </Checkbox>
      <Checkbox size="medium" checked>
        Средний
      </Checkbox>
      <Checkbox size="large" checked>
        Большой
      </Checkbox>
    </Gapped>
  );
};
Example3.storyName = 'Размер';

export const Example4: Story = () => {
  const [checked, setChecked] = React.useState(false);

  let checkboxInstance = React.useRef(null);

  return (
    <Gapped vertical>
      <Checkbox ref={(el) => (checkboxInstance = el)} checked={checked} onValueChange={setChecked}>
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
  );
};
Example4.storyName = 'focus и blur';

/** Чекбокс может находится в неопределённом состоянии. <br/> Это состояние полностью копирует поведение состояния `indeterminate` ([подробнее](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)) из HTML.
Это состояние влияет только на внешний вид и не влияет на состояние `checked`. */
export const Example5: Story = () => {
  const [checked, setChecked] = React.useState(false);

  let checkboxInstance = React.useRef(null);

  return (
    <Gapped vertical>
      <Checkbox initialIndeterminate checked={checked} onValueChange={setChecked} ref={(el) => (checkboxInstance = el)}>
        Неопределённый чекбокс
      </Checkbox>
      <Gapped>
        <Button onClick={() => checkboxInstance.setIndeterminate()}>Перевести в неопределённое состояние</Button>
        <Button onClick={() => checkboxInstance.resetIndeterminate()}>Сбросить неопределённое состояние</Button>
      </Gapped>
    </Gapped>
  );
};
Example5.storyName = 'Неопределенное состояние';

export const Example6: Story = () => {
  const [checkedSiblings, setCheckedSiblings] = React.useState<number[]>([]);
  const siblingCheckboxes = [1, 2];

  let parentCheckboxRef;

  React.useEffect(() => {
    if (checkedSiblings.length === 0 || checkedSiblings.length === siblingCheckboxes.length) {
      parentCheckboxRef.resetIndeterminate();
    } else if (checkedSiblings.length !== 0) {
      parentCheckboxRef.setIndeterminate();
    }
  }, [JSON.stringify(checkedSiblings)]);

  return (
    <>
      <Checkbox
        checked={checkedSiblings.length === siblingCheckboxes.length}
        ref={(el) => (parentCheckboxRef = el)}
        onValueChange={() => {
          if (checkedSiblings.length === siblingCheckboxes.length) {
            setCheckedSiblings(() => []);
          } else {
            setCheckedSiblings(() => [...siblingCheckboxes]);
          }
        }}
      >
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
  );
};
Example6.storyName = 'Пример использования неопределённого состояния чекбокса';
