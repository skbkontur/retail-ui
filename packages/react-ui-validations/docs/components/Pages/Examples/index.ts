import DifferentMessages from './DifferentMessages';
import Editors from './Editors';
import OnBlurValidations from './OnBlurValidations.md';
import ScrollToFirstInvalid from './ScrollToFirstInvalid';
import TextMessages from './TextMessages';

export default [
  {
    component: OnBlurValidations,
    url: 'on-blur-validations',
    caption: 'Валидации по потере фокуса',
  },
  {
    component: TextMessages,
    url: 'simple-text-messages',
    caption: 'Подписи к контролам',
  },
  {
    component: DifferentMessages,
    url: 'different-messages',
    caption: 'Разные типы сообщений',
  },
  {
    component: ScrollToFirstInvalid,
    url: 'scroll-to-first-invalid',
    caption: 'Скроллинг к первому невалидному',
  },
  {
    component: Editors,
    url: 'editors',
    caption: 'Редакторы',
  },
];
