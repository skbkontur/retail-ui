import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Token } from '@skbkontur/react-ui';
import { FixedSizeList as List } from 'react-window';

import {
  createValidator,
  ValidationContainer,
  ValidationReader,
  ValidationWrapper,
  ValidationListWrapper,
} from '../src';

interface Props {
  data: Data;
  index: number;
  validationReader: ValidationReader<Data>;
  style?: React.CSSProperties;
}

const SimpleElement = ({ data: value, validationReader, style }: Props) => {
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', gap: 4 }}>
      <div>строка {value.value.value}</div>
      <div>
        {value.title}
        <ValidationWrapper validationInfo={validationReader.getNode((x) => x.value.value).get()}>
          <Token>{value.value.subtitle}</Token>
        </ValidationWrapper>
      </div>
    </div>
  );
};

interface WindowProps {
  rowHeight: number;
  gap?: number;
  data: Data[];
  validationInfos: ValidationReader<Data[]>;
}

const Window: React.FC<WindowProps> = ({ rowHeight, data, validationInfos }) => {
  const containerRef = React.useRef<List | null>(null);
  const [firstInvalidRow, setFirstInvalidRow] = React.useState<number | null>(null);

  return (
    <div style={{ display: 'flex', width: '400px', flexDirection: 'column' }}>
      {firstInvalidRow ? `first invalid row is ${firstInvalidRow}` : null}
      <ValidationListWrapper
        validationInfos={validationInfos.getFirstNodeWithValidation()}
        onValidation={(index) => setFirstInvalidRow(index)}
        scrollToElement={(index) => {
          containerRef.current?.scrollToItem(index, 'center');
        }}
      >
        <List
          height={400}
          itemCount={data.length}
          itemSize={rowHeight}
          width={400}
          ref={containerRef}
          itemData={data}
          children={({ index, style, data }) => {
            return (
              <SimpleElement
                data={data[index]}
                key={index}
                index={index}
                style={style}
                validationReader={validationInfos.getNodeByIndex(index)}
              />
            );
          }}
        />
      </ValidationListWrapper>
    </div>
  );
};

const validator = createValidator<{ template: Data; array: Data[]; secondTemplate: Data }>((b) => {
  b.prop(
    (x) => x.array,
    (b) => {
      b.array(
        (x) => x,
        (b) => {
          b.prop(
            (x) => x.value,
            (b) => {
              b.prop(
                (x) => x.subtitle,
                (b) => {
                  b.invalid(() => true, 'invlid sub');
                },
              );
              b.prop(
                (x) => x.value,
                (b) => {
                  b.invalid((x) => x > 40, 'invalid', 'immediate');
                },
              );
            },
          );
        },
      );
    },
  );
  b.prop(
    (x) => x.template,
    (b) => {
      b.invalid(() => true, 'kek');
    },
  );
});

interface Data {
  title: string;
  value: {
    subtitle: string;
    value: number;
  };
}

export const Default = () => {
  const containerRef = React.useRef<ValidationContainer>(null);
  const data: Data[] = new Array(100).fill(0).map((_, i) => ({
    title: `title ${i}`,
    value: { subtitle: `subtitle ${i}`, value: i },
  }));
  const values = {
    template: { title: 'titke', value: { subtitle: 'sub', value: 90 } },
    array: data,
    secondTemplate: { title: 'titke', value: { subtitle: 'sub', value: 90 } },
  };
  const createValidator = validator(values);
  const [isValid, setIsValid] = React.useState(true);
  const handleValidate = async () => {
    const result = await containerRef.current?.validate();
    setIsValid(!!result);
  };

  return (
    <ValidationContainer ref={containerRef}>
      <div style={{ display: 'flex', width: '400px', flexDirection: 'column' }}>
        <Window rowHeight={30} data={data} validationInfos={createValidator.getNode((x) => x.array)} />
        <Button onClick={handleValidate}>validate</Button>
        <span>isValid {isValid.toString()}</span>
        <ValidationWrapper validationInfo={createValidator.getNode((x) => x.secondTemplate).get()}>
          <span>заглушка</span>
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};

export default {
  title: 'Virtualize Table',
  parameters: { creevey: { skip: true } },
} as Meta;
