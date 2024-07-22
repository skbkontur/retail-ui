import GettingStarted from './GettingStarted/GettingStarted.md';
import ValidationLevel from './ValidationLevel/ValidationLevel.md';
import ValidationType from './ValidationType/ValidationType.md';
import ErrorMessages from './ErrorMessages/ErrorMessages.md';
import FormValidity from './FormValidity/FormValidity.md';
import ScrollToValidation from './ScrollToValidation/ScrollToValidation.md';
// import FeatureFlagsContext from './FeatureFlags/FeatureFlagsContext.md'; // TODO включить когда появятся фиче-флаги

export const Displaying = {
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
      component: ValidationLevel,
      url: 'validation-level',
      caption: 'Уровни валидаций',
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
    // {
    //   component: FeatureFlagsContext,
    //   url: 'feature-flags',
    //   caption: 'Фича-флаги',
    // },
  ],
};
