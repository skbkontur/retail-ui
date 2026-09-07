import { IconAttachLinkRegular16 } from '@skbkontur/icons/IconAttachLinkRegular16';
import { IconIdCardRegular16 } from '@skbkontur/icons/IconIdCardRegular16';
import React from 'react';

import { Button } from '../../components/Button/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Input } from '../../components/Input/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import { SelectPlayground } from './SelectPlayground.js';

export interface SizesGroupProps {
  size: SizeProp;
}

export const SizesGroup = ({ size }: SizesGroupProps) => (
  <Gapped vertical gap={10}>
    <SelectPlayground width={120} size={size} />
    <Input rightIcon={<IconIdCardRegular16 />} placeholder={'Текст'} size={size} width={120} />
    <Button width={120} size={size}>
      Кнопка
    </Button>
    <Button icon={<IconAttachLinkRegular16 />} use={'link'} size={size}>
      Кнопка как ссылка
    </Button>
  </Gapped>
);
