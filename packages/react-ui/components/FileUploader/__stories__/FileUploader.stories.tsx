import React, { useRef } from 'react';

import { createFile, FileUploaderFileStatus } from '../../../internal/FileUploaderControl/fileUtils';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import type { FileUploaderAttachedFile, FileUploaderView } from '../../../internal/FileUploaderControl/fileUtils';
import { DeleteIcon } from '../../../internal/FileUploaderControl/FileUploaderFile/icons/DeleteIcon';
import { FileUploader } from '../FileUploader';
import { FileUploaderFile } from '../FileUploaderFile';

export default {
  title: 'FileUploader',
  component: FileUploader,
  decorators: [(storyFn: () => JSX.Element) => <div style={{ padding: '10px' }}>{storyFn()}</div>],
};

const loadingRequest = () => new Promise<void>(() => {});

const successRequest = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const errorRequest = () =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  });

/** async control stories **/
export const SingleAsyncFileUploader = () => <FileUploader request={successRequest} />;
export const MultipleAsyncFileUploader = () => <FileUploader multiple request={successRequest} />;
MultipleAsyncFileUploader.parameters = { creevey: { skip: true } };

export const MultipleAsyncFileUploaderWithLoading = () => <FileUploader multiple request={loadingRequest} />;
MultipleAsyncFileUploaderWithLoading.parameters = { creevey: { skip: true } };

export const MultipleAsyncFileUploaderWithErrorRequest = () => <FileUploader multiple request={errorRequest} />;
MultipleAsyncFileUploaderWithErrorRequest.parameters = { creevey: { skip: true } };

/** sync control stories **/
export const SingleSyncFileUploader = () => <FileUploader />;
SingleSyncFileUploader.parameters = { creevey: { skip: true } };

export const MultipleSyncFileUploader = () => <FileUploader multiple />;
MultipleSyncFileUploader.parameters = { creevey: { skip: true } };

export const MultipleSyncFileUploaderTileView = () => {
  const initialFile = createFile('test.pdf');
  return (
    <FileUploader
      width={500}
      initialFiles={[initialFile, initialFile, initialFile, initialFile]}
      multiple
      view="tile"
    />
  );
};
MultipleSyncFileUploaderTileView.parameters = { creevey: { skip: true } };

/** common stories **/
export const SingleFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} validateBeforeUpload={() => Promise.resolve('Формат файла неверный')} />
);
SingleFileUploaderWithFileError.parameters = { creevey: { skip: true } };

export const MultipleFileUploaderWithFileError = () => (
  <FileUploader
    multiple
    request={successRequest}
    validateBeforeUpload={() => Promise.resolve('Формат файла неверный')}
  />
);
MultipleFileUploaderWithFileError.parameters = { creevey: { skip: true } };

export const DifferentStates = () => {
  const initialFile = createFile('test.pdf');
  return (
    <Gapped vertical>
      Empty
      <Gapped>
        <FileUploader /> Default
      </Gapped>
      <Gapped>
        <FileUploader error /> Error
      </Gapped>
      <Gapped>
        <FileUploader warning /> Warning
      </Gapped>
      <Gapped>
        <FileUploader disabled /> Disabled
      </Gapped>
      <Gapped>
        <FileUploader error warning disabled /> Error, Warning, Disabled
      </Gapped>
      With File
      <Gapped>
        <FileUploader initialFiles={[initialFile]} /> Default
      </Gapped>
      <Gapped>
        <FileUploader initialFiles={[initialFile]} error /> Error
      </Gapped>
      <Gapped>
        <FileUploader initialFiles={[initialFile]} warning /> Warning
      </Gapped>
      <Gapped>
        <FileUploader initialFiles={[initialFile]} disabled /> Disabled
      </Gapped>
      <Gapped>
        <FileUploader initialFiles={[initialFile]} error warning disabled /> Error, Warning, Disabled
      </Gapped>
    </Gapped>
  );
};

export const DifferentStatesTileView = () => {
  const initialFile = createFile('FileName.txt');
  const tileProps: { view: FileUploaderView } = {
    view: 'tile',
  };
  return (
    <Gapped vertical>
      Empty
      <Gapped>
        <FileUploader {...tileProps} />
        <FileUploader {...tileProps} error />
        <FileUploader {...tileProps} warning />
        <FileUploader {...tileProps} disabled />
        <FileUploader {...tileProps} error warning disabled />
      </Gapped>
      With File
      <Gapped verticalAlign="top">
        <FileUploader {...tileProps} initialFiles={[initialFile]} />
        <FileUploader {...tileProps} initialFiles={[initialFile]} error />
        <FileUploader {...tileProps} initialFiles={[initialFile]} warning />
        <FileUploader {...tileProps} initialFiles={[initialFile]} disabled />
        <FileUploader {...tileProps} initialFiles={[initialFile]} error warning disabled />
      </Gapped>
    </Gapped>
  );
};

export const CustomWidth = () => (
  <Gapped vertical>
    100% <FileUploader width={'100%'} />
    550px <FileUploader width={550} />
  </Gapped>
);

export const CustomTileView = () => {
  const tileProps: { view: FileUploaderView } = {
    view: 'tile',
  };
  return (
    <Gapped verticalAlign="top">
      <FileUploader {...tileProps} uploaderText="" />
      <FileUploader {...tileProps} uploaderText="Добавь документ" />
      <FileUploader {...tileProps} />
      <FileUploader {...tileProps} uploaderIcon={<DeleteIcon />} />
      <FileUploader {...tileProps} uploaderText="" uploaderIcon={<DeleteIcon />} />
    </Gapped>
  );
};

