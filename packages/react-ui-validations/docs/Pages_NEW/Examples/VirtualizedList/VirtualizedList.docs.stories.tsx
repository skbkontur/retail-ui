import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { FixedSizeList as List } from 'react-window';
import { Token } from '@skbkontur/react-ui';

import { createValidator, ValidationContainer, ValidationListWrapper, ValidationWrapper } from '../../../../src';

export default {
  title: 'Examples/Virtualized List example',
  parameters: { creevey: { skip: true } },
} as Meta;


interface Data {
  title: string;
  value: {
    subtitle: string;
    value: number;
  };
}

export const VirtualizedListExample: Story = () => {
  const containerRef = React.useRef<ValidationContainer>(null);
  const listRef = React.useRef<List | null>(null);
  const [firstInvalidRow, setFirstInvalidRow] = React.useState<number | null>(null);

  const data: Data[] = new Array(100).fill(0).map((_, i) => ({
    title: `title ${i}`,
    value: { subtitle: `subtitle ${i}`, value: i },
  }));
  const values = {
    array: data,
  };

  const validator = createValidator<{ array: Data[]; }>((b) => {
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
  });


  const validationRules = validator(values);
  const [isValid, setIsValid] = React.useState(true);
  const handleValidate = async () => {
    const result = await containerRef.current?.validate();
    setIsValid(!!result);
  };

  return (
    <ValidationContainer ref={containerRef}>
      <div style={{ display: 'flex', width: '400px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', width: '400px', flexDirection: 'column' }}>
          {firstInvalidRow ? `first invalid row is ${firstInvalidRow}` : null}
          <ValidationListWrapper
            validationInfos={validationRules.getNode((x) => x.array)}
            onValidation={(index) => setFirstInvalidRow(index)}
            scrollToElement={(index) => {
              listRef.current?.scrollToItem(index, 'center');
            }}
            behaviour="submit"
          >
            <List
              height={400}
              itemCount={data.length}
              itemSize={30}
              width={400}
              ref={listRef}
              itemData={data}
              children={({ index, style, data }) => {
                return (
                  <div style={{ ...style, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div>строка {data[index].value.value}</div>
                    <div>
                      {data[index].title}
                      <ValidationWrapper
                        validationInfo={validationRules.getNode((x) => x.array).getNodeByIndex(index).getNode((x) => x.value.value).get()}>
                        <Token>{data[index].value.subtitle}</Token>
                      </ValidationWrapper>
                    </div>
                  </div>
                );
              }}
            />
          </ValidationListWrapper>
        </div>
        <Button onClick={handleValidate}>validate</Button>
        <span>isValid {isValid.toString()}</span>
      </div>
    </ValidationContainer>
  );
};
