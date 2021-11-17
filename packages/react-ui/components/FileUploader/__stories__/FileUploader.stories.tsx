import React, { useRef } from 'react';

import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { FileUploader, IFileUploaderRef } from '../FileUploader';

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
export const MultipleAsyncFileUploaderWithLoading = () => <FileUploader multiple request={loadingRequest} />;
export const MultipleAsyncFileUploaderWithErrorRequest = () => <FileUploader multiple request={errorRequest} />;

/** sync control stories **/
export const SingleSyncFileUploader = () => <FileUploader />;
export const MultipleSyncFileUploader = () => <FileUploader multiple />;

/** common stories **/
export const FileUploaderDisabled = () => <FileUploader request={successRequest} disabled />;
export const SingleFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} getFileValidationText={() => Promise.resolve('Формат файла неверный')} />
);
export const MultipleFileUploaderWithFileError = () => (
  <FileUploader
    multiple
    request={successRequest}
    getFileValidationText={() => Promise.resolve('Формат файла неверный')}
  />
);

export const FileUploaderWithError = () => <FileUploader error />;
export const FileUploaderWithWarning = () => <FileUploader warning />;

export const SingleFileUploaderWith100PercentsWidth = () => <FileUploader width={'100%'} />;
export const MultipleFileUploaderWithCustomWidth = () => <FileUploader width={550} multiple />;

export const FileUploaderRefFocusAndBlur = () => {
  const ref = useRef<IFileUploaderRef>(null);
  return (
    <Gapped>
      <FileUploader multiple ref={ref}/>
      <Button onClick={() => ref.current?.focus()}>Focus</Button>
      <Button onClick={() => ref.current?.blur()}>Blur</Button>
    </Gapped>
  );
};
