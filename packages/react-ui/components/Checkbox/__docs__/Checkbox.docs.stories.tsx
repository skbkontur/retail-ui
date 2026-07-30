import { Button, Checkbox, Gapped } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Input data/Checkbox',
  component: Checkbox,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked}>
      Обычный чекбокс
    </Checkbox>
  );
};
ExampleBasic.storyName = 'Базовый пример чекбокса';

/** Проп `size` задаёт размер чекбокса. */
export const ExampleSize: Story = () => {
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
ExampleSize.storyName = 'Размер';

/** Проп `error` переводит чекбокс в состояние ошибки, а `warning` — в состояние предупреждения. */
export const ExampleState: Story = () => {
  const CheckboxWithState = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
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
ExampleState.storyName = 'Cостояния ошибки и предупреждения';

/** Методы `focus` и `blur` программно управляют состоянием фокуса на чекбоксе. */
export const ExampleFocusBlur: Story = () => {
  const [checked, setChecked] = React.useState(false);

  const checkboxInstance = React.useRef<Checkbox>(null);

  return (
    <Gapped vertical>
      <Checkbox ref={checkboxInstance} checked={checked} onValueChange={setChecked}>
        Пример чекбокса с программным фокусом
      </Checkbox>
      <Gapped gap={12}>
        <Button
          onClick={() => {
            checkboxInstance.current?.focus();
          }}
        >
          Дать фокус
        </Button>
        <Button
          onClick={() => {
            checkboxInstance.current?.blur();
          }}
        >
          Забрать фокус
        </Button>
      </Gapped>
    </Gapped>
  );
};
ExampleFocusBlur.storyName = 'Программная установка фокуса и снятие фокуса';

/** Чекбокс может находится в неопределённом состоянии.
 *
 * Это состояние полностью копирует поведение состояния `indeterminate` ([подробнее](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)) из HTML.
 * Влияет только на внешний вид и не влияет на состояние `checked`. */
export const ExampleIndeterminate: Story = () => {
  const [checked, setChecked] = React.useState(false);

  const checkboxInstance = React.useRef<Checkbox>(null);

  return (
    <Gapped vertical>
      <Checkbox
        initialIndeterminate
        checked={checked}
        onValueChange={setChecked}
        ref={(el) => {
          checkboxInstance.current = el;
        }}
      >
        Неопределённый чекбокс
      </Checkbox>
      <Gapped>
        <Button onClick={() => checkboxInstance.current?.setIndeterminate()}>
          Перевести в неопределённое состояние
        </Button>
        <Button onClick={() => checkboxInstance.current?.resetIndeterminate()}>
          Сбросить неопределённое состояние
        </Button>
      </Gapped>
    </Gapped>
  );
};
ExampleIndeterminate.storyName = 'Неопределенное состояние';

export const ExampleIndeterminateStory: Story = () => {
  const [checkedSiblings, setCheckedSiblings] = React.useState<number[]>([]);
  const siblingCheckboxes = [1, 2];

  const parentCheckboxRef = React.useRef<Checkbox>(null);

  React.useEffect(() => {
    if (checkedSiblings.length === 0 || checkedSiblings.length === siblingCheckboxes.length) {
      parentCheckboxRef.current?.resetIndeterminate();
    } else if (checkedSiblings.length !== 0) {
      parentCheckboxRef.current?.setIndeterminate();
    }
  }, [JSON.stringify(checkedSiblings)]);

  return (
    <>
      <Checkbox
        checked={checkedSiblings.length === siblingCheckboxes.length}
        ref={parentCheckboxRef}
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
ExampleIndeterminateStory.storyName = 'Пример использования неопределённого состояния чекбокса';
