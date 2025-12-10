import React from 'react';
import { IdCardIcon16Regular } from '@skbkontur/icons/icons/IdCardIcon/IdCardIcon16Regular.js';
import { AttachLinkIcon16Regular } from '@skbkontur/icons/icons/AttachLinkIcon/AttachLinkIcon16Regular.js';

import { Input } from '../../components/Input/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Button } from '../../components/Button/index.js';
import type { SizeProp } from '../../lib/types/props.js';

import { SelectPlayground } from './SelectPlayground.js';

export interface SizesGroupProps {
  size: SizeProp;
}

export const SizesGroup = ({ size }: SizesGroupProps) => (
  <Gapped wrap verticalAlign="middle" gap={10}>
    <SelectPlayground width={120} size={size} />
    <Input rightIcon={<IdCardIcon16Regular />} placeholder={'Text value'} size={size} />
    <Button width={120} size={size}>
      Button
    </Button>
    <Button icon={<AttachLinkIcon16Regular />} use={'link'} size={size}>
      Button like a link
    </Button>
  </Gapped>
);
