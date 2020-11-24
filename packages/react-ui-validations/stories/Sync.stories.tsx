import React from 'react';
import { CSFStory } from 'creevey';

import { LostfocusDependentValidation } from './SyncStories/LostfocusDependentValidation';
import { LostfocusDynamicValidation } from './SyncStories/LostfocusDynamicValidation';
import { SingleInputPage } from './SyncStories/SingleInputPage';

export default { title: `Sync` };

export const ImmediateValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'immediate'} />;

export const SubmitValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'submit'} />;

export const LostfocusValidation: CSFStory<JSX.Element> = () => <SingleInputPage validationType={'lostfocus'} />;

export const LostfocusDependentValidationStory: CSFStory<JSX.Element> = () => <LostfocusDependentValidation />;

export const LostfocusDynamicValidationStory: CSFStory<JSX.Element> = () => <LostfocusDynamicValidation />;

export const PreinvalidImmediateValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'immediate'} initialValue={'bad'} />
);

export const PreinvalidLostfocusValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'lostfocus'} initialValue={'bad'} />
);

export const PreinvalidSubmitValidation: CSFStory<JSX.Element> = () => (
  <SingleInputPage validationType={'submit'} initialValue={'bad'} />
);
