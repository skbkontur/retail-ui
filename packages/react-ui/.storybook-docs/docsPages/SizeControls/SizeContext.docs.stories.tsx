import React from 'react';

import type { Meta, Story } from '../../../typings/stories';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { Select } from '../../../components/Select';
import { Gapped } from '../../../components/Gapped';
import { RadioGroup } from '../../../components/RadioGroup';
import { SizeControlContext } from '../../../lib/size';
import type { SizeProp } from '../../../lib/types/props';

export default {
  title: 'Information/SizeControls',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <SizeControlContext.Provider value={{ size: 'large' }}>
      <Input value={'large'} />
    </SizeControlContext.Provider>
  );
};
Example1.storyName = 'Base small';

export const InteractiveSizeSwitcher: Story = () => {
  const [size, setSize] = React.useState<SizeProp>('small');

  return (
    <Gapped vertical>
      <RadioGroup
        name="size"
        items={['small', 'medium', 'large'] as SizeProp[]}
        value={size}
        onValueChange={(v) => setSize(v as SizeProp)}
      />
      <SizeControlContext.Provider value={{ size }}>
        <Gapped>
          <Input placeholder={`Input (${size})`} />
          <Button>Button</Button>
          <Checkbox>Checkbox</Checkbox>
          <Select items={['One', 'Two', 'Three']} placeholder={`Select (${size})`} />
        </Gapped>
      </SizeControlContext.Provider>
    </Gapped>
  );
};

InteractiveSizeSwitcher.storyName = 'Интерактивный переключатель размера';

export const ShowcaseCommonComponents: Story = () => {
  return (
    <SizeControlContext.Provider value={{ size: 'medium' }}>
      <Gapped vertical>
        <Gapped>
          <Input placeholder="Input" />
          <Button>Button</Button>
          <Checkbox>Checkbox</Checkbox>
        </Gapped>
        <Gapped>
          <Select items={['А', 'Б', 'В']} placeholder="Select" />
          <Input placeholder="Еще одно поле" />
          <Button use="primary">Primary</Button>
        </Gapped>
      </Gapped>
    </SizeControlContext.Provider>
  );
};

ShowcaseCommonComponents.storyName = 'Набор типовых компонентов';

export const OverrideWithPropInsideContext: Story = () => {
  return (
    <SizeControlContext.Provider value={{ size: 'small' }}>
      <Gapped vertical>
        <div>В контексте size="small". Ниже некоторые компоненты переопределяют размер через проп.</div>
        <Gapped gap={16}>
          <Input placeholder="По умолчанию small" />
          <Input placeholder="Переопределен large" size="large" width={250} />
        </Gapped>
        <Gapped gap={16}>
          <Button>По умолчанию small</Button>
          <Button size="large">Переопределен large</Button>
        </Gapped>
        <Gapped gap={16}>
          <Checkbox>По умолчанию small</Checkbox>
          <Checkbox size="large">Переопределен large</Checkbox>
        </Gapped>
        <Gapped gap={16}>
          <Select items={[1, 2, 3]} placeholder="Small" />
          <Select items={[1, 2, 3]} placeholder="Large" size="large" />
        </Gapped>
      </Gapped>
    </SizeControlContext.Provider>
  );
};

OverrideWithPropInsideContext.storyName = 'Переопределение через проп внутри контекста';
