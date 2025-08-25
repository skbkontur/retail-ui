import React from 'react';

import { Checkbox } from '../../components/Checkbox';
import { Gapped } from '../../components/Gapped';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Toggle } from '../../components/Toggle';
import { Radio } from '../../components/Radio';
import { ThemeContext } from '../../lib/theming/ThemeContext';

interface ShowcaseGroupProps {
  title?: string;
}
export const ShowcaseGroup = (props: ShowcaseGroupProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      {props.title && (
        <div
          style={{
            fontSize: '21px',
            lineHeight: '1.2',
            margin: '16px 0',
            color: theme.textColorDefault,
          }}
        >
          {props.title}
        </div>
      )}
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
