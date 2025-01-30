import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { FixedSizeList as List } from 'react-window';
import { Gapped, Input, ScrollContainer, Switcher } from '@skbkontur/react-ui';

import {
  createValidator,
  ValidationBehaviour,
  ValidationContainer,
  ValidationListWrapper,
  ValidationWrapper,
} from '../../../../src';

export default {
  title: 'Examples/Virtualized List example',
  parameters: { creevey: { skip: true } },
} as Meta;

interface Data {
  title: string;
  value: {
    subtitle: string;
    value: string;
  };
}

export const VirtualizedListExample: Story = () => {
  const containerRef = React.useRef<ValidationContainer>(null);
  const containerVirtualRef = React.useRef<ValidationContainer>(null);

  const listRef = React.useRef<List | null>(null);

  const [firstInvalidRow, setFirstInvalidRow] = React.useState<number | null>(null);

  const [validationType, setValidationType] = React.useState('submit');

  const createItem = (i: number, value: string) => {
    return {
      title: `title ${i}`,
      value: { subtitle: `subtitle ${i}`, value },
    };
  };

  const data: Data[] = new Array(100).fill(0).map((_, i) => createItem(i, String(i)));

  const [values, setValues] = React.useState({ array: data });

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
                    b.invalid((x) => parseInt(x) > 40, 'invalid', validationType as ValidationBehaviour);
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
  const [isValidVirtual, setIsValidVirtual] = React.useState(true);

  const handleValidate = async () => {
    const result = await containerRef.current?.validate();
    setIsValid(!!result);
  };
  const handleValidateVirtual = async () => {
    const result = await containerVirtualRef.current?.validate();
    setIsValidVirtual(!!result);
  };

  const renderRow = (item: Data, index: number, style: any = {}) => (
    <div style={{ ...style, display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ padding: 6 }}>
        <Gapped>
          <ValidationWrapper
            validationInfo={validationRules
              .getNode((x) => x.array)
              .getNodeByIndex(index)
              .getNode((x) => x.value.value)
              .get()}
          >
            <Input
              value={item.value.value}
              onValueChange={(value) => {
                setValues({
                  array: [...values.array.slice(0, index), createItem(index, value), ...values.array.slice(index + 1)],
                });
              }}
            />
          </ValidationWrapper>
          {item.title}
        </Gapped>
      </div>
    </div>
  );

  return (
    <div>
      <Gapped>
        Тип валидации:
        <Switcher
          items={['submit', 'lostfocus', 'immediate']}
          onValueChange={setValidationType}
          value={validationType}
        />
      </Gapped>
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          <h3>С виртуализацией</h3>
          <ValidationContainer ref={containerVirtualRef}>
            <div style={{ display: 'flex', width: '400px', flexDirection: 'column', gap: 16 }}>
              <ValidationListWrapper
                validationInfos={validationRules.getNode((x) => x.array).getFirstNodeWithValidation()}
                onValidation={(index) => setFirstInvalidRow(index)}
                scrollToElement={(index) => {
                  listRef.current?.scrollToItem(index, 'center');
                }}
              >
                <List
                  height={400}
                  itemCount={values.array.length}
                  itemSize={42}
                  width={400}
                  ref={listRef}
                  itemData={values.array}
                  children={({ index, style, data }) => {
                    return renderRow(data[index], index, style);
                  }}
                />
              </ValidationListWrapper>
              <Button onClick={handleValidateVirtual}>validate (isValid: {isValidVirtual.toString()})</Button>
              {firstInvalidRow ? `first invalid row is ${firstInvalidRow}` : null}
            </div>
          </ValidationContainer>
        </div>

        <div>
          <h3>Без виртуализации</h3>
          <ValidationContainer ref={containerRef}>
            <div style={{ display: 'flex', width: '400px', flexDirection: 'column', gap: 16 }}>
              <ScrollContainer maxHeight={400}>
                {values.array.map((item, index) => renderRow(item, index))}
              </ScrollContainer>
              <Button onClick={handleValidate}>validate (isValid: {isValid.toString()})</Button>
            </div>
          </ValidationContainer>
        </div>
      </div>
    </div>
  );
};
