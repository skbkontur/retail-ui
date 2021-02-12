import { getGuid } from './guidUtils';

export type ReadFileType = string | ArrayBuffer | null;

export interface IReadFile extends File {
  id: string;
  base64: ReadFileType;
}

export const readFile = (file: File): Promise<ReadFileType> => (
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  })
);

export const readFiles = (files: File[]): Promise<Array<IReadFile>> => {
  const filesPromises = files.map(file => readFile(file));

  return Promise.all(filesPromises)
    .then(readFiles => (
      readFiles.map((base64, index) => Object.assign(files[index], {id: getGuid(), base64}))
    ));
};
