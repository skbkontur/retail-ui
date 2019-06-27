/* tslint:disable:member-ordering no-console no-unused-expression */
import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Gapped from 'retail-ui/components/Gapped';
import Input from 'retail-ui/components/Input';
import Toggle from 'retail-ui/components/Toggle';
// @ts-ignore
import { createValidator, text, tooltip, ValidationBehaviour, ValidationInfo } from '../../src';
import ValidationContainer from '../../src/ValidationContainer';
import ValidationWrapperV1 from '../../src/ValidationWrapperV1';
import { Nullable } from '../../typings/Types';
import CurrencyInput from 'retail-ui/components/CurrencyInput';
import { createValidation } from './Validations';
import PromiseHelper from './PromiseHelper';

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
interface SumValidation {
  sum1: Nullable<string>;
  sum2: Nullable<string>;
}

const delay = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  }) as Promise<any>;
};

const defaultTimeout = 2000;

// @ts-ignore
const validations = {
  isNumberUnique: async (number: string): Promise<boolean> => {
    await delay(defaultTimeout);
    return !['1', '11'].includes(number);
  },
  getSumValidation: async (sum1: number, sum2: number): Promise<SumValidation> => {
    if (sum1 % 2) {
      return {
        sum1: 'Должно быть четным',
        sum2: null,
      };
    }
    if (sum1 >= sum2) {
      return {
        sum1: 'Должно быть меньше sum2',
        sum2: 'Должно быть больше sum1',
      };
    }
    return {
      sum1: null,
      sum2: null,
    };
  },
};

interface DataContract {
  number: string;
  checkNumberUnique: boolean;
  sum1: Nullable<number>;
  sum2: Nullable<number>;
}

interface SubmitData {
  duplicateNumberError?: boolean;
}

// валидации должны выполнять по порядку immidiate -> lostfocus -> submit

/* tslint:disable:no-shadowed-variable */
/*
let validation = createValidation<DataContract, number, SubmitData>((b, root) => {
  b.prop(
    x => x.number,
    b => {
      const isNumberUnique = b.local('x', x => x, x => validations.isNumberUnique(x));
      b.invalid(x => !/^\d*$/.test(x), 'Только цифры', 'lostfocus');
      b.invalid(async x => !(await isNumberUnique), 'Укажите другой номер', 'lostfocus');
      b.invalid(x => !x, 'Укажите номер', 'submit');
      b.submitted(x => !!x.duplicateNumberError, 'Укажите другой номер', 'error');
    },
  );
  const sums = b.local(
    'sums-validation',
    x => ({ sum1: x.sum1, sum2: x.sum2 }),
    async x => {
      if (x.sum1 == null || x.sum2 == null) {
        throw new Error('unexpected');
      }
      return validations.getSumValidation(x.sum1, x.sum2);
    },
  );
  b.prop(
    x => x.sum1,
    b => {
      // const isNumberUnique = b.local(x => x, x => !validations.isNumberUnique(x));
      b.invalid(async x => (await sums).sum1, 'lostfocus');
      b.invalid(x => !x, 'Укажите сумму', 'submit');
    },
  );
  b.prop(
    x => x.sum2,
    b => {
      b.invalid(async x => (await sums).sum1, 'lostfocus');
      b.invalid(x => !x, 'Укажите сумму', 'submit');
    },
  );
});
*/

/* tslint:disable:no-shadowed-variable */
const validation = createValidation<DataContract, unknown, SubmitData>(b => {
  b.prop(
    x => x.number,
    b => {
      const xxx = b.local('xxx', x => x, x => validations.isNumberUnique(x));

      b.invalid(x => !x, 'Укажите номер', 'submit', { lostfocus: true });
      b.invalid(x => !/^\d*$/.test(x), 'Только цифры', 'immediate');
      b.invalid(x => x.length > 3, 'Не больше трех символов', 'lostfocus');
      b.invalid(async x => !(await xxx()), 'Укажите другой номер', 'lostfocus', { submit: false });
      // b.invalid(async x => !(await xxx()), 'Укажите другой номер', 'lostfocus');
      b.submitted(x => !!x.duplicateNumberError, 'SERVER: Укажите другой номер');
    },
  );
});

interface StoryXxxProps {}

interface StoryXxxState {
  data: DataContract;
  sending: boolean;
}

export default class StoryXxx extends React.Component<StoryXxxProps, StoryXxxState> {
  private initial: DataContract = {
    number: '',
    checkNumberUnique: false,
    sum1: null,
    sum2: null,
  };

  public state: StoryXxxState = {
    data: this.initial,
    sending: false,
  };

  private container: ValidationContainer | null = null;

  private validator = validation.createValidator(this.initial, this.forceUpdate.bind(this));

  public componentDidUpdate(
    prevProps: Readonly<StoryXxxProps>,
    prevState: Readonly<StoryXxxState>,
    snapshot?: any,
  ): void {
    this.validator.setValue(this.state.data);
    // this.validator.immediate();
  }

  public render() {
    const { data } = this.state;
    return (
      <ValidationContainer ref={this.ref}>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <ValidationWrapperV1 validationInfo={this.validator.reader.getNode(x => x.number).get()}>
              <Input
                disabled={this.state.sending}
                value={data.number}
                onChange={(_, value) => this.handleChange({ number: value })}
                onBlur={this.validateLostfocus}
              />
            </ValidationWrapperV1>
            <ValidationWrapperV1 validationInfo={null}>
              <Toggle
                disabled={this.state.sending}
                checked={data.checkNumberUnique}
                onChange={value => this.handleChange({ checkNumberUnique: value })}
                onBlur={this.validateLostfocus}
              />
            </ValidationWrapperV1>
            <ValidationWrapperV1 validationInfo={null}>
              <CurrencyInput
                disabled={this.state.sending}
                value={data.sum1}
                onChange={(_, value) => this.handleChange({ sum1: value })}
                onBlur={this.validateLostfocus}
              />
            </ValidationWrapperV1>
            <ValidationWrapperV1 validationInfo={null}>
              <CurrencyInput
                disabled={this.state.sending}
                value={data.sum2}
                onChange={(_, value) => this.handleChange({ sum2: value })}
                onBlur={this.validateLostfocus}
              />
            </ValidationWrapperV1>
            <Gapped>
              <Button loading={this.state.sending} onClick={this.handleSubmit}>
                Submit
              </Button>
            </Gapped>
          </Gapped>
        </div>
      </ValidationContainer>
    );
  }

  private handleChange = (value: Partial<DataContract>): void => {
    this.setState({ data: { ...this.state.data, ...value } });
  };

  private validateLostfocus = async () => {
    await this.validator.lostfocus();
  };

  private handleSubmit = async () => {
    this.setState({ sending: true }, async () => {
      await this.validator.submit(this.validate, this.sendToServer);
      this.setState({ sending: false });
    });
  };

  // @ts-ignore
  private validate = async (): Promise<boolean> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    return await this.container.validate();
  };

  private sendToServer = async (): Promise<SubmitData> => {
    await PromiseHelper.delay(500);
    return {
      duplicateNumberError: ['1', '11', '111'].includes(this.state.data.number),
    };
  };

  private ref = (el: ValidationContainer | null) => (this.container = el);
}
