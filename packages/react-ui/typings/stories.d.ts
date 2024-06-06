import { Meta as StorybookMeta, Story as StorybookStory, StoryObj } from '@storybook/react';
import { CreeveyMeta, CreeveyStory, CreeveyStoryParams } from 'creevey';

export type Meta = StorybookMeta & CreeveyMeta;
export type Story = StorybookStory & CreeveyStory;
export type ArgsStory<T> = StoryObj<typeof T>;

export type CreeveyTests = CreeveyStoryParams['tests'];
