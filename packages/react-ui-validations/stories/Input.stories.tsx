import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import { CSFStory } from 'creevey';

import { text, ValidationContainer, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

import { submit, validateValue } from './tools/tools';

export default { title: `Input` };

export const Example1: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <ValidationContainer>
      <div style={{ padding: 10 }}>
        <ValidationWrapper
          validationInfo={validateValue(value, value.split(' ').length !== 2, 'Значение должно состоять из двух слов')}
          renderMessage={text('bottom')}
        >
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

export const Example2: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <ValidationContainer>
      <div style={{ padding: 10 }}>
        <ValidationWrapper
          validationInfo={validateValue(
            value,
            value.split(' ').length !== 2,
            <div>Значение должно состоять из двух слов</div>,
          )}
          renderMessage={text('bottom')}
        >
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

export const Example3: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);

  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 10 }}>
        <Button onClick={() => submit(container)}>Отправить</Button>
        <div style={{ height: 1000, backgroundColor: '#eee' }} />
        <ValidationWrapper
          validationInfo={validateValue(value, value.split(' ').length !== 2, 'Значение должно состоять из двух слов')}
          renderMessage={text('bottom')}
        >
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
        <Button onClick={() => submit(container)}>Отправить</Button>
        <div style={{ height: 1000, backgroundColor: '#eee' }} />
        <Button onClick={() => submit(container)}>Отправить</Button>
      </div>
    </ValidationContainer>
  );
};

export const Example4: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
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
        <Button onClick={() => submit(container)}>Отправить сверху</Button>
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ height: 600, backgroundColor: '#eee' }} />
        <ValidationWrapper
          validationInfo={validateValue(value, value.split(' ').length !== 2, 'Значение должно состоять из двух слов')}
        >
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
        <Button onClick={() => submit(container)}>Отправить снизу</Button>
      </div>
    </ValidationContainer>
  );
};

type Sex = 'male' | 'female';

export const Example5: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [type, setType] = React.useState<Nullable<Sex>>(null);
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 10 }}>
        <Select<Nullable<Sex>> items={['male', 'female']} value={type} onValueChange={setType} />
        <ValidationWrapper
          validationInfo={validateValue(value, type !== null && value !== type, `Значение должно быть равно type.`)}
          renderMessage={text('bottom')}
        >
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ height: 1000, backgroundColor: '#eee' }} />
        <Button onClick={() => container && container.submit()}>Отправить</Button>
      </div>
    </ValidationContainer>
  );
};

export const Example6: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 50 }}>
        <br />
        <br />
        <br />
        <br />
        <div style={{ height: 300, width: 300, overflow: 'scroll' }}>
          <div style={{ height: 1000, width: 1000, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 500, left: 500 }}>
              <ValidationWrapper
                validationInfo={validateValue(
                  value,
                  value.split(' ').length !== 2,
                  'Значение должно состоять из двух слов',
                )}
                renderMessage={text('bottom')}
              >
                <Input value={value} onValueChange={setValue} />
              </ValidationWrapper>
            </div>
          </div>
        </div>
        <Button onClick={() => container && container.submit()}>Отправить</Button>
      </div>
    </ValidationContainer>
  );
};

export const Example7: CSFStory<JSX.Element> = () => {
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 50, height: 200, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 100 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value1,
              value1.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </div>
        <div style={{ position: 'absolute', top: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value2,
              value2.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </div>
      </div>
      <Button onClick={() => container && container.submit()}>Отправить</Button>
    </ValidationContainer>
  );
};

export const Example8: CSFStory<JSX.Element> = () => {
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [value3, setValue3] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value1,
              value1.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value2,
              value2.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </div>
        <div style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value3,
              value3.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value3} onValueChange={setValue3} />
          </ValidationWrapper>
        </div>
      </div>
      <Button onClick={() => container && container.submit()}>Отправить</Button>
    </ValidationContainer>
  );
};

// storiesOf('Input', module)
//   .add('#1', () => {
//     return <Example1 />;
//   })
//   .add('#2 ReactElement в сообщении', () => {
//     return <Example2 />;
//   })
//   .add('#3 Промотка сообщении', () => {
//     return <Example3 />;
//   })
//   .add('#4 Промотка с фиксированной плашкой снизу', () => {
//     return <Example4 />;
//   })
//   .add('#5 Зависимые поля', () => {
//     return <Example5 />;
//   })
//   .add('#6 Промотка внутри котейнера', () => {
//     return <Example6 />;
//   })
//   .add('#7 Выбор первого контра для валидации', () => {
//     return <Example7 />;
//   })
//   .add('#8 Три невалидных поля по сабмиту', () => {
//     return <Example8 />;
//   })
