import GettingStarted from './GettingStarted/GettingStarted.md';
import ValidationType from './ValidationType/ValidationType.md';
import PendingValidation from './PendingValidation/PendingValidation.md';
import ErrorMessages from './ErrorMessages/ErrorMessages.md';
import FormValidity from './FormValidity/FormValidity.md';
import ScrollToValidation from './ScrollToValidation/ScrollToValidation.md';

export default {
  caption: 'Отображение',
  items: [
    {
      component: GettingStarted,
      url: 'getting-started',
      caption: 'Начало работы',
    },
    {
      component: ValidationType,
      url: 'validation-type',
      caption: 'Виды валидаций',
    },
    {
      component: PendingValidation,
      url: 'pending-validation',
      caption: 'Ожидание валидаций',
    },
    {
      component: ErrorMessages,
      url: 'error-messages',
      caption: 'Сообщения об ошибках',
    },
    {
      component: FormValidity,
      url: 'form-validity',
      caption: 'Валидность формы',
    },
    {
      component: ScrollToValidation,
      url: 'scroll-to-validation',
      caption: 'Скролл к валидации',
    },
  ],
};
