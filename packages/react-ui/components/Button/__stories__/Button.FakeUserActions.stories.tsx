import React from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonUse } from '../Button';
import { FakeUserActionsTable } from '../../../internal/FakeUserActions/FakeUserActionsTable';

export default {
  title: 'Button/FakeUserActions',
  parameters: { creevey: { captureElement: '#FakeUserActionsTable' } },
} as Meta;

const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay', 'link', 'text', 'backless'];

const ButtonStatic: React.FunctionComponent<{ children: React.ReactElement }> = ({ children }) => (
  <FakeUserActionsTable propName="use" propValues={uses}>
    {children}
  </FakeUserActionsTable>
);

export const Default: Story = () => (
  <ButtonStatic>
    <Button />
  </ButtonStatic>
);

export const Borderless: Story = () => (
  <ButtonStatic>
    <Button borderless />
  </ButtonStatic>
);

export const Checked: Story = () => (
  <ButtonStatic>
    <Button checked />
  </ButtonStatic>
);

export const Disabled: Story = () => (
  <ButtonStatic>
    <Button disabled />
  </ButtonStatic>
);

export const Arrow: Story = () => (
  <ButtonStatic>
    <Button arrow />
  </ButtonStatic>
);

export const ArrowMedium: Story = () => (
  <ButtonStatic>
    <Button size="medium" arrow />
  </ButtonStatic>
);

export const ArrowBorderless: Story = () => (
  <ButtonStatic>
    <Button borderless arrow />
  </ButtonStatic>
);

export const ArrowLarge: Story = () => (
  <ButtonStatic>
    <Button size="large" arrow />
  </ButtonStatic>
);

export const ArrowWidth100: Story = () => (
  <ButtonStatic>
    <Button arrow width={100} />
  </ButtonStatic>
);

export const ArrowLeftWidth100: Story = () => (
  <ButtonStatic>
    <Button arrow="left" width={100} />
  </ButtonStatic>
);

export const ArrowLeft: Story = () => (
  <ButtonStatic>
    <Button arrow="left" />
  </ButtonStatic>
);

export const ArrowLeftBorderless: Story = () => (
  <ButtonStatic>
    <Button borderless arrow="left" />
  </ButtonStatic>
);

export const ArrowLeftMedium: Story = () => (
  <ButtonStatic>
    <Button size="medium" arrow="left" />
  </ButtonStatic>
);

export const ArrowLeftLarge: Story = () => (
  <ButtonStatic>
    <Button size="large" arrow="left" />
  </ButtonStatic>
);

export const ArrowDisabled: Story = () => (
  <ButtonStatic>
    <Button disabled arrow />
  </ButtonStatic>
);

export const ArrowLeftDisabled: Story = () => (
  <ButtonStatic>
    <Button disabled arrow="left" />
  </ButtonStatic>
);

export const Large: Story = () => (
  <ButtonStatic>
    <Button size="large" />
  </ButtonStatic>
);

export const Icon: Story = () => (
  <ButtonStatic>
    <Button icon={<Ok />} />
  </ButtonStatic>
);

export const IconAndDisabled: Story = () => (
  <ButtonStatic>
    <Button icon={<Ok />} disabled />
  </ButtonStatic>
);

export const Medium: Story = () => (
  <ButtonStatic>
    <Button size="medium" />
  </ButtonStatic>
);

export const Error: Story = () => (
  <ButtonStatic>
    <Button error />
  </ButtonStatic>
);

export const Warning: Story = () => (
  <ButtonStatic>
    <Button warning />
  </ButtonStatic>
);

export const CheckedDisabled: Story = () => (
  <ButtonStatic>
    <Button checked disabled />
  </ButtonStatic>
);
