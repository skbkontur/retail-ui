import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { ValidationContainer, ValidationWrapper, ValidationInfo, ValidationBehaviour, text } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Validator/Independent',
  parameters: { creevey: { skip: true } },
} as Meta;

export const LostfocusIndependent: Story = () => {
  const [name, setName] = React.useState<string>('');
  const [lastname, setLastname] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    if (!value) {
      return { message: 'Не должно быть пустым', type: 'lostfocus' };
    }
    return null;
  }

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Имя">
          <ValidationWrapper validationInfo={validate(name)} renderMessage={text('right')}>
            <Input placeholder={'Иван'} value={name} onValueChange={setName} />
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="Фамилия">
          <ValidationWrapper validationInfo={validate(lastname)} renderMessage={text('right')}>
            <Input placeholder={'Иванов'} value={lastname} onValueChange={setLastname} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const LostfocusDependent: Story = () => {
  const [name, setName] = React.useState<string>('');
  const [lastname, setLastname] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    if (!value) {
      return { message: 'Не должно быть пустым', type: 'lostfocus', independent: true };
    }

    return null;
  }

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Имя">
          <ValidationWrapper validationInfo={validate(name)} renderMessage={text('right')}>
            <Input placeholder={'Иван'} value={name} onValueChange={setName} />
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="Фамилия">
          <ValidationWrapper validationInfo={validate(lastname)} renderMessage={text('right')}>
            <Input placeholder={'Иванов'} value={lastname} onValueChange={setLastname} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

type DependsType = {
  immediate: string;
  lostfocus: string;
  submit: string;
};
export const Mixture: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [dependents, setDependents] = React.useState<DependsType>({ immediate: '', lostfocus: '', submit: '' });
  const [independents, setInependents] = React.useState<DependsType>({ immediate: '', lostfocus: '', submit: '' });
  const [reset, setReset] = React.useState<number>(1);

  function validate(v: string, type: ValidationBehaviour, independent = false): Nullable<ValidationInfo> {
    if (v === '') {
      return { message: 'Не должно быть пустым', type, independent };
    }
    return null;
  }

  function handleChangeDependents(value: Partial<DependsType>) {
    setDependents((prevState) => ({ ...prevState, ...value }));
  }

  function handleChangeIndependents(value: Partial<DependsType>): void {
    setInependents((prevState) => ({ ...prevState, ...value }));
  }

  const handleSubmit = () => container.current?.validate();

  const handleReset = () => setReset(Math.random());

  return (
    <ValidationContainer key={reset} ref={container}>
      <Form>
        <Form.Line title="">
          <code>immediate</code>
        </Form.Line>

        <Form.Line title="Зависимая">
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.immediate, 'immediate')}>
            <Input
              placeholder="Не должно быть пустым"
              value={dependents.immediate}
              onValueChange={(value) => handleChangeDependents({ immediate: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Независимая">
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.immediate, 'immediate', true)}
          >
            <Input
              placeholder="Не должно быть пустым"
              value={independents.immediate}
              onValueChange={(value) => handleChangeIndependents({ immediate: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="">
          <code>lostfocus</code>
        </Form.Line>

        <Form.Line title="Зависимая">
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.lostfocus, 'lostfocus')}>
            <Input
              placeholder="Не должно быть пустым"
              value={dependents.lostfocus}
              onValueChange={(value) => handleChangeDependents({ lostfocus: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Независимая">
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.lostfocus, 'lostfocus', true)}
          >
            <Input
              placeholder="Не должно быть пустым"
              value={independents.lostfocus}
              onValueChange={(value) => handleChangeIndependents({ lostfocus: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="">
          <code>submit</code>
        </Form.Line>

        <Form.Line title="Зависимая">
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.submit, 'submit')}>
            <Input
              placeholder="Не должно быть пустым"
              value={dependents.submit}
              onValueChange={(value) => handleChangeDependents({ submit: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Независимая">
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.submit, 'submit', true)}
          >
            <Input
              placeholder="Не должно быть пустым"
              value={independents.submit}
              onValueChange={(value) => handleChangeIndependents({ submit: value })}
            />
          </ValidationWrapper>
        </Form.Line>

        <br />

        <Form.Line title="">
          <Gapped>
            <Button use="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button use="pay" onClick={handleReset}>
              Очистить
            </Button>
          </Gapped>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};
