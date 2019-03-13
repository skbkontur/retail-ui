import { storiesOf } from '@storybook/react';
import * as React from 'react';
import LostfocusDependentValidation from './SyncStories/LostfocusDependentValidation';
import LostfocusDynamicValidation from './SyncStories/LostfocusDynamicValidation';
import SingleInputPage from './SyncStories/SingleInputPage';

storiesOf('Sync', module)
  .add('ImmediateValidation', () => <SingleInputPage validationType={'immediate'} />)
  .add('SubmitValidation', () => <SingleInputPage validationType={'submit'} />)
  .add('LostfocusValidation', () => <SingleInputPage validationType={'lostfocus'} />)
  .add('LostfocusDependentValidation', () => <LostfocusDependentValidation />)
  .add('LostfocusDynamicValidation', () => <LostfocusDynamicValidation />)
  .add('PreinvalidImmediateValidation', () => <SingleInputPage validationType={'immediate'} initialValue={'bad'} />)
  .add('PreinvalidLostfocusValidation', () => <SingleInputPage validationType={'lostfocus'} initialValue={'bad'} />)
  .add('PreinvalidSubmitValidation', () => <SingleInputPage validationType={'submit'} initialValue={'bad'} />);
