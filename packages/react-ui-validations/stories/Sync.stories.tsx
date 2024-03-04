import React from 'react';
import { Meta } from '@storybook/react';

import { LostfocusDependentValidation } from './SyncStories/LostfocusDependentValidation';
import { LostfocusDynamicValidation } from './SyncStories/LostfocusDynamicValidation';
import { SingleInputPage } from './SyncStories/SingleInputPage';
import { LostfocusIndependentValidation } from './SyncStories/LostfocusIndependentValidation';

export default {
  title: 'Sync',
} as Meta;

export const ImmediateValidation = () => <SingleInputPage validationType={'immediate'} />;
export const SubmitValidation = () => <SingleInputPage validationType={'submit'} />;
export const LostFocusValidation = () => <SingleInputPage validationType={'lostfocus'} />;
export const LostFocusDependentValidation = () => <LostfocusDependentValidation />;
export const LostFocusDynamicValidation = () => <LostfocusDynamicValidation />;
export const PreinvalidImmediateValidation = () => (
  <SingleInputPage validationType={'immediate'} initialValue={'bad'} />
);
export const PreinvalidLostfocusValidation = () => (
  <SingleInputPage validationType={'lostfocus'} initialValue={'bad'} />
);
export const PreinvalidSubmitValidation = () => <SingleInputPage validationType={'submit'} initialValue={'bad'} />;
export const LostfocusInependentValidation = () => <LostfocusIndependentValidation />;
