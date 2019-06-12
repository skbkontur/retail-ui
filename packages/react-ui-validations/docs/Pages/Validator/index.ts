import Objects from './Objects/Objects.md';
import Arrays from './Arrays/Arrays.md';
import Dependent from './Dependent/Dependent.md';
import Reusable from './Reusable/Reusable.md';
import MissingNodes from './MissingNodes/MissingNodes.md';

export default {
  caption: 'Описание валидаций',
  items: [
    {
      component: Objects,
      url: 'object-validation',
      caption: 'Валидация объектов',
    },
    {
      component: Arrays,
      url: 'array-validation',
      caption: 'Валидация массивов',
    },
    {
      component: Dependent,
      url: 'dependent-validation',
      caption: 'Зависимые валидации',
    },
    {
      component: Reusable,
      url: 'reusable-validations',
      caption: 'Переиспользуемые валидации',
    },
    {
      component: MissingNodes,
      url: 'missing-nodes',
      caption: 'Отсутствующие узлы',
    },
  ],
};
