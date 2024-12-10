import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo, text, tooltip } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Displaying/Error messages',
  parameters: { creevey: { skip: true } },
} as Meta;

export const TextValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');

  function renderInput() {
    return <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />;
  }

  function validate(value: string): Nullable<ValidationInfo> {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'lostfocus' };
    }
    return null;
  }

  const validationInfo = validate(value);

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="text()">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text()}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="text('right')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text('right')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="text('bottom')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text('bottom')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const TooltipValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  function renderInput() {
    return <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />;
  }

  function validate(value: string): Nullable<ValidationInfo> {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'lostfocus' };
    }
    return null;
  }

  const validationInfo = validate(value);
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="default">
          <ValidationWrapper validationInfo={validationInfo}>{renderInput()}</ValidationWrapper>
        </Form.Line>
        <Form.Line title="tooltip('right top')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('right top')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="tooltip('top left')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('top left')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};
