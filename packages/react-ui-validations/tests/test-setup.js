import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';

configure({
  testIdAttribute: 'data-tid',
});
