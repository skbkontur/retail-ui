/* tslint:disable:member-ordering no-console no-unused-expression */
import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Gapped from 'retail-ui/components/Gapped';
import Input from 'retail-ui/components/Input';
// @ts-ignore
import { text, tooltip, ValidationBehaviour, ValidationInfo } from '../../src';
import ValidationContainer from '../../src/ValidationContainer';
import ValidationWrapperV1 from '../../src/ValidationWrapperV1';
import { Nullable } from '../../typings/Types';
import { ValidationState } from '../ValidationHelper';
import { PromiseWrapper } from './PromiseWrapper';

/*
1. заполненость по сабмиту
2. формат по потере фокуса
3. асинхронщина по потере фокуса
4. асинхронщина по сабмиту
*/
/*
1. заполненость по сабмиту
2. формат по потере фокуса
3. асинхронщина по сабмиту
4. асинхронщина по потере фокуса
*/

/*
на форме четыре поля A B C D //дата, номер, сумма, ??? комментарий
на серевере можно отвалидировать сразу два поля по значению трех

по потере фокуса и по сабмиту может вызываться одна и та же серверная функция валидации, но исход может быть разным
  const data = await getFromServer();
  if (data.xxx) {
    return invalid on lostfocus;
  }
  if (data.yyy) {
    return invalid on submit;
  }

валидация по сабмиту может быть результатом действия соранения
если сначала провалидировать форму, а потом отправить на сервер, то она может потерять актуальность, поэтому возможно стоит отправль форму и если появились ошибки то отбраить их, то есть совместили сохранение с валидированием.
однако по сабмиту может не происходить никакого сохранения.
вероятно может быть ситуация, когда мы провалидировали по сабмиту, потмо сохранили и резальтат сохранеия отобразили в виде валидаций

const validation = ...
  prop(x => x.field, b => {
    const data = b.data("name", x => x.dependencies, async d => calc);
    b.prop(x => x.zzz, b => {
      b.invalid(x => ({x.dependencies, data}), async x => await data.isInvalidZzz, "message");
    })
    b.prop(x => x.vvv, b => {
      b.
    })
  })


const validator = validation.createValidator(initialData, extra, handleValidationChanged)

handleValidationChanged = () => justRerender();

validator.set(s => {
  s.data(data);
  s.partialData(data);
  s.extra(data);
  s.partialExtra(data);
});
validator.setData(data);
validator.setData(data, extra);
validator.setPartial(data);
validator.setExtra(extra);

validator.validate("lostfocus");

//todo формирование текста сообщения на основе асинхронных данных
//todo не персичитывать валидацию если значение завершенного промиса не отличается от предыдущего, даже если это новый промис
//todo

*/

/*

*/

interface Story1Props {}

interface Story1State {
  sending: boolean;
  value: string;
  validation: ValidationState;
}

export default class Story1 extends React.Component<Story1Props, Story1State> {
  public state: Story1State = {
    sending: false,
    value: '',
    validation: 'none',
  };

  private container: ValidationContainer | null = null;

  public validate(): Nullable<ValidationInfo> {
    if (this.state.value.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: 'submit',
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <ValidationWrapperV1 validationInfo={null} loading={false} renderMessage={tooltip('top left')}>
              <Input
                value={this.state.value}
                onChange={(_, value) => this.setState({ value })}
                //onBlur={() => this.validator.lostfocus()}
              />
            </ValidationWrapperV1>
            <Gapped>
              <Button loading={this.state.sending} onClick={this.handleSubmit}>
                Submit
              </Button>
              <span>{this.state.validation}</span>
            </Gapped>
          </Gapped>
        </div>
      </ValidationContainer>
    );
  }

  private lastValidated: string = '';
  private counter: number = 0;

  private wrapper: Nullable<PromiseWrapper<Nullable<ValidationInfo>>> = null;

  public handleValidationRequested = async (type: ValidationBehaviour): Promise<void> => {
    console.log('validation requested with type: ' + type.toUpperCase());

    if (type === 'lostfocus') {
      const value = this.state.value;
      if (this.lastValidated !== value) {
        const counter = ++this.counter;
        this.lastValidated = value;
        this.wrapper && this.wrapper.cancel();
        this.wrapper = PromiseWrapper.run(
          async (cancellation): Promise<Nullable<ValidationInfo>> => {
            console.log('begin: ' + counter);
            const isInvalid = await this.isValueInvalid(value);
            console.log('end: ' + counter);

            return isInvalid
              ? {
                  level: 'error',
                  type: 'lostfocus',
                  message: 'invalid: ' + value,
                }
              : null;
          },
        );
        this.forceUpdate();
        this.wrapper.promise.then(() => {
          console.log('then update ' + counter);
          this.forceUpdate();
        });
      }
    }

    if (type === 'submit') {
      const value = this.state.value;
      if (this.lastValidated !== value) {
        const counter = ++this.counter;
        this.lastValidated = value;
        this.wrapper && this.wrapper.cancel();
        this.wrapper = PromiseWrapper.run(
          async (cancellation): Promise<Nullable<ValidationInfo>> => {
            console.log('begin: ' + counter);
            const isInvalid = await this.isValueInvalid(value);
            console.log('end: ' + counter);

            return isInvalid
              ? {
                  level: 'error',
                  type: 'lostfocus',
                  message: 'invalid: ' + value,
                }
              : null;
          },
        );
        this.forceUpdate();
        this.wrapper.promise.then(() => {
          console.log('then update ' + counter);
          this.forceUpdate();
        });
      }
    }
  };

  private async isValueInvalid(value: string): Promise<boolean> {
    await this.delay(2000);
    return !/^\d*$/.test(value);
  }

  // @ts-ignore
  private getValidation(
    wrapper: Nullable<PromiseWrapper<Nullable<ValidationInfo>>>,
  ): { validationInfo: Nullable<ValidationInfo>; loading: boolean } {
    if (!wrapper) {
      return { validationInfo: null, loading: false };
    }
    if (wrapper.state === 'loading') {
      return { validationInfo: null, loading: true };
    }
    if (wrapper.state === 'resolved') {
      return { validationInfo: wrapper.value, loading: false };
    }
    return { validationInfo: null, loading: false };
  }

  private delay = (timeout: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), timeout);
    }) as Promise<any>;
  };

  public handleSubmit = () => {
    this.setState({ sending: true, validation: 'validating' }, async () => {
      if (this.container) {
        const isValid = await this.container.validate();
        this.setState({ sending: false, validation: isValid ? 'valid' : 'invalid' });
      }
    });
  };

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
