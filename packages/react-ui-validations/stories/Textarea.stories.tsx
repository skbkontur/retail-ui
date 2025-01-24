import React from 'react';
import { Meta } from '@storybook/react';
import { Textarea } from '@skbkontur/react-ui';

import { text, tooltip, ValidationContainer, ValidationWrapper } from '../src';

export default {
  title: 'Textarea',
} as Meta;

export const Required = () => {
  return (
    <div style={{ padding: 20, width: 400, height: 450 }}>
      <ValidationContainer>
        <ValidationWrapper
          renderMessage={tooltip('right top')}
          validationInfo={{ message: 'Поле обязательно', type: 'immediate' }}
        >
          <Textarea data-tid="textarea-with-right-tooltip" rows={4} value={'Тестируем многострочную валидацию'} />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper
          renderMessage={tooltip('bottom left')}
          validationInfo={{ message: 'Поле обязательно', type: 'immediate' }}
        >
          <Textarea data-tid="textarea-with-bottom-tooltip" rows={4} value={'Тестируем многострочную валидацию'} />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper
          renderMessage={text('bottom')}
          validationInfo={{ message: 'Поле обязательно', type: 'immediate' }}
        >
          <Textarea data-tid="textarea-with-bottom-text" rows={4} value={'Тестируем многострочную валидацию'} />
        </ValidationWrapper>
        <br />
        <br />
        <ValidationWrapper
          renderMessage={text('right')}
          validationInfo={{ message: 'Поле обязательно', type: 'immediate' }}
        >
          <Textarea data-tid="textarea-with-right-text" rows={4} value={'Тестируем многострочную валидацию'} />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};
