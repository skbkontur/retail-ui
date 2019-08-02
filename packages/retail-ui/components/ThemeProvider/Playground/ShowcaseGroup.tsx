import React from 'react';
import Checkbox from '../../Checkbox/index';
import Gapped from '../../Gapped/index';
import Button from '../../Button/index';
import Input from '../../Input/index';
import Toggle from '../../Toggle/index';
import Radio from '../../Radio/index';

interface IShowcaseGroupProps {
  title?: string;
}
export const ShowcaseGroup = (props: IShowcaseGroupProps) => (
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
