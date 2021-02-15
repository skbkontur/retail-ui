import React from 'react';

import { LostfocusDependentValidation as StoryLostfocusDependentValidation } from './SyncStories/LostfocusDependentValidation';
import { LostfocusDynamicValidation as StoryLostfocusDynamicValidation } from './SyncStories/LostfocusDynamicValidation';
import { SingleInputPage } from './SyncStories/SingleInputPage';

export default { title: 'Sync' };

export const ImmediateValidation = () => <SingleInputPage validationType={'immediate'} />;
ImmediateValidation.storyName = 'ImmediateValidation';

export const SubmitValidation = () => <SingleInputPage validationType={'submit'} />;
SubmitValidation.storyName = 'SubmitValidation';

export const LostfocusValidation = () => <SingleInputPage validationType={'lostfocus'} />;
LostfocusValidation.storyName = 'LostfocusValidation';

export const LostfocusDependentValidation = () => <StoryLostfocusDependentValidation />;
LostfocusDependentValidation.storyName = 'LostfocusDependentValidation';

export const LostfocusDynamicValidation = () => <StoryLostfocusDynamicValidation />;
LostfocusDynamicValidation.storyName = 'LostfocusDynamicValidation';

export const PreinvalidImmediateValidation = () => (
  <SingleInputPage validationType={'immediate'} initialValue={'bad'} />
);
PreinvalidImmediateValidation.storyName = 'PreinvalidImmediateValidation';

export const PreinvalidLostfocusValidation = () => (
  <SingleInputPage validationType={'lostfocus'} initialValue={'bad'} />
);
PreinvalidLostfocusValidation.storyName = 'PreinvalidLostfocusValidation';

export const PreinvalidSubmitValidation = () => <SingleInputPage validationType={'submit'} initialValue={'bad'} />;
PreinvalidSubmitValidation.storyName = 'PreinvalidSubmitValidation';
