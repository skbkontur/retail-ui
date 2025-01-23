import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Gapped } from '@skbkontur/react-ui';
import { Story } from '@skbkontur/react-ui/typings/stories';

import { text, tooltip, ValidationBehaviour, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'Input',
} as Meta;

type Sex = 'male' | 'female';

const validateValue = (value: string): Nullable<ValidationInfo> => {
  if (value === '') {
    return { message: 'Должно быть не пусто', type: 'submit' };
  }
  if (value.split(' ').length !== 2) {
    return { message: <span>Значение должно состоять из двух слов</span>, type: 'lostfocus' };
  }
  return null;
};

export const TwoWordsRequired = () => {
  const [value, setValue] = useState<string>('');

  const validateValue = (value: string): Nullable<ValidationInfo> => {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: 'Значение должно состоять из двух слов', type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ width: 300, height: 80 }}>
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper validationInfo={validateValue(value)} renderMessage={text('bottom')}>
            <Input data-tid="test-input" value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #2 ReactElement в сообщении
export const ReactElementInMessage = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ width: 300, height: 80 }}>
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper validationInfo={validateValue(value)} renderMessage={text('bottom')}>
            <Input data-tid="test-input" value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #3 Промотка сообщении
export const ScrollMessage = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  const submit = () => refContainer.current?.submit();

  return (
    <div>
      <ValidationContainer ref={refContainer}>
        <div data-tid="wrapper-to-scroll" style={{ padding: 10 }}>
          <Button data-tid="top-submit" onClick={() => submit()}>
            Отправить
          </Button>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <ValidationWrapper validationInfo={validateValue(value)} renderMessage={text('bottom')}>
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
          <Button data-tid="center-submit" onClick={() => submit()}>
            Отправить
          </Button>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <Button data-tid="bottom-submit" onClick={() => submit()}>
            Отправить
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #4 Зависимые поля
export const DependentFields = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');
  const [sex, setSex] = useState<Nullable<Sex>>(null);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (sex !== null && value !== sex) {
      return { message: <span>Значение должно быть равно type.</span>, type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ width: 800, height: 80 }}>
      <ValidationContainer ref={refContainer}>
        <div style={{ padding: 10 }}>
          <Select<Nullable<Sex>> data-tid="select" items={['male', 'female']} value={sex} onValueChange={setSex} />
          <ValidationWrapper validationInfo={validateValue()} renderMessage={text('bottom')}>
            <Input data-tid="test-input" value={value} onValueChange={setValue} />
          </ValidationWrapper>
          <div style={{ height: 100, backgroundColor: '#eee' }} />
          <Button data-tid="submit" onClick={() => refContainer.current?.submit()}>
            Отправить
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #5 Промотка внутри котейнера
export const ScrollInsideTheContainer = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ width: 250, height: 500 }}>
      <ValidationContainer ref={refContainer}>
        <div style={{ padding: 50 }}>
          <br />
          <br />
          <br />
          <br />
          <div style={{ height: 300, width: 300, overflow: 'scroll' }}>
            <div style={{ height: 1000, width: 1000, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 500, left: 500 }}>
                <ValidationWrapper validationInfo={validateValue(value)} renderMessage={text('bottom')}>
                  <Input value={value} onValueChange={setValue} />
                </ValidationWrapper>
              </div>
            </div>
          </div>
          <Button data-tid="submit" onClick={() => refContainer.current?.submit()}>
            Отправить
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #6 Выбор первого контрола для валидации
export const SelectFirstControlForValidation = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const validateValue1 = (): Nullable<ValidationInfo> => {
    if (value1 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value1.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  };

  const validateValue2 = (): Nullable<ValidationInfo> => {
    if (value2 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value2.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ height: '300', width: '300' }}>
      <ValidationContainer ref={refContainer}>
        <div style={{ padding: 50, height: 200, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 100 }}>
            <ValidationWrapper validationInfo={validateValue1()}>
              <Input value={value1} onValueChange={setValue1} />
            </ValidationWrapper>
          </div>
          <div style={{ position: 'absolute', top: 20 }}>
            <ValidationWrapper validationInfo={validateValue2()}>
              <Input value={value2} onValueChange={setValue2} />
            </ValidationWrapper>
          </div>
        </div>
        <Button data-tid="submit" onClick={() => refContainer.current?.submit()}>
          Отправить
        </Button>
      </ValidationContainer>
    </div>
  );
};

