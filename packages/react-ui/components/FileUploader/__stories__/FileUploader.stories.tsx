import React, { useRef } from 'react';

import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { FileUploader, FileUploaderRef } from '../FileUploader';

export default {
  title: 'FileUploader',
  decorators: [(storyFn: () => JSX.Element) => <div style={{ padding: '10px' }}>{storyFn()}</div>],
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
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
MultipleAsyncFileUploader.parameters = { creevey: { skip: [true] } };

export const MultipleAsyncFileUploaderWithLoading = () => <FileUploader multiple request={loadingRequest} />;
MultipleAsyncFileUploaderWithLoading.parameters = { creevey: { skip: [true] } };

export const MultipleAsyncFileUploaderWithErrorRequest = () => <FileUploader multiple request={errorRequest} />;
MultipleAsyncFileUploaderWithErrorRequest.parameters = { creevey: { skip: [true] } };

/** sync control stories **/
export const SingleSyncFileUploader = () => <FileUploader />;
SingleSyncFileUploader.parameters = { creevey: { skip: [true] } };

export const MultipleSyncFileUploader = () => <FileUploader multiple />;
MultipleSyncFileUploader.parameters = { creevey: { skip: [true] } };

/** common stories **/
export const SingleFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} validateBeforeUpload={() => Promise.resolve('Формат файла неверный')} />
);
SingleFileUploaderWithFileError.parameters = { creevey: { skip: [true] } };

export const MultipleFileUploaderWithFileError = () => (
  <FileUploader
    multiple
    request={successRequest}
    validateBeforeUpload={() => Promise.resolve('Формат файла неверный')}
  />
);
MultipleFileUploaderWithFileError.parameters = { creevey: { skip: [true] } };

export const DifferentStates = () => (
  <Gapped vertical>
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
  </Gapped>
);

export const CustomWidth = () => (
  <Gapped vertical>
    100% <FileUploader width={'100%'} />
    550px <FileUploader width={550} />
  </Gapped>
);

export const FileUploaderRefFocusAndBlur = () => {
  const ref = useRef<FileUploaderRef>(null);
  return (
    <Gapped>
      <FileUploader multiple ref={ref} />
      <Button onClick={() => ref.current?.focus()}>Focus</Button>
      <Button onClick={() => ref.current?.blur()}>Blur</Button>
      <Button onClick={() => ref.current?.reset()}>Reset</Button>
    </Gapped>
  );
};
FileUploaderRefFocusAndBlur.parameters = { creevey: { skip: [true] } };

export const DifferentSizes = () => (
  <Gapped vertical>
    Single
    <Gapped>
      <FileUploader /> default
    </Gapped>
    <Gapped>
      <FileUploader size={'small'} /> small
    </Gapped>
    <Gapped>
      <FileUploader size={'medium'} /> medium
    </Gapped>
    <Gapped>
      <FileUploader size={'large'} /> large
    </Gapped>
    <Gapped>
      <FileUploader size={'large'} width={300} /> large
    </Gapped>
    Multiple
    <Gapped>
      <FileUploader /> default
    </Gapped>
    <Gapped>
      <FileUploader size={'small'} multiple /> small
    </Gapped>
    <Gapped>
      <FileUploader size={'medium'} multiple /> medium
    </Gapped>
    <Gapped>
      <FileUploader size={'large'} multiple /> large
    </Gapped>
    <Gapped>
      <FileUploader size={'large'} width={300} multiple /> large
    </Gapped>
  </Gapped>
);

export const MultipleFileUploaderWithHideFiles = () => <FileUploader multiple request={successRequest} hideFiles />;
MultipleFileUploaderWithHideFiles.parameters = { creevey: { skip: [true] } };
