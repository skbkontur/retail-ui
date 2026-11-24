import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader/FileUploader';
import type { FileUploaderAttachedFile } from '@skbkontur/react-ui/components/FileUploader/index';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { ValidationBehaviour, ValidationInfo } from '../index.js';
import type { Nullable } from '../typings/Types.js';

const meta: Meta = {
  title: 'FileUploader',
};

export default meta;

export const Required = () => {
  const [value, setValue] = useState<FileUploaderAttachedFile[]>([]);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (!value.length) {
      return { message: 'Поле обязательно', type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <ValidationContainer>
        <ValidationWrapper validationInfo={validateValue()}>
          <FileUploader multiple onValueChange={setValue} />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

interface ValidationExampleProps {
  validationType: ValidationBehaviour;
}

const ValidationExample = ({ validationType }: ValidationExampleProps) => {
  const container = useRef<ValidationContainer>(null);
  const [initialFiles] = useState(() =>
    [1, 2, 3].map((n) => new File(['content'], `file-${n}.txt`, { type: 'text/plain' })),
  );
  const [count, setCount] = useState(initialFiles.length);
  const [formKey, setFormKey] = useState(0);

  const restart = () => {
    setCount(initialFiles.length);
    setFormKey((value) => value + 1);
  };

  return (
    <div style={{ padding: 40 }}>
      <ValidationContainer ref={container} key={formKey}>
        <ValidationWrapper
          validationInfo={
            count > 1
              ? { type: validationType, message: `Можно прикрепить не больше одного файла. Прикреплено: ${count}.` }
              : null
          }
        >
          <FileUploader multiple initialFiles={initialFiles} onValueChange={(files) => setCount(files.length)} />
        </ValidationWrapper>
      </ValidationContainer>
      <p>Файлов: {count}</p>
      <Gapped gap={12}>
        <Button onClick={() => container.current?.validate(true)}>Проверить форму</Button>
        <Button onClick={restart}>Начать заново</Button>
      </Gapped>
    </div>
  );
};

export const ValidationTypes: StoryObj<ValidationExampleProps> = {
  parameters: {
    creevey: {
      skip: true,
    },
  },
  args: {
    validationType: 'submit',
  },
  argTypes: {
    validationType: {
      control: 'select',
      options: ['submit', 'lostfocus', 'immediate'],
      description: 'Когда показывать сообщение валидации',
    },
  },
  render: ({ validationType }) => <ValidationExample key={validationType} validationType={validationType} />,
};
