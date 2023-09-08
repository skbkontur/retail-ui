import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Toggle } from '../../Toggle';
import { Radio } from '../../Radio';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

interface ShowcaseGroupProps {
  title?: string;
}
export const ShowcaseGroup = (props: ShowcaseGroupProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      {props.title && <h2 style={{ color: theme.textColorDefault }}>{props.title}</h2>}
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
};
