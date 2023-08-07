import React from 'react';
import { TrashCanIcon } from '@skbkontur/icons/TrashCanIcon';

import { MiniModal } from '../MiniModal';
import { Button } from '../../Button';
import { Meta } from '../../../typings/stories';

export default {
  title: 'MiniModal',
  parameters: { creevey: { captureElement: '[data-testid="modal-content"]' } },
} as Meta;

const BtnMain = (
  <Button size="medium" use="primary">
    Main
  </Button>
);
const BtnAlt = <Button size="medium">Alt</Button>;
const BtnCancel = <Button size="medium">Cancel</Button>;

export const Simple = () => <MiniModal title="title" btnMain={BtnMain} />;

export const Description = () => (
  <MiniModal
    title="title"
    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptatibus?"
    btnMain={BtnMain}
  />
);

export const Alt = () => <MiniModal title="title" btnMain={BtnMain} btnAlt={BtnAlt} />;

export const Cancel = () => <MiniModal title="title" btnMain={BtnMain} btnCancel={BtnCancel} />;

export const Column = () => <MiniModal title="title" btnMain={BtnMain} btnAlt={BtnAlt} direction="column" />;

export const AltAndCancel = () => <MiniModal title="title" btnMain={BtnMain} btnAlt={BtnAlt} btnCancel={BtnCancel} />;

export const CancelIndent = () => (
  <MiniModal title="title" btnMain={BtnMain} btnAlt={BtnAlt} btnCancel={BtnCancel} hasCancelIndent />
);

export const Icon = () => <MiniModal icon={<TrashCanIcon size={64} />} title="title" btnMain={BtnMain} />;
