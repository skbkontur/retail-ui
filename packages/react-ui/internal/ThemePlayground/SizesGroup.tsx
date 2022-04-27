import React from 'react';
import CardIcon from '@skbkontur/react-icons/Card';
import LinkIcon from '@skbkontur/react-icons/Link';

import { Input } from '../../components/Input';
import { Gapped } from '../../components/Gapped';
import { Button } from '../../components/Button';

import { SelectPlayground } from './SelectPlayground';

export type SizesGroupProps = { size: 'small' | 'medium' | 'large' };

export const SizesGroup = ({ size }: SizesGroupProps) => (
  <Gapped wrap verticalAlign="middle" gap={10}>
    <SelectPlayground width={120} size={size} />
    <Input rightIcon={<CardIcon />} placeholder={'Text value'} size={size} />
    <Button width={120} size={size}>
      Button
    </Button>
    <Button icon={<LinkIcon />} use={'link'} size={size}>
      Button like a link
    </Button>
  </Gapped>
);
