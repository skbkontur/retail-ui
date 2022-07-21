import React from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonProps, ButtonStyle, ButtonUse } from '../Button';
import { css } from '../../../lib/theming/Emotion';
import { Entries } from '../../../typings/utility-types';

export default { title: 'Button/Static' } as Meta;

const tableClass = css`
  tr td:not(:first-child) {
    padding: 10px;
    vertical-align: middle;
    text-align: center;
  }

  thead td,
  tr td:first-child {
    white-space: pre-wrap;
    line-height: 10px;
    font-family: monospace;
  }

  td[colspan] {
    text-align: left !important;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 12px;
  }
`;

const manualSets: ButtonStyle[][] = [[], ['hover'], ['active'], ['focus'], ['hover', 'focus'], ['active', 'focus']];

const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay', 'link', 'text', 'backless'];

const safer = function <S extends Record<keyof ButtonProps, string>>(props: ButtonProps): Partial<S> {
  const safeProps: Partial<S> = {};
  (Object.entries as Entries<keyof ButtonProps, ButtonProps[keyof ButtonProps]>)(props).forEach(([key, value]) => {
    if (value === null || typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
      safeProps[key] = String(value);
    } else if (React.isValidElement(value)) {
      safeProps[key] = (value.type as { name: string }).name;
    } else if (typeof value === 'object' && 'toString' in value) {
      safeProps[key] = value.toString();
    }
  });
  return safeProps;
};

const Manual: React.FunctionComponent<{ use: ButtonUse; children: React.ReactElement }> = ({ use, children }) => {
  return (
    <tr>
      <td>{use}</td>
      {manualSets.map((manual, i) => (
        <td key={i}>{React.cloneElement<ButtonProps>(children, { use, manual, children: 'Текст' })}</td>
      ))}
    </tr>
  );
};

const Title: React.FunctionComponent = ({ children }) => {
  return (
    <tr>
      <td />
      <td colSpan={manualSets.length}>{children}</td>
    </tr>
  );
};

const ManualActs: React.FunctionComponent<{ children: React.ReactElement }> = ({ children }) => {
  const { props } = React.Children.only(children);
  return (
    <table className={tableClass}>
      <thead>
        <tr>
          <td>
            <sub>use</sub>\<sup>acts</sup>
          </td>
          {manualSets.map((states, i) => (
            <td key={i}>{states.join('\n + \n')}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {uses.map((use) => (
          <Manual key={use} use={use}>
            {children}
          </Manual>
        ))}
        <Title>Props + DefaultProps: {JSON.stringify(safer(props), null, '  ')}</Title>
      </tbody>
    </table>
  );
};

export const Default: Story = () => (
  <ManualActs>
    <Button />
  </ManualActs>
);

export const Borderless: Story = () => (
  <ManualActs>
    <Button borderless />
  </ManualActs>
);

export const Checked: Story = () => (
  <ManualActs>
    <Button checked />
  </ManualActs>
);

export const Disabled: Story = () => (
  <ManualActs>
    <Button disabled />
  </ManualActs>
);

export const Arrow: Story = () => (
  <ManualActs>
    <Button arrow />
  </ManualActs>
);

export const ArrowLeft: Story = () => (
  <ManualActs>
    <Button arrow="left" />
  </ManualActs>
);

export const BorderlessAndArrow: Story = () => (
  <ManualActs>
    <Button borderless arrow />
  </ManualActs>
);

export const BorderlessAndArrowLeft: Story = () => (
  <ManualActs>
    <Button borderless arrow="left" />
  </ManualActs>
);

export const Icon: Story = () => (
  <ManualActs>
    <Button icon={<Ok />} />
  </ManualActs>
);

export const IconAndDisabled: Story = () => (
  <ManualActs>
    <Button icon={<Ok />} disabled />
  </ManualActs>
);

export const Medium: Story = () => (
  <ManualActs>
    <Button size="medium" />
  </ManualActs>
);

export const MediumAndArrow: Story = () => (
  <ManualActs>
    <Button size="medium" arrow />
  </ManualActs>
);

export const MediumAndArrowLeft: Story = () => (
  <ManualActs>
    <Button size="medium" arrow="left" />
  </ManualActs>
);

export const Large: Story = () => (
  <ManualActs>
    <Button size="large" />
  </ManualActs>
);

export const LargeAndArrow: Story = () => (
  <ManualActs>
    <Button size="large" arrow />
  </ManualActs>
);

export const LargeAndArrowLeft: Story = () => (
  <ManualActs>
    <Button size="large" arrow="left" />
  </ManualActs>
);
