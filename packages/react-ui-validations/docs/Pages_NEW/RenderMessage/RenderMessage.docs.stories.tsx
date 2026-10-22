import { IconWarningCircleRegular16 } from '@skbkontur/icons/IconWarningCircleRegular16';
import { Gapped, Input, Select, Switcher, ThemeContext } from '@skbkontur/react-ui';
import {
  ValidationContainer,
  ValidationsFeatureFlagsContext,
  ValidationWrapper,
  text,
  tooltip,
} from '@skbkontur/react-ui-validations';
import type { RenderErrorMessage, TextPosition, TooltipExtendedPosition } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'RenderMessage',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Функция `tooltip(pos)` показывает сообщение в тултипе в заданной позиции. */
export const ExampleTooltip: Story = () => {
  const positions: TooltipExtendedPosition[] = [
    'right top',
    'right middle',
    'right bottom',
    'top left',
    'top center',
    'bottom left',
    'left middle',
    'top',
    'right',
    'bottom',
    'left',
  ];
  const [pos, setPos] = React.useState<TooltipExtendedPosition>('right top');

  return (
    <ValidationsFeatureFlagsContext.Provider value={{ validationTooltipExtendedPositions: true }}>
      <ValidationContainer>
        <Gapped vertical gap={16}>
          <Select<TooltipExtendedPosition> items={positions} value={pos} onValueChange={setPos} />
          {/* место вокруг поля, чтобы тултип в любой позиции не обрезался */}
          <div style={{ padding: '48px 160px' }}>
            <ValidationWrapper
              validationInfo={{ message: 'Только цифры', type: 'immediate' }}
              renderMessage={tooltip(pos)}
            >
              <Input value="abc" />
            </ValidationWrapper>
          </div>
        </Gapped>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>
  );
};
ExampleTooltip.storyName = 'Тултип';

/** Функция `text(pos)` показывает сообщение текстом справа или снизу от контрола. */
export const ExampleText: Story = () => {
  const [pos, setPos] = React.useState<TextPosition>('bottom');

  return (
    <ValidationContainer>
      <Gapped vertical gap={16}>
        <Switcher value={pos} onValueChange={(value) => setPos(value as TextPosition)} items={['bottom', 'right']} />
        {/* text('bottom') позиционируется абсолютно, оставляем под полем место */}
        <div style={{ paddingBottom: 24 }}>
          <ValidationWrapper validationInfo={{ message: 'Только цифры', type: 'immediate' }} renderMessage={text(pos)}>
            <Input value="abc" />
          </ValidationWrapper>
        </div>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleText.storyName = 'Текст';

/** Цвет текста `text()` зависит от уровня валидации: ошибка — красный, предупреждение — оранжевый. */
export const ExampleTextLevel: Story = () => {
  return (
    <ValidationContainer>
      <Gapped vertical gap={16}>
        <ValidationWrapper validationInfo={{ message: 'Ошибка', type: 'immediate' }} renderMessage={text()}>
          <Input value="level: 'error'" />
        </ValidationWrapper>
        <ValidationWrapper
          validationInfo={{ message: 'Предупреждение', type: 'immediate', level: 'warning' }}
          renderMessage={text()}
        >
          <Input value="level: 'warning'" />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleTextLevel.storyName = 'Текст и уровень';

/** В `renderMessage` можно передать свою функцию. Здесь сообщение выводится под полем с иконкой, а цвет берётся из темы. */
export const ExampleCustomRenderMessage: Story = () => {
  const [value, setValue] = React.useState('123');
  const theme = React.useContext(ThemeContext);

  const renderMessage: RenderErrorMessage = (control, hasError, validation) => (
    <Gapped vertical gap={4}>
      {control}
      {validation && (
        <span
          style={{
            display: 'inline-flex',
            gap: 4,
            alignItems: 'center',
            color: validation.level === 'warning' ? theme.validationsTextColorWarning : theme.validationsTextColorError,
          }}
        >
          <IconWarningCircleRegular16 />
          {validation.message}
        </span>
      )}
    </Gapped>
  );

  function validate() {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'immediate' as const };
    }
    if (value.length !== 10 && value.length !== 12) {
      return { message: 'ИНН состоит из 10 или 12 цифр', type: 'immediate' as const, level: 'warning' as const };
    }
    return null;
  }

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validate()} renderMessage={renderMessage}>
        <Input placeholder="ИНН" value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleCustomRenderMessage.storyName = 'Своё отображение';