// #7 Три невалидных поля по сабмиту
export const ThreeInvalidInputOnSubmit = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <ValidationContainer ref={refContainer}>
      <div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper validationInfo={validateValue(value1)}>
            <Input value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper validationInfo={validateValue(value2)}>
            <Input value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper validationInfo={validateValue(value3)}>
            <Input value={value3} onValueChange={setValue3} />
          </ValidationWrapper>
        </div>
      </div>
      <Button onClick={() => refContainer.current?.submit()}>Отправить</Button>
    </ValidationContainer>
  );
};

// #8 Промотка с фиксированной плашкой снизу
export const ScrollWithFixedPlaceBottom = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  const submit = () => refContainer.current?.submit();

  return (
    <div style={{ width: '100vw' }}>
      <ValidationContainer ref={refContainer} scrollOffset={{ top: 150, bottom: 150 }}>
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: 0,
            right: 0,
            left: 0,
            background: '#1e79be',
            padding: 10,
            height: 80,
          }}
        >
          <Button onClick={() => submit()}>Отправить сверху</Button>
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ height: 600, backgroundColor: '#eee' }} />
          <ValidationWrapper validationInfo={validateValue(value)}>
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
        </div>
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: 600,
            right: 0,
            left: 0,
            bottom: 0,
            background: '#1e79be',
            padding: 10,
            height: 80,
          }}
        >
          <Button data-tid="submit" onClick={() => submit()}>
            Отправить снизу
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

