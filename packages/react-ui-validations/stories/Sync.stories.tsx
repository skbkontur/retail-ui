import React from 'react';
import type { Meta } from '@storybook/react';

import { LostfocusDependentValidation as LostfocusDependentValidationStory } from './SyncStories/LostfocusDependentValidation';
import { LostfocusDynamicValidation as LostfocusDynamicValidationStory } from './SyncStories/LostfocusDynamicValidation';
import { LostfocusIndependentValidation as LostfocusIndependentValidationStory } from './SyncStories/LostfocusIndependentValidation';
import { SingleInputPage } from './SyncStories/SingleInputPage';

export default {
  title: 'Sync',
} as Meta;

export const ImmediateValidation = () => <SingleInputPage validationType="immediate" />;
export const SubmitValidation = () => <SingleInputPage validationType="submit" />;
export const LostfocusValidation = () => <SingleInputPage validationType="lostfocus" />;
export const LostfocusDependentValidation = () => <LostfocusDependentValidationStory />;
export const LostfocusDynamicValidation = () => <LostfocusDynamicValidationStory />;
export const PreinvalidImmediateValidation = () => <SingleInputPage validationType="immediate" initialValue="bad" />;
export const PreinvalidLostfocusValidation = () => <SingleInputPage validationType="lostfocus" initialValue="bad" />;
export const PreinvalidSubmitValidation = () => <SingleInputPage validationType="submit" initialValue="bad" />;
export const LostfocusIndependentValidation = () => <LostfocusIndependentValidationStory />;
