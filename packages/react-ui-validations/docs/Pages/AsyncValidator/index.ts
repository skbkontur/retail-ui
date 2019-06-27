import Usage from './Usage/Usage.md';
import Submit from './Submit/Submit.md';
import ExecutionOrder from './ExecutionOrder/ExecutionOrder.md';
import Locals from './Locals/Locals.md';
import Arrays from './Arrays/Arrays.md';
import ChangeHandler from './ChangeHandler/ChangeHandler.md';

export default {
  caption: 'Асинхронные валидаций',
  items: [
    {
      component: Usage,
      url: 'async-usage',
      caption: 'Использование',
    },
    {
      component: Submit,
      url: 'async-submit-validation',
      caption: 'Отправка формы',
    },
    {
      component: ExecutionOrder,
      url: 'async-execution-order',
      caption: 'Порядок выполнения',
    },
    {
      component: Locals,
      url: 'async-locals',
      caption: 'Локальные функции',
    },
    {
      component: Arrays,
      url: 'async-arrays',
      caption: 'Массивы',
    },
    {
      component: ChangeHandler,
      url: 'async-change-handler',
      caption: 'Обработчик изменений',
    },
  ],
};
