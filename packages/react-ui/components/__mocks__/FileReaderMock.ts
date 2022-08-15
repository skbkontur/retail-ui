const FILE_READER = window.FileReader;

export class FileReaderMock {
  static errorMock() {
    const dummyFileReader = {
      readAsDataURL: () => {
        dummyFileReader.onerror();
      },
      onerror: () => {
        return;
      },
    };
    // @ts-expect-error: Made for testing purposes.
    window.FileReader = jest.fn(() => dummyFileReader);
  }

  static resetMock() {
    window.FileReader = FILE_READER;
  }
}
