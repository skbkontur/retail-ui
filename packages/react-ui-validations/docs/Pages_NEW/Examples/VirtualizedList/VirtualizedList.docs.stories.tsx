import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React, { useState } from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { FixedSizeList as List } from 'react-window';
import { Checkbox, Gapped, Input, Token } from '@skbkontur/react-ui';

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

  const validator = createValidator<{ array: Data[] }>((b) => {
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
                    b.invalid(() => true, 'invalid sub');
                  },
                );
                b.prop(
                  (x) => x.value,
                  (b) => {
                    b.invalid((x) => x > 40, 'invalid', 'submit');
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
              itemSize={42}
              width={400}
              ref={listRef}
              itemData={data}
              children={({ index, style, data }) => {
                return (
                  <div style={{ ...style, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* <div>Cтрока {data[index].value.value}</div> */}
                    <div style={{ padding: 6 }}>
                      {/* {data[index].title} */}
                      <ValidationWrapper
                        validationInfo={validationRules
                          .getNode((x) => x.array)
                          .getNodeByIndex(index)
                          .getNode((x) => x.value.value)
                          .get()}
                      >
                        <Input value={data[index].value.value} />
                      </ValidationWrapper>
                    </div>
                  </div>
                );
              }}
            />
          </ValidationListWrapper>
        </div>
        <br />
        <Button onClick={handleValidate}>submit</Button>
        <span>isValid {isValid.toString()}</span>
      </div>
    </ValidationContainer>
  );
};

export const VirtualizedListExample2: Story = () => {
  const containerRef = React.useRef<ValidationContainer>(null);
  const [inn, setInn] = React.useState('');
  const [kpp, setKpp] = React.useState('');
  const [showKpp, setShowKpp] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);
  const handleValidate = async () => {
    const result = await containerRef.current?.validate();
    setIsValid(!!result);
    console.log(result);
  };

  return (
    <ValidationContainer ref={containerRef}>
      <Gapped vertical>
        <Gapped>
          <span>INN</span>
          <ValidationWrapper validationInfo={!inn ? { message: 'required', type: 'submit' } : null}>
            <Input value={inn} onValueChange={setInn} />
          </ValidationWrapper>
          <Checkbox checked={showKpp} onValueChange={setShowKpp}>
            Show KPP
          </Checkbox>
        </Gapped>

        {showKpp && (
          <Gapped>
            <span>KPP</span>
            <ValidationWrapper validationInfo={!kpp ? { message: 'required', type: 'submit' } : null}>
              <Input value={kpp} onValueChange={setKpp} />
            </ValidationWrapper>
          </Gapped>
        )}
        <Button onClick={handleValidate}>submit</Button>
        <span>isValid {isValid.toString()}</span>
      </Gapped>
    </ValidationContainer>
  );
};
