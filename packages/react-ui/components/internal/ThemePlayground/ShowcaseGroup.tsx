import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Toggle } from '../../Toggle';
import { Radio } from '../../Radio';

interface ShowcaseGroupProps {
  title?: string;
}
export const ShowcaseGroup = (props: ShowcaseGroupProps) => (
  <div>
    {props.title && <h2>{props.title}</h2>}
    <Gapped gap={10}>
      <Button>Button</Button>
      <Input />
      <Toggle />
      <Radio value={''} checked>
        Radio
      </Radio>
      <Checkbox checked>Checkbox</Checkbox>
    </Gapped>
  </div>
);