// #9 lostfocus не срабатывает после первого рендера  И так тестится
export const LostfocusNotWorkAfterFirstRender = () => {
  const [value, setValue] = useState<string>('');

  const validateValue = (): Nullable<ValidationInfo> => (!value ? { message: 'Error msg', type: 'lostfocus' } : null);

  return (
    <ValidationContainer>
      <div style={{ padding: 10 }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={text('bottom')}>
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

// #10 валидация формы с level = warning
export const ValidationWithLevelWarning = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [immediate, setImmediate] = useState<string>('');
  const [lostfocus, setLostfocus] = useState<string>('');
  const [submit, setSubmit] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const renderFormState = () => {
    switch (isValid) {
      case null:
        return <b>Отправьте форму</b>;
      case false:
        return <b style={{ color: '#d70c17' }}>Форма невалидна</b>;
      case true:
        return <b style={{ color: '#5199db' }}>Форма валидна</b>;
      default:
        throw new Error('Invalid state');
    }
  };

  const validate = (v: string, type: ValidationBehaviour): ValidationInfo | null => {
    return !/^\d*$/.test(v) ? { message: 'Только цифры', level: 'warning', type } : null;
  };

  const handleChange = (setState: () => void) => {
    setState();
    setIsValid(null);
  };

  const handleSubmit = async () => {
    const isValid = (await refContainer.current?.validate()) ?? false;
    setIsValid(isValid);
  };

  return (
    <div style={{ padding: 5, width: 350, height: 200 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validate(immediate, 'immediate')} data-strange="brrr">
          <Input
            data-tid="immediate-validation-input"
            placeholder={'Только цифры'}
            value={immediate}
            onValueChange={(value) => handleChange(() => setImmediate(value))}
          />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper validationInfo={validate(lostfocus, 'lostfocus')} data-strange="brrr">
          <Input
            data-tid="lostfocus-validation-input"
            placeholder={'Только цифры'}
            value={lostfocus}
            onValueChange={(value) => handleChange(() => setLostfocus(value))}
          />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper validationInfo={validate(submit, 'submit')} data-strange="brrr">
          <Input
            data-tid="submit-validation-input"
            placeholder={'Только цифры'}
            value={submit}
            onValueChange={(value) => handleChange(() => setSubmit(value))}
          />
        </ValidationWrapper>
        <br />
        <br />
        <Gapped wrap verticalAlign="middle">
          <Button data-tid="submit" use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
          {renderFormState()}
        </Gapped>
      </ValidationContainer>
    </div>
  );
};

// #11 задание ширины в процентах
export const SetPercentageWidth = () => {
  const refContainer = useRef<ValidationContainer>(null);

  return (
    <form
      style={{ width: '600px' }}
      onSubmit={(e) => {
        e.preventDefault();
        refContainer.current?.submit();
      }}
    >
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper
          renderMessage={tooltip('left middle')}
          validationInfo={{ message: 'Ошибка!', type: 'submit' }}
        >
          <Input width="100%" placeholder={'Валидация'} />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper renderMessage={text('bottom')} validationInfo={{ message: 'Ошибка!', type: 'submit' }}>
          <Input width="100%" placeholder={'Валидация'} />
        </ValidationWrapper>
      </ValidationContainer>
      <br />
      <br />
      <br />
      <Button use="success" width="100%" type="submit">
        Ок
      </Button>
    </form>
  );
};

// #12 Tooltip сверху-слева при невалидности
export const TooltipTopLeft: Story = () => {
  const [value, setValue] = useState<string>('');
  const validateValue = (): Nullable<ValidationInfo> =>
    !/^\d{10}$|^\d{12}$/.test(value) ? { message: 'Неверный ИНН', type: 'lostfocus' } : null;

  return (
    <ValidationContainer>
      <div style={{ paddingTop: 60 }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('top left')}>
          <Input data-tid="test-input" value={value} onValueChange={setValue} placeholder={'Введите ИНН'} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

// #13 Все возможные положения Tooltip'а
export const AllPossibleValidationTooltipPositions: Story = () => {
  const value = 'test';
  const validateValue = (): Nullable<ValidationInfo> =>
    !/^\d{10}$|^\d{12}$/.test(value) ? { message: 'Неверный ИНН', type: 'immediate' } : null;

  const commonDivStyles: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
  };

  const commonRowStyles: React.CSSProperties = {
    left: '50px',
    right: '50px',
    flexDirection: 'row',
    justifyContent: 'space-around',
  };

  const commonColumnStyles: React.CSSProperties = {
    top: '50px',
    bottom: '50px',
    flexDirection: 'column',
    justifyContent: 'space-around',
  };

  return (
    <ValidationContainer>
      <div style={{ ...commonDivStyles, ...commonRowStyles, bottom: '0px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('top left')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('top center')}>
          <Input value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('top right')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
      </div>

      <div style={{ ...commonDivStyles, ...commonRowStyles, top: '0px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('bottom left')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('bottom center')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('bottom right')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
      </div>

      <div style={{ ...commonDivStyles, ...commonColumnStyles, left: '0px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('right top')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('right middle')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('right bottom')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
      </div>

      <div style={{ ...commonDivStyles, ...commonColumnStyles, right: '0px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('left top')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('left middle')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={tooltip('left bottom')}>
          <Input data-tid="test-input" value={value} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};
// Не скриншотится, так как это можно проверить только минимум 6-ю скриншотами (на один Input кликнуть и навестись на другой).
// В принципе, при ошибках в позиционировании Tooltip'а должны упасть другие скриншоты
AllPossibleValidationTooltipPositions.parameters = { creevey: { skip: true } };

// #14 Все возможные положения текстовой валидации
export const AllPossibleValidationTextPositions: Story = () => {
  const value = 'test';
  const validateValue = (): Nullable<ValidationInfo> =>
    !/^\d{10}$|^\d{12}$/.test(value) ? { message: 'Неверный ИНН', type: 'immediate' } : null;

  return (
    <ValidationContainer>
      <div style={{ marginTop: '10px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={text('bottom')}>
          <Input value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={text('right')}>
          <Input value={value} />
        </ValidationWrapper>
      </div>

      <div style={{ marginTop: '50px' }}>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={text('right')}>
          <Input value={value} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validateValue()} renderMessage={text('bottom')}>
          <Input value={value} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

// #15 Прокидывание data-tid'а на сообщение валидации
export const DataTidOnValidation: Story = () => {
  const [value, setValue] = useState<string>('');
  const validateValue = (): Nullable<ValidationInfo> =>
    !/^\d{10}$|^\d{12}$/.test(value) ? { message: 'Неверный ИНН', type: 'lostfocus' } : null;

  return (
    <ValidationContainer>
      <div style={{ paddingTop: 60 }}>
        <ValidationWrapper
          width="100px"
          data-tid="STRANGE WRAPPER"
          validationInfo={validateValue()}
          renderMessage={tooltip('top left')}
        >
          <Input data-tid="test-input" value={value} onValueChange={setValue} placeholder={'Введите ИНН'} />
        </ValidationWrapper>
        <ValidationWrapper data-tid="STRANGE WRAPPER" validationInfo={validateValue()} renderMessage={text('right')}>
          <Input data-tid="test-input" value={value} onValueChange={setValue} placeholder={'Введите ИНН'} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};
DataTidOnValidation.parameters = { creevey: { skip: true } };
