import { isValidElementType } from '../../lib/react-is.js';
import { Calendar } from '../Calendar/index.js';
import { Dropdown } from '../Dropdown/index.js';
import { MiniModal } from '../MiniModal/index.js';
import { Modal } from '../Modal/index.js';
import { Select } from '../Select/index.js';
import { SidePage } from '../SidePage/index.js';

/**
 * Guards compound-component slots against circular-import TDZ failures,
 * where `static Body = Child` captures `undefined` during module evaluation.
 */
describe('Compound component slots', () => {
  test.each([
    ['Modal', Modal, ['Header', 'Body', 'Footer'] as const],
    ['MiniModal', MiniModal, ['Header', 'Body', 'Footer', 'Indent'] as const],
    ['SidePage', SidePage, ['Header', 'Body', 'Footer', 'Container'] as const],
    ['Calendar', Calendar, ['Day'] as const],
    ['Select', Select, ['Item'] as const],
    ['Dropdown', Dropdown, ['Header'] as const],
  ])('%s slots are defined', (_name, Component, slots) => {
    for (const slot of slots) {
      expect(isValidElementType(Component[slot as keyof typeof Component])).toBe(true);
    }
  });
});
