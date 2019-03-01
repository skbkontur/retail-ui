import OnBlurValidations from './OnBlurValidations.md';
import DifferentMessages from './DifferentMessages';
import TextMessages from './TextMessages';
import ScrollToFirstInvalid from './ScrollToFirstInvalid';
import Editors from './Editors';

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
