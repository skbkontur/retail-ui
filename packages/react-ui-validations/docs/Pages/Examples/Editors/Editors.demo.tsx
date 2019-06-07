import * as React from 'react';
import ThumbDownIcon from '@skbkontur/react-icons/ThumbDown';
import ThumbUpIcon from '@skbkontur/react-icons/ThumbUp';
import Button from 'retail-ui/components/Button';
import Checkbox from 'retail-ui/components/Checkbox';
import ComboBox from 'retail-ui/components/ComboBox';
import DatePicker from 'retail-ui/components/DatePicker';
import Input from 'retail-ui/components/Input';
import Link from 'retail-ui/components/Link';
import RadioGroup from 'retail-ui/components/RadioGroup';
import Select from 'retail-ui/components/Select';
import Textarea from 'retail-ui/components/Textarea';
import styled from 'styled-components';
import {
  ValidationContainer,
  ValidationWrapperV1,
  createValidator,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

interface LinkContainerProps {
  error?: boolean;
}

const LinkContainer = styled.span<LinkContainerProps>`
    background-color: ${props => (props.error ? '#FDE8E8' : 'transparent')}
    padding: 1px 5px;
    margin: -1px -5px;
`;

export interface ContactInfo {
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

/* tslint:disable:no-shadowed-variable */
const validate = createValidator<ContactInfo>(b => {
  b.prop(
    x => x.name,
    b => {
      b.invalid(x => !x, 'Укажите имя', 'submit');
    },
  );
  b.prop(
    x => x.email,
    b => {
      b.invalid(x => !x, 'Укажите адрес почты', 'submit');
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]{2,}$/.test(x), 'Неверный адрес почты');
    },
  );
  b.prop(
    x => x.phone,
    b => {
      b.invalid(x => !x, 'Укажите телефон', 'submit');
      b.invalid(x => !/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(x), 'Неверный адрес почты');
    },
  );
  b.prop(
    x => x.sex,
    b => {
      b.invalid(x => !x, 'Укажите пол', 'submit');
    },
  );
  b.prop(
    x => x.city,
    b => {
      b.invalid(x => !x, 'Укажите город', 'submit');
    },
  );
  b.prop(
    x => x.confession,
    b => {
      b.invalid(x => !x, 'Укажите вероисповедание', 'submit');
    },
  );
  b.prop(
    x => x.confirmed,
    b => {
      b.invalid(x => !x, 'Подтвердите', 'submit');
    },
  );
  b.prop(
    x => x.clicked,
    b => {
      b.invalid(x => !x, 'Нажмите на ссылку', 'submit');
    },
  );
  b.prop(
    x => x.about,
    b => {
      b.invalid(x => !x, 'Укажите информацию', 'submit');
      b.invalid(x => x.trim().length < 10, 'Минимум 10 символов');
    },
  );
  b.prop(
    x => x.born,
    b => {
      b.invalid(x => !x, 'Укажите дату рождения', 'submit');
    },
  );
});

/* tslint:enable:no-shadowed-variable */

interface State {
  data: ContactInfo;
}

export default class EditorsDemo extends React.Component<{}, State> {
  public state: State = {
    data: {
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
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { data } = this.state;
    const v = validate(data);

    return (
      <Form>
        <ValidationContainer ref={this.refContainer}>
          <Form.Line title="Имя">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.name).get()}>
              <Input
                value={data.name}
                onChange={(_, value) => this.handleChange({ name: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Email">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.email).get()}>
              <Input
                value={data.email}
                onChange={(_, value) => this.handleChange({ email: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Телефон">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.phone).get()}>
              <Input
                mask={'+7 999 999-99-99'}
                value={data.phone}
                onChange={(_, value) => this.handleChange({ phone: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Пол">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.sex).get()}>
              <RadioGroup
                value={data.sex}
                onChange={(_, value) => this.handleChange({ sex: value })}
                items={['male', 'female']}
                renderItem={x => <span>{x}</span>}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Город">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.city).get()}>
              <ComboBox
                valueToString={x => x}
                renderValue={x => x}
                renderItem={x => x}
                itemToValue={x => x}
                value={data.city}
                onChange={(_, value) => this.handleChange({ city: value })}
                getItems={async query => {
                  const cities = ['City 1', 'City 2', 'City 3'];
                  return query
                    ? cities.filter(x =>
                        x.toLocaleUpperCase().includes(query.toLocaleUpperCase()),
                      )
                    : cities;
                }}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Вероисповедание">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.confession).get()}>
              <Select
                renderItem={x => x}
                renderValue={x => x}
                items={[
                  ['Православие', 'Православие'],
                  ['Католичество', 'Католичество'],
                  ['Мормонизм', 'Мормонизм'],
                ]}
                value={data.confession}
                onChange={(_, value) => this.handleChange({ confession: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Согласен">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.confirmed).get()}>
              <Checkbox
                checked={data.confirmed}
                onChange={(_, value) => this.handleChange({ confirmed: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="О себе">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.about).get()}>
              <Textarea
                placeholder="Введите текст"
                value={data.about}
                onChange={(_, value) => this.handleChange({ about: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Дата рождения">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.born).get()}>
              <DatePicker
                value={data.born}
                onChange={(_, value) => this.handleChange({ born: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title="Ссылка">
            <ValidationWrapperV1 validationInfo={v.getNode(x => x.clicked).get()}>
              <LinkContainer>
                <Link
                  icon={data.clicked ? <ThumbUpIcon /> : <ThumbDownIcon />}
                  onClick={() => this.handleChange({ clicked: !data.clicked })}
                >
                  Нажми меня
                </Link>
              </LinkContainer>
            </ValidationWrapperV1>
          </Form.Line>

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </ValidationContainer>
      </Form>
    );
  }

  private handleChange = (data: Partial<ContactInfo>): void => {
    this.setState({ data: { ...this.state.data, ...data } });
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
