import React from 'react';
import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';
import { ToastView as Toast } from '../ToastView';

export default { title: 'ToastView', parameters: { creevey: { captureElement: "[data-tid='ToastView__root']" } } };

export const SimpleToast = () => <Toast>Changes saved</Toast>;
SimpleToast.story = { name: 'simple toast' };

export const WithAction = () => (
  <Toast action={{ label: 'Cancel', handler: action('action') }} onClose={action('close')}>
    Changes saved
  </Toast>
);
WithAction.story = { name: 'with action' };

// Фичареквест:
// В компоненте текст не может быть набран в две строки (по гайдам).
// Тем не менее, он переносится в случае, если в длинной строке есть пробелы
// Мы предлагаем обдумать это место в гайдах и в случае, когда текст не помещается в одну строку,
// обрезать его с троеточием в конце

export const LongName: CSFStory<JSX.Element> = () => (
  <Toast>
    Loremipsumdolorsitametconsecteturadipisicingelit.Doloresoptioillomagnam!
    Teneturnumquameosdistinctiodolor,nonbeataedignissimosvoluptatesquos!
    Delenititemporaofficiamagnidelectusadipisciconsequunturfacilis?
  </Toast>
);
LongName.story = { name: 'toast with long name' };
