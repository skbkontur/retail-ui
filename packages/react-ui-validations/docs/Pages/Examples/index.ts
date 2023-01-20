import GuidesExample from './GuidesExample/GuidesExample.md';
import ArrayExample from './ArrayExample/ArrayExample.md';
import Editors from './Editors/Editors.md';
import CustomControls from './CustomControls/CustomControls.md';

export const Examples = {
  caption: 'Примеры',
  items: [
    {
      component: GuidesExample,
      url: 'guides-example',
      caption: 'Пример из Контур.Гайдов',
    },
    {
      component: ArrayExample,
      url: 'array-example',
      caption: 'Пример массива',
    },
    {
      component: Editors,
      url: 'editors',
      caption: 'Редакторы',
    },
    {
      component: CustomControls,
      url: 'custom-controls',
      caption: 'Кастомные контролы',
    },
  ],
};
