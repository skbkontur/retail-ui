import React from 'react';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonProps, ButtonStyle, ButtonUse } from '../Button';
import { css } from '../../../lib/theming/Emotion';

export default { title: 'Button/Static' } as Meta;

const tableClass = css`
  background: #ff000010;

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
`;

const manualSets: ButtonStyle[][] = [[], ['hover'], ['active'], ['focus'], ['hover', 'focus'], ['active', 'focus']];

const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay', 'link', 'text', 'backless'];

const Manual: React.FunctionComponent<{ use: ButtonUse; children: React.ReactElement }> = ({ use, children }) => {
  return (
    <tr>
      <td>{use}</td>
      {manualSets.map((manual) => (
        <td>{React.cloneElement<ButtonProps>(children, { use, manual, children: 'Текст' })}</td>
      ))}
    </tr>
  );
};

const Title: React.FunctionComponent = ({ children }) => {
  return (
    <tr>
      <td />
      <td colSpan={6}>{children}</td>
    </tr>
  );
};

const Table: React.FunctionComponent<{ children: React.ReactElement }> = ({ children }) => {
  const { props } = React.Children.only(children);
  return (
    <table className={tableClass}>
      <thead>
        <Title>{JSON.stringify(props)}</Title>
        <tr>
          <td>name</td>
          {manualSets.map((states) => (
            <td>{states.join('\n + \n')}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {uses.map((use) => (
          <Manual use={use}>{children}</Manual>
        ))}
      </tbody>
    </table>
  );
};

export const Default: Story = () => (
  <Table>
    <Button />
  </Table>
);

export const Borderless: Story = () => (
  <Table>
    <Button borderless />
  </Table>
);

export const Checked: Story = () => (
  <Table>
    <Button checked />
  </Table>
);

export const Disabled: Story = () => (
  <Table>
    <Button disabled />
  </Table>
);

export const Arrow: Story = () => (
  <Table>
    <Button arrow />
  </Table>
);

export const ArrowLeft: Story = () => (
  <Table>
    <Button arrow="left" />
  </Table>
);

export const BorderlessAndArrow: Story = () => (
  <Table>
    <Button borderless arrow />
  </Table>
);

export const BorderlessAndArrowLeft: Story = () => (
  <Table>
    <Button borderless arrow="left" />
  </Table>
);
