import { IconHandThumbDownRegular16 } from '@skbkontur/icons/IconHandThumbDownRegular16';
import { IconHandThumbUpRegular16 } from '@skbkontur/icons/IconHandThumbUpRegular16';
import { Autocomplete } from '@skbkontur/react-ui/components/Autocomplete/index';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/index';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker/index';
import { DateRangePicker } from '@skbkontur/react-ui/components/DateRangePicker/index';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Link } from '@skbkontur/react-ui/components/Link/index';
import { MaskedInput } from '@skbkontur/react-ui/components/MaskedInput/MaskedInput';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup';
import { Select } from '@skbkontur/react-ui/components/Select/index';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher';
import { Textarea } from '@skbkontur/react-ui/components/Textarea/index';
import { TimePicker } from '@skbkontur/react-ui/components/TimePicker/TimePicker';
import { TokenInput, TokenInputType } from '@skbkontur/react-ui/components/TokenInput/TokenInput';
import React from 'react';

import { ValidationContainer, ValidationWrapper, createValidator, text, tooltip } from '../../../index.js';
import type { RenderErrorMessage, ValidationBehaviour, ValidationLevel } from '../../../index.js';
import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/Types.js';

const meta: Meta = {
  title: 'Showcase',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleShowcase: Story = () => {
  interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    contactMethod: Nullable<string>;
    sex: Nullable<'male' | 'female'>;
    city: Nullable<string>;
    position: string;
    tariff: Nullable<string>;
    skills: string[];
    born: string;
    callTime: Nullable<string>;
    vacationStart: string;
    vacationEnd: string;
    about: string;
    confirmed: boolean;
    clicked: boolean;
  }

  function toTime(date: string): number {
    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  const cities = ['Екатеринбург', 'Москва', 'Новосибирск', 'Санкт-Петербург'];
  const positions = ['Аналитик', 'Бухгалтер', 'Дизайнер', 'Менеджер', 'Разработчик', 'Тестировщик'];
  const skills = ['React', 'TypeScript', 'CSS', 'Node.js', 'GraphQL', 'Figma'];

  const [type, setType] = React.useState<ValidationBehaviour>('submit');
  const [level, setLevel] = React.useState<ValidationLevel>('error');
  const [messageView, setMessageView] = React.useState<string>('tooltip');

  const validate = React.useMemo(
    () =>
      createValidator<ContactInfo>((b, root) => {
        b.prop(
          (x) => x.name,
          (b) => {
            b.invalid((x) => !x, 'Укажите имя', type, level);
          },
        );
        b.prop(
          (x) => x.email,
          (b) => {
            b.invalid((x) => !x, 'Укажите почту', type, level);
            b.invalid((x) => !x.includes('@'), 'Неверный формат почты', type, level);
          },
        );
        b.prop(
          (x) => x.phone,
          (b) => {
            b.invalid((x) => !x, 'Укажите телефон', type, level);
            b.invalid((x) => !/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(x), 'Неверный формат телефона', type, level);
          },
        );
        b.prop(
          (x) => x.contactMethod,
          (b) => {
            b.invalid((x) => !x, 'Выберите способ связи', type, level);
          },
        );
        b.prop(
          (x) => x.sex,
          (b) => {
            b.invalid((x) => !x, 'Укажите пол', type, level);
          },
        );
        b.prop(
          (x) => x.city,
          (b) => {
            b.invalid((x) => !x, 'Выберите город', type, level);
          },
        );
        b.prop(
          (x) => x.position,
          (b) => {
            b.invalid((x) => !x, 'Укажите должность', type, level);
          },
        );
        b.prop(
          (x) => x.tariff,
          (b) => {
            b.invalid((x) => !x, 'Выберите тариф', type, level);
          },
        );
        b.prop(
          (x) => x.skills,
          (b) => {
            b.invalid((x) => x.length === 0, 'Добавьте хотя бы один навык', type, level);
          },
        );
        b.prop(
          (x) => x.born,
          (b) => {
            b.invalid((x) => !x, 'Укажите дату рождения', type, level);
          },
        );
        b.prop(
          (x) => x.callTime,
          (b) => {
            b.invalid((x) => !x, 'Укажите время звонка', type, level);
          },
        );
        b.prop(
          (x) => x.vacationStart,
          (b) => {
            b.invalid((x) => !x, 'Укажите дату начала', type, level);
          },
        );
        b.prop(
          (x) => x.vacationEnd,
          (b) => {
            b.invalid((x) => !x, 'Укажите дату окончания', type, level);
            b.invalid(
              (x) => Boolean(root.vacationStart) && toTime(x) < toTime(root.vacationStart),
              'Раньше начала',
              type,
              level,
            );
          },
        );
        b.prop(
          (x) => x.about,
          (b) => {
            b.invalid((x) => !x, 'Расскажите о себе', type, level);
            b.invalid((x) => x.trim().length < 10, 'Минимум 10 символов', type, level);
          },
        );
        b.prop(
          (x) => x.confirmed,
          (b) => {
            b.invalid((x) => !x, 'Примите условия', type, level);
          },
        );
        b.prop(
          (x) => x.clicked,
          (b) => {
            b.invalid((x) => !x, 'Нажмите на ссылку', type, level);
          },
        );
      }),
    [type, level],
  );

  const container = React.useRef<ValidationContainer>(null);
  const [isSent, setIsSent] = React.useState<boolean | null>(null);
  const [data, setData] = React.useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    contactMethod: null,
    sex: null,
    city: null,
    position: '',
    tariff: null,
    skills: [],
    born: '',
    callTime: null,
    vacationStart: '',
    vacationEnd: '',
    about: '',
    confirmed: false,
    clicked: false,
  });

  function handleChange(data: Partial<ContactInfo>): void {
    setData((prevData) => ({ ...prevData, ...data }));
    setIsSent(null);
  }

  async function handleSubmit(): Promise<void> {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const renderMessages: Record<string, RenderErrorMessage> = {
    tooltip: tooltip('right top'),
    text: text('bottom'),
  };
  const renderMessage = renderMessages[messageView];

  const validationInfo = validate(data);

  const sectionTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 10,
  };

  // text('bottom') позиционируется абсолютно, поэтому под полем оставляем для него место
  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 16,
    marginBottom: messageView === 'text' ? 32 : 16,
  };
  const labelStyle: React.CSSProperties = { width: 140, flexShrink: 0, textAlign: 'right' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap' }}>
        <div>
          <div style={sectionTitle}>Тип (type)</div>
          <Switcher
            value={type}
            onValueChange={(value) => setType(value as ValidationBehaviour)}
            items={['submit', 'lostfocus', 'immediate']}
          />
        </div>
        <div>
          <div style={sectionTitle}>Уровень (level)</div>
          <Switcher
            value={level}
            onValueChange={(value) => setLevel(value as ValidationLevel)}
            items={['error', 'warning']}
          />
        </div>
        <div>
          <div style={sectionTitle}>Сообщение</div>
          <Switcher value={messageView} onValueChange={setMessageView} items={Object.keys(renderMessages)} />
        </div>
      </div>

      <hr style={{ width: '100%', height: 0, margin: '24px 0', border: 0, borderTop: '1px solid #e2e7eb' }} />

      <ValidationContainer ref={container}>
        <div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Имя</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.name).get()}
              renderMessage={renderMessage}
            >
              <Input value={data.name} onValueChange={(value) => handleChange({ name: value })} />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Почта</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.email).get()}
              renderMessage={renderMessage}
            >
              <Input value={data.email} onValueChange={(value) => handleChange({ email: value })} />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Телефон</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.phone).get()}
              renderMessage={renderMessage}
            >
              <MaskedInput
                mask="+7 999 999-99-99"
                value={data.phone}
                onValueChange={(value) => handleChange({ phone: value })}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Способ связи</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.contactMethod).get()}
              renderMessage={renderMessage}
            >
              <Switcher
                value={data.contactMethod ?? undefined}
                onValueChange={(value) => handleChange({ contactMethod: value })}
                items={['Почта', 'Телефон', 'Мессенджер']}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Пол</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.sex).get()}
              renderMessage={renderMessage}
            >
              <RadioGroup<ContactInfo['sex']>
                value={data.sex}
                onValueChange={(value) => handleChange({ sex: value })}
                items={['male', 'female']}
                renderItem={(x) => <span>{x === 'male' ? 'Мужской' : 'Женский'}</span>}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Город</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.city).get()}
              renderMessage={renderMessage}
            >
              <ComboBox<string>
                valueToString={(x) => x}
                renderValue={(x) => x}
                renderItem={(x) => x}
                itemToId={(x) => x}
                value={data.city}
                onValueChange={(value) => handleChange({ city: value })}
                getItems={async (query) =>
                  query ? cities.filter((x) => x.toLocaleUpperCase().includes(query.toLocaleUpperCase())) : cities
                }
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Должность</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.position).get()}
              renderMessage={renderMessage}
            >
              <Autocomplete
                source={positions}
                value={data.position}
                onValueChange={(value) => handleChange({ position: value })}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Тариф</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.tariff).get()}
              renderMessage={renderMessage}
            >
              <Select<ContactInfo['tariff'], string>
                items={['Базовый', 'Расширенный', 'Максимальный']}
                value={data.tariff}
                onValueChange={(value) => handleChange({ tariff: value })}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Навыки</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.skills).get()}
              renderMessage={renderMessage}
            >
              <TokenInput<string>
                type={TokenInputType.Combined}
                width={250}
                selectedItems={data.skills}
                onValueChange={(value) => handleChange({ skills: value })}
                getItems={async (query) =>
                  skills.filter(
                    (x) => !data.skills.includes(x) && x.toLocaleUpperCase().includes(query.toLocaleUpperCase()),
                  )
                }
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Дата рождения</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.born).get()}
              renderMessage={renderMessage}
            >
              <DatePicker value={data.born} onValueChange={(value) => handleChange({ born: value })} />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Время звонка</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.callTime).get()}
              renderMessage={renderMessage}
            >
              <TimePicker value={data.callTime} onValueChange={(value) => handleChange({ callTime: value })} />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Отпуск</div>
            <DateRangePicker>
              <ValidationWrapper
                validationInfo={validationInfo.getNode((x) => x.vacationStart).get()}
                renderMessage={renderMessage}
              >
                <DateRangePicker.Start
                  value={data.vacationStart}
                  onValueChange={(value) => handleChange({ vacationStart: value })}
                />
              </ValidationWrapper>
              <DateRangePicker.Separator />
              <ValidationWrapper
                validationInfo={validationInfo.getNode((x) => x.vacationEnd).get()}
                renderMessage={renderMessage}
              >
                <DateRangePicker.End
                  value={data.vacationEnd}
                  onValueChange={(value) => handleChange({ vacationEnd: value })}
                />
              </ValidationWrapper>
            </DateRangePicker>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>О себе</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.about).get()}
              renderMessage={renderMessage}
            >
              <Textarea
                placeholder="Не меньше 10 символов"
                value={data.about}
                onValueChange={(value) => handleChange({ about: value })}
              />
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Условия</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.confirmed).get()}
              renderMessage={renderMessage}
            >
              <Checkbox checked={data.confirmed} onValueChange={(value) => handleChange({ confirmed: value })}>
                Принимаю
              </Checkbox>
            </ValidationWrapper>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Ссылка</div>
            <ValidationWrapper
              validationInfo={validationInfo.getNode((x) => x.clicked).get()}
              renderMessage={renderMessage}
            >
              <Link
                icon={data.clicked ? <IconHandThumbUpRegular16 /> : <IconHandThumbDownRegular16 />}
                onClick={() => handleChange({ clicked: !data.clicked })}
              >
                Нажми меня
              </Link>
            </ValidationWrapper>
          </div>

          <div style={{ paddingLeft: 156 }}>
            <Button use="accent" onClick={handleSubmit}>
              Отправить
            </Button>{' '}
            {isSent === true && 'Форма отправлена'}
            {isSent === false && 'Исправьте ошибки'}
          </div>
        </div>
      </ValidationContainer>
    </div>
  );
};
ExampleShowcase.storyName = 'Шоукейс';
