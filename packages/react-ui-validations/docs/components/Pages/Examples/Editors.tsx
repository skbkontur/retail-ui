import ThumbDownIcon from '@skbkontur/react-icons/ThumbDown';
import ThumbUpIcon from '@skbkontur/react-icons/ThumbUp';
import * as React from 'react';
import Helmet from 'react-helmet';
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
import { text, ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { validation, ValidationResultFor } from '../../../Domain/ValidationBuilder';
import Demo from '../../Demo';
import Form from '../../Form';

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
  modalOpened: boolean;
}

export interface FormEditorProps {
  data: ContactInfo;
  validationInfoValue?: Nullable<ValidationResultFor<ContactInfo>>;
  onChange: (update: Partial<ContactInfo>) => void;
}

const FormEditor: React.SFC<FormEditorProps> = ({ data, validationInfoValue, onChange }) => {
  validationInfoValue = validationInfoValue || {};
  return (
    <Form>
      <Form.Line title="Имя">
        <ValidationWrapperV1 renderMessage={text()} validationInfo={validationInfoValue.name}>
          <Input value={data.name} onChange={(_, value) => onChange({ name: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Email">
        <ValidationWrapperV1 validationInfo={validationInfoValue.email}>
          <Input value={data.email} onChange={(_, value) => onChange({ email: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Телефон">
        <ValidationWrapperV1 validationInfo={validationInfoValue.phone}>
          <Input value={data.phone} onChange={(_, value) => onChange({ phone: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Пол">
        <ValidationWrapperV1 validationInfo={validationInfoValue.sex}>
          <RadioGroup
            value={data.sex}
            items={['male', 'female']}
            renderItem={x => <span>{x}</span>}
            onChange={(_, value) => onChange({ sex: value })}
          />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Город">
        <ValidationWrapperV1 validationInfo={validationInfoValue.city}>
          <ComboBox
            valueToString={x => x}
            renderValue={x => x}
            renderItem={x => x}
            itemToValue={x => x}
            value={data.city}
            getItems={async query => {
              const cities = ['City 1', 'City 2', 'City 3'];
              const result = !query ? cities : cities.filter(x => x.includes(query));
              return result;
            }}
            onChange={(_, value) => onChange({ city: value })}
          />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Вероисповедание">
        <ValidationWrapperV1 validationInfo={validationInfoValue.confession}>
          <Select
            renderItem={x => x}
            renderValue={x => x}
            items={[['Православие', 'Православие'], ['Католичество', 'Католичество'], ['Мормонизм', 'Мормонизм']]}
            value={data.confession}
            onChange={(_, value) => onChange({ confession: value })}
          />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Согласен">
        <ValidationWrapperV1 validationInfo={validationInfoValue.confirmed}>
          <Checkbox checked={data.confirmed} onChange={(_, value) => onChange({ confirmed: value })} />
        </ValidationWrapperV1>
      </Form.Line>

      <Form.Line title="О себе">
        <ValidationWrapperV1 validationInfo={validationInfoValue.about}>
          <Textarea
            placeholder="Введите текст"
            value={data.about}
            onChange={(_, value) => onChange({ about: value })}
          />
        </ValidationWrapperV1>
      </Form.Line>

      <Form.Line title="Дата рождения">
        <ValidationWrapperV1 validationInfo={validationInfoValue.born}>
          <DatePicker value={data.born} onChange={(_, value) => onChange({ born: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Сcылка">
        <ValidationWrapperV1 validationInfo={validationInfoValue.modalOpened}>
          <LinkContainer>
            <Link
              icon={data.modalOpened ? <ThumbUpIcon /> : <ThumbDownIcon />}
              onClick={() => onChange({ modalOpened: true })}
            >
              Нажми меня
            </Link>
          </LinkContainer>
        </ValidationWrapperV1>
      </Form.Line>
    </Form>
  );
};

interface LinkContainerProps {
  error?: boolean;
}

const LinkContainer = styled.span<LinkContainerProps>`
    background-color: ${props => (props.error ? '#FDE8E8' : 'transparent')}
    padding: 1px 5px;
    margin: -1px -5px;
`;

const validate = validation<ContactInfo>()
  .property(x => x.name)
  .required()
  .satisfy(x => x.split(' ').length === 2, 'Имя должно состоять из двух слов')
  .property(x => x.email)
  .required()
  .satisfy(x => x.includes('@'), 'Почта указана неверно')
  .property(x => x.phone)
  .required()
  .satisfy(
    phone => phone !== '' && /^[\s\d\-\+\(\)]*$/.test(phone),
    'Телефон должен состоять только из цифр, пробелов и знаков -,+,(,)',
  )
  .property(x => x.sex)
  .required()
  .property(x => x.city)
  .required()
  .property(x => x.confession)
  .required()
  .property(x => x.confirmed)
  .satisfy(x => x, 'Надо соглашаться', 'submit')
  .property(x => x.modalOpened)
  .satisfy(x => x, 'Надо соглашаться', 'submit')
  .property(x => x.about)
  .required()
  .property(x => x.born)
  .satisfy(x => !!x, 'Заполни', 'submit')
  .build();

interface EditorsState {
  data: ContactInfo;
}

export default class Editors extends React.Component<{}, EditorsState> {
  public state: EditorsState = {
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
      modalOpened: false,
    },
  };

  private container: ValidationContainer | null = null;

  public handleSubmit() {
    if (this.container) {
      this.container.submit();
    }
  }

  public render() {
    return (
      <div>
        <Helmet title="Редакторы" />
        <h1>Редакторы</h1>
        <Demo>
          <ValidationContainer ref={this.refContainer}>
            <FormEditor
              data={this.state.data}
              validationInfoValue={validate(this.state.data)}
              onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
            />
            <Form.ActionsBar>
              <Button use="primary" onClick={() => this.handleSubmit()}>
                Сохранить
              </Button>
            </Form.ActionsBar>
          </ValidationContainer>
        </Demo>
      </div>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
