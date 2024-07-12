import { Meta as StorybookMeta, Story as StorybookStory } from '@storybook/react';
import { CreeveyMeta, CreeveyStory, CreeveyStoryParams } from 'creevey';

export type Meta = StorybookMeta & CreeveyMeta;
export type Story = StorybookStory & CreeveyStory;

export type CreeveyTests = CreeveyStoryParams['tests'];
