import { FileUploader, FileUploaderDataTids } from '@skbkontur/react-ui/components/FileUploader/FileUploader';
import type { FileUploaderProps } from '@skbkontur/react-ui/components/FileUploader/FileUploader';
import { FileUploaderFileDataTids } from '@skbkontur/react-ui/components/FileUploader/FileUploaderFile';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { ValidationBehaviour, ValidationContainerProps } from '../index.js';

const initialFiles = [1, 2, 3].map((n) => new File(['content'], `file-${n}.txt`, { type: 'text/plain' }));

interface TestFormProps extends Pick<FileUploaderProps, 'initialFiles' | 'multiple' | 'request' | 'onValueChange'> {
  type?: ValidationBehaviour;
  onValidationUpdated?: ValidationContainerProps['onValidationUpdated'];
}

const TestForm = ({
  type = 'submit',
  multiple = true,
  initialFiles: files = initialFiles,
  onValidationUpdated,
  onValueChange: onFilesChange,
  ...uploaderProps
}: TestFormProps) => {
  const container = React.useRef<ValidationContainer>(null);
  const [count, setCount] = React.useState(multiple ? files.length : Math.min(files.length, 1));
  const onValueChange: FileUploaderProps['onValueChange'] = (files) => {
    setCount(files.length);
    onFilesChange?.(files);
  };

  return (
    <ValidationContainer ref={container} onValidationUpdated={onValidationUpdated}>
      <ValidationWrapper validationInfo={{ type, message: `Files: ${count}` }}>
        <FileUploader {...uploaderProps} multiple={multiple} initialFiles={files} onValueChange={onValueChange} />
      </ValidationWrapper>
      <output data-tid="file-count">{count}</output>
      <button onClick={() => container.current?.validate(true)}>Submit</button>
    </ValidationContainer>
  );
};

describe('FileUploader validations', () => {
  const originalFiles = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'files');

  beforeEach(() => {
    vi.stubGlobal(
      'DataTransfer',
      class {
        public files: File[] = [];
        public items = { add: (file: File) => this.files.push(file) };
      },
    );
    Object.defineProperty(HTMLInputElement.prototype, 'files', { configurable: true, writable: true, value: [] });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalFiles) {
      Object.defineProperty(HTMLInputElement.prototype, 'files', originalFiles);
    }
  });

  it('hides the submit error on file removal and shows the new error on submit', async () => {
    const user = userEvent.setup();
    render(<TestForm type="submit" />);
    const root = screen.getByTestId(FileUploaderDataTids.root);

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await user.hover(root);
    expect(await screen.findByText('Files: 3')).toBeInTheDocument();

    await user.click(screen.getAllByTestId(FileUploaderFileDataTids.fileIcon)[0]);
    expect(screen.getByTestId('file-count')).toHaveTextContent('2');
    await user.unhover(root);
    await user.hover(root);
    await waitFor(() => expect(screen.queryByText('Files: 3')).not.toBeInTheDocument());
    expect(screen.queryByText('Files: 2')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await user.hover(root);
    expect(await screen.findByText('Files: 2')).toBeInTheDocument();
  });

  it('hides the lostfocus error on file removal and shows the new error on blur', async () => {
    const user = userEvent.setup();
    render(<TestForm type="lostfocus" />);
    const root = screen.getByTestId(FileUploaderDataTids.root);
    const input = screen.getByTestId(FileUploaderDataTids.input);

    fireEvent.blur(input);
    await user.hover(root);
    expect(await screen.findByText('Files: 3')).toBeInTheDocument();
    await user.click(screen.getAllByTestId(FileUploaderFileDataTids.fileIcon)[0]);
    await waitFor(() => expect(screen.queryByText('Files: 3')).not.toBeInTheDocument());

    fireEvent.blur(input);
    await user.hover(root);
    expect(await screen.findByText('Files: 2')).toBeInTheDocument();
  });

  it('updates the immediate error after file removal', async () => {
    const user = userEvent.setup();
    render(<TestForm type="immediate" />);
    const root = screen.getByTestId(FileUploaderDataTids.root);

    await user.hover(root);
    expect(await screen.findByText('Files: 3')).toBeInTheDocument();
    await user.click(screen.getAllByTestId(FileUploaderFileDataTids.fileIcon)[0]);
    await user.hover(root);

    expect(await screen.findByText('Files: 2')).toBeInTheDocument();
    expect(screen.queryByText('Files: 3')).not.toBeInTheDocument();
  });

  it('does not report the form as valid when the immediate error remains after file removal', async () => {
    const onValidationUpdated = vi.fn();
    const user = userEvent.setup();
    render(<TestForm type="immediate" onValidationUpdated={onValidationUpdated} />);
    const root = screen.getByTestId(FileUploaderDataTids.root);

    await user.hover(root);
    expect(await screen.findByText('Files: 3')).toBeInTheDocument();
    onValidationUpdated.mockClear();

    await user.click(screen.getAllByTestId(FileUploaderFileDataTids.fileIcon)[0]);
    await user.hover(root);

    expect(await screen.findByText('Files: 2')).toBeInTheDocument();
    expect(onValidationUpdated).not.toHaveBeenCalledWith(true);
  });

  it.each([
    { operation: 'upload success', expectedStatus: 'Uploaded' },
    { operation: 'upload failure', expectedStatus: 'Error' },
  ] as const)('keeps the submit error after $operation', async ({ operation, expectedStatus }) => {
    let resolve!: () => void;
    let reject!: (reason: Error) => void;
    const pending = new Promise<void>((resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    });
    const onValueChange = vi.fn();
    const onValidationUpdated = vi.fn();
    const user = userEvent.setup();
    render(
      <TestForm
        type="submit"
        initialFiles={[]}
        request={() => pending}
        onValueChange={onValueChange}
        onValidationUpdated={onValidationUpdated}
      />,
    );
    fireEvent.change(screen.getByTestId(FileUploaderDataTids.input), {
      target: { files: [initialFiles[0]] },
    });
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    const root = screen.getByTestId(FileUploaderDataTids.root);
    await user.hover(root);
    expect(await screen.findByText('Files: 1')).toBeInTheDocument();
    onValidationUpdated.mockClear();

    await act(async () => {
      if (operation === 'upload failure') {
        reject(new Error('Upload failed'));
      } else {
        resolve();
      }
      await pending.catch(() => undefined);
    });

    expect(onValueChange).toHaveBeenLastCalledWith([expect.objectContaining({ status: expectedStatus })]);
    expect(onValidationUpdated).not.toHaveBeenCalledWith(true);
    await user.unhover(root);
    await user.hover(root);
    expect(await screen.findByText('Files: 1')).toBeInTheDocument();
  });
});