export const FileUploaderRefFocusAndBlur = () => {
  const ref = useRef<FileUploader>(null);
  return (
    <Gapped>
      <FileUploader multiple ref={ref} />
      <Button onClick={() => ref.current?.focus()}>Focus</Button>
      <Button onClick={() => ref.current?.blur()}>Blur</Button>
      <Button onClick={() => ref.current?.reset()}>Reset</Button>
    </Gapped>
  );
};
FileUploaderRefFocusAndBlur.parameters = { creevey: { skip: true } };

export const DifferentSizes = () => (
  <Gapped vertical gap={24}>
    Single
    <Gapped>
      <FileUploader width={456} /> default
    </Gapped>
    <Gapped>
      <FileUploader size={'small'} width={456} /> small
    </Gapped>
    <Gapped>
      <FileUploader size={'medium'} width={456} /> medium
    </Gapped>
    <Gapped>
      <FileUploader size={'large'} width={456} /> large
    </Gapped>
    Multiple
    <Gapped>
      <FileUploader width={456} multiple /> default
    </Gapped>
    <Gapped>
      <FileUploader width={456} size={'small'} multiple /> small
    </Gapped>
    <Gapped>
      <FileUploader width={456} size={'medium'} multiple /> medium
    </Gapped>
    <Gapped>
      <FileUploader width={456} size={'large'} multiple /> large
    </Gapped>
  </Gapped>
);

export const DifferentSizesTileView = () => {
  const tileProps: { view: FileUploaderView } = {
    view: 'tile',
  };
  return (
    <Gapped gap={24} verticalAlign="top">
      <FileUploader {...tileProps} size="small" />
      <FileUploader {...tileProps} size="medium" />
      <FileUploader {...tileProps} size="large" />
    </Gapped>
  );
};

export const MultipleFileUploaderWithHideFiles = () => <FileUploader multiple request={successRequest} hideFiles />;
MultipleFileUploaderWithHideFiles.parameters = { creevey: { skip: true } };

export const FileUploaderWithSinglePrefilledFile = () => (
  <FileUploader multiple={false} initialFiles={[createFile('test1.txt')]} />
);

export const FileUploaderWithMultiplePrefilledFiles = () => (
  <FileUploader multiple initialFiles={[createFile('test1.txt'), createFile('test2.txt')]} />
);

export const FileUploaderWithMultiplePrefilledFilesCustomRender = () => (
  <FileUploader
    multiple
    initialFiles={[createFile('test1.txt'), createFile('test2.txt')]}
    renderFile={(_file, _fileNode, props) => <FileUploaderFile {...props} showSize />}
  />
);

export const FileUploaderWithMultiplePrefilledFilesUploadButtonEndAndPreview = () => (
  <FileUploader
    multiple
    width={400}
    view="tile"
    uploadButtonPosition="end"
    initialFiles={[createFile('test1.txt'), createFile('test2.txt')]}
    renderFile={(_file, _fileNode, props) => (
      <FileUploaderFile {...props} previewImg="https://tech.skbkontur.ru/kontur-ui/images/previewImg.png" />
    )}
  />
);

export const FileUploaderWithSummaryAndValidations = () => {
  function containsCyrillicLetters(str: string): boolean {
    // Регулярное выражение для проверки наличия символов кириллицы
    const regex = /[\u0400-\u04FF]/;
    return regex.test(str);
  }

  function containsDigits(str: string): boolean {
    // Регулярное выражение для проверки наличия цифр
    const regex = /\d/;
    return regex.test(str);
  }

  const validateBeforeUpload = (file: FileUploaderAttachedFile) => {
    let status = FileUploaderFileStatus.Uploaded;
    let message = '';
    const { name } = file.originalFile;

    if (containsCyrillicLetters(name)) {
      status = FileUploaderFileStatus.Error;
      message = 'Имя файла содержит кириллицу';
    } else if (containsDigits(name)) {
      status = FileUploaderFileStatus.Warning;
      message = 'Имя файла содержит цифры';
    }

    return Promise.resolve(status !== FileUploaderFileStatus.Uploaded ? { message, status } : message);
  };

  return (
    <FileUploader
      multiple
      validationSummary={'enabled'}
      validationSummaryStart={6}
      validateBeforeUpload={validateBeforeUpload}
    />
  );
};
FileUploaderWithSummaryAndValidations.parameters = { creevey: { skip: true } };

export const FileUploaderWithFileTypeIcon = () => {
  const initialFile = createFile('test.pdf');
  return (
    <Gapped vertical gap={24}>
      <FileUploader initialFiles={[initialFile]} size="small" />
      <FileUploader initialFiles={[initialFile]} size="medium" />
      <FileUploader initialFiles={[initialFile]} size="large" />
    </Gapped>
  );
};

export const FileUploaderWithMultipleFileTypeIcons = () => {
  const initialFiles = ['.pdf', '.xml', '.jpg', '.pptx', '.xls', '.txt', '.zip', '.foo', ''].map((ext) =>
    createFile(`test${ext}`, 'foo', ''),
  );
  return (
    <Gapped vertical gap={24}>
      <FileUploader multiple initialFiles={initialFiles} size="small" />
      <FileUploader multiple initialFiles={initialFiles} size="medium" />
      <FileUploader multiple initialFiles={initialFiles} size="large" />
    </Gapped>
  );
};
