Контрол загрузки файлов.
Можно использовать для синхронной отправки данных, например, в форме.
Или же можно использовать в асинхронном режиме.

### Синхронный контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader  />
```

### Асинхронный контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

const request = () => Promise.resolve();

<FileUploader request={request} />
```

### Multiple контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

const request = () => Promise.reject();

<FileUploader request={request} multiple />
```

### Файлы по умолчанию
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

function createFile(filename, content) {
  return new File(['content'], filename, { type: 'text/plain' });
};

const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
<FileUploader multiple initialFiles={initialFiles} />
```

### Файлы по умолчанию с кастомизацией рендеринга
```jsx harmony
import { cloneElement } from 'react';
import { FileUploader } from '@skbkontur/react-ui';

function createFile(filename, content) {
  return new File(['content'], filename, { type: 'text/plain' });
};

const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
<FileUploader
  multiple
  initialFiles={initialFiles}
  renderFile={(file, fileNode) => cloneElement(fileNode, { showSize: false })}
/>
```

### Использование `accept`
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader multiple accept="image/*" />
```

### Валидация файла в списке
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader
  multiple
  validateBeforeUpload={({ originalFile }) => {
    return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
  }}
/>;
```

### Валидация контрола
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader multiple error />
```

### Локали по умолчанию

```typescript static
interface FileUploaderLocale {
  chooseFile: string;
  choosedFile: string;
  orDragHere: string;
  requestErrorText: string;
}

const ru_RU = {
  chooseFile: 'Выберите файл',
  choosedFile: 'Выбран файл',
  orDragHere: 'или перетащите сюда',
  requestErrorText: 'Файл не удалось загрузить на сервер, повторите попытку позже',
};

const en_GB = {
  chooseFile: 'Select a file',
  choosedFile: 'File selected',
  orDragHere: 'or drag here',
  requestErrorText: 'The file could not be uploaded to the server, please try again later',
};
```
