Контрол загрузки файлов.
Можно использовать для синхронной отправки данных, например, в форме.
Или же можно использовать в асинхронном режиме.

Синхронный контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader  />
```

Асинхронный контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

const request = () => Promise.resolve();

<FileUploader request={request} />
```

Multiple контрол
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

const request = () => Promise.reject();

<FileUploader request={request} multiple />
```

Файлы по умолчанию
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

function createFile(filename, content) {
  return new File(['content'], filename, { type: 'text/plain' });
};

const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
<FileUploader multiple initialFiles={initialFiles} />
```

Файлы по умолчанию с кастомизацией рендеринга
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

Использование `accept`
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader multiple accept="image/*" />
```

Валидация файла в списке
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader
  multiple
  validateBeforeUpload={({ originalFile }) => {
    return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
  }}
/>;
```

Валидация контрола
```jsx harmony
import { FileUploader } from '@skbkontur/react-ui';

<FileUploader multiple error />
```

Ручное удаление файлов

В критичных случаях, если нужно удалить файлы из контрола вручную, то это можно сделать, используя метод `removeFile` из `ref`.
Обратите внимание, что при вызове `removeFile` вызываются коллбэки `onRemove` и `onValueChange`.

```jsx harmony
import { FileUploader, Button } from '@skbkontur/react-ui';

const fileUploaderRef = React.useRef(null);
const [fileList, setFileList] = React.useState([]);

<div style={{ display: 'inline-grid', gap: '10px' }}>
  <FileUploader ref={fileUploaderRef} multiple onValueChange={(files) => setFileList(files)} />
    {fileList.map((file) => {
    return (
      <Button key={file.id} onClick={() => fileUploaderRef.current.removeFile(file.id)}>
        Delete file {file.originalFile.name}
      </Button>
    );
  })}
</div>
```

#### Локали по умолчанию

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
