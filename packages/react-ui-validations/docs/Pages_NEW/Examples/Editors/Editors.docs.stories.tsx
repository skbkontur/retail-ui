import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { HandThumbDownIcon } from '@skbkontur/icons/icons/HandThumbDownIcon';
import { HandThumbUpIcon } from '@skbkontur/icons/icons/HandThumbUpIcon';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Link } from '@skbkontur/react-ui/components/Link';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Textarea } from '@skbkontur/react-ui/components/Textarea';

import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Examples/Editors',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Editors: Story = () => {
  interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    sex: Nullable<'male' | 'female'>;
    city: Nullable<string>;
    confession: Nullable<string>;
    confirmed: boolean;
    about: string;
    born: string;
    clicked: boolean;
  }

  const validate = createValidator<ContactInfo>((b) => {
    b.prop(
      (x) => x.name,
      (b) => {
        b.invalid((x) => !x, 'Укажите имя', 'submit');
      },
    );
    b.prop(
      (x) => x.email,
      (b) => {
        b.invalid((x) => !x, 'Укажите адрес почты', 'submit');
        b.invalid((x) => !x.includes('@'), 'Неверный адрес почты');
      },
    );
    b.prop(
      (x) => x.phone,
      (b) => {
        b.invalid((x) => !x, 'Укажите телефон', 'submit');
        b.invalid((x) => !/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(x), 'Неверный адрес почты');
      },
    );
    b.prop(
      (x) => x.sex,
      (b) => {
        b.invalid((x) => !x, 'Укажите пол', 'submit');
      },
    );
    b.prop(
      (x) => x.city,
      (b) => {
        b.invalid((x) => !x, 'Укажите город', 'submit');
      },
    );
    b.prop(
      (x) => x.confession,
      (b) => {
        b.invalid((x) => !x, 'Укажите вероисповедание', 'submit');
      },
    );
    b.prop(
      (x) => x.confirmed,
      (b) => {
        b.invalid((x) => !x, 'Подтвердите', 'submit');
      },
    );
    b.prop(
      (x) => x.clicked,
      (b) => {
        b.invalid((x) => !x, 'Нажмите на ссылку', 'submit');
      },
    );
    b.prop(
      (x) => x.about,
      (b) => {
        b.invalid((x) => !x, 'Укажите информацию', 'submit');
        b.invalid((x) => x.trim().length < 10, 'Минимум 10 символов');
      },
    );
    b.prop(
      (x) => x.born,
      (b) => {
        b.invalid((x) => !x, 'Укажите дату рождения', 'submit');
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  const [data, setData] = React.useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    sex: null,
    city: null,
    confession: null,
    confirmed: false,
    about: '',
    born: '',
    clicked: false,
  });

  function handleChange(data: Partial<ContactInfo>): void {
    setData((prevData) => ({ ...prevData, ...data }));
  }

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validationInfo = validate(data);

  return (
    <Form>
      <ValidationContainer ref={container}>
        <Form.Line title="Имя">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.name).get()}>
            <Input value={data.name} onValueChange={(value) => handleChange({ name: value })} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Email">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.email).get()}>
            <Input value={data.email} onValueChange={(value) => handleChange({ email: value })} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Телефон">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.phone).get()}>
            <Input
              mask={'+7 999 999-99-99'}
              value={data.phone}
              onValueChange={(value) => handleChange({ phone: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Пол">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.sex).get()}>
            <RadioGroup<ContactInfo['sex']>
              value={data.sex}
              onValueChange={(value) => handleChange({ sex: value })}
              items={['male', 'female']}
              renderItem={(x) => <span>{x}</span>}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Город">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.city).get()}>
            <ComboBox
              valueToString={(x) => x}
              renderValue={(x) => x}
              renderItem={(x) => x}
              itemToValue={(x) => x}
              value={data.city}
              onValueChange={(value) => handleChange({ city: value })}
              getItems={async (query) => {
                const cities = ['City 1', 'City 2', 'City 3'];
                return query ? cities.filter((x) => x.toLocaleUpperCase().includes(query.toLocaleUpperCase())) : cities;
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Вероисповедание">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.confession).get()}>
            <Select<ContactInfo['confession'], string>
              renderItem={(x) => x}
              renderValue={(x) => x}
              items={[
                ['Православие', 'Православие'],
                ['Католичество', 'Католичество'],
                ['Мормонизм', 'Мормонизм'],
              ]}
              value={data.confession}
              onValueChange={(value) => handleChange({ confession: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Согласен">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.confirmed).get()}>
            <Checkbox checked={data.confirmed} onValueChange={(value) => handleChange({ confirmed: value })} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="О себе">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.about).get()}>
            <Textarea
              placeholder="Введите текст"
              value={data.about}
              onValueChange={(value) => handleChange({ about: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Дата рождения">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.born).get()}>
            <DatePicker value={data.born} onValueChange={(value) => handleChange({ born: value })} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Ссылка">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.clicked).get()}>
            <Link
              icon={data.clicked ? <HandThumbUpIcon /> : <HandThumbDownIcon />}
              onClick={() => handleChange({ clicked: !data.clicked })}
            >
              Нажми меня
            </Link>
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </ValidationContainer>
    </Form>
  );
};
