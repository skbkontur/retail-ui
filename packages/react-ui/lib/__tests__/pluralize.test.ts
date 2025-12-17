import { LangCodes } from '../locale';
import { pluralize } from '../pluralize';

const enItems = ['item', 'items', 'items'];
const ruItems = ['элемент', 'элемента', 'элементов'];

describe('pluralize', () => {
  it('pluralize EN items', () => {
    expect(pluralize(LangCodes.en_GB, 0, ...enItems)).toBe('items');
    expect(pluralize(LangCodes.en_GB, 1, ...enItems)).toBe('item');
    expect(pluralize(LangCodes.en_GB, 100, ...enItems)).toBe('items');
    expect(pluralize(LangCodes.en_GB, 101, ...enItems)).toBe('items');
  });
  it('pluralize RU items', () => {
    expect(pluralize(LangCodes.ru_RU, 0, ...ruItems)).toBe('элементов');
    expect(pluralize(LangCodes.ru_RU, 1, ...ruItems)).toBe('элемент');
    expect(pluralize(LangCodes.ru_RU, 2, ...ruItems)).toBe('элемента');
    expect(pluralize(LangCodes.ru_RU, 100, ...ruItems)).toBe('элементов');
    expect(pluralize(LangCodes.ru_RU, 101, ...ruItems)).toBe('элемент');
  });
});
