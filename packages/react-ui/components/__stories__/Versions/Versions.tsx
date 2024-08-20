import React from 'react';

import { Loader } from '../../Loader';
import { Link } from '../../Link';

interface LibraryVersion {
  version: string;
  path: string;
}
interface ResponseData {
  versions: LibraryVersion[];
}

const baseUrl = 'https://ui.gitlab-pages.kontur.host/docs/react-ui-storybook';
const createEndpoint = (path: string) => `${baseUrl}/${path}`;
const jsonEndpoint = createEndpoint('reactUIStorybookVersions.json');

const renderLibraryVersionItem = ({ path, version }: LibraryVersion) => {
  return (
    <li key={path}>
      <Link target="_blank" href={path}>
        {version}
      </Link>
    </li>
  );
};

const renderLibraryVersions = (libraryVersions: LibraryVersion[]) => {
  if (libraryVersions.length === 0) {
    return <p>Список версий пуст.</p>;
  }

  return <ul>{libraryVersions.map((libraryVersion) => renderLibraryVersionItem(libraryVersion))}</ul>;
};

const renderErrorMessage = (errMessage?: string) => {
  const fetchErrMessage = errMessage ? `Ошибка при запросе: ${errMessage}.` : 'Ошибка при запросе.';
  return (
    <>
      <p style={{ margin: '0' }}>Не удалось загрузить список версий.</p>
      <p style={{ margin: '0' }}>{fetchErrMessage}</p>
    </>
  );
};

export const VersionsLibrary = () => {
  const [errMessage, setErrorMessage] = React.useState('');
  const [libraryVersions, setLibraryVersions] = React.useState<LibraryVersion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchAllVersionsLibrary = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(jsonEndpoint);
        if (!response.ok) {
          setErrorMessage(`${response.status}`);
          setLibraryVersions([]);
          return;
        }
        const { versions }: ResponseData = await response.json();
        setErrorMessage('');
        setLibraryVersions(versions);
      } catch (err) {
        setErrorMessage(err?.message);
        setLibraryVersions([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAllVersionsLibrary();
  }, []);

  return (
    <Loader active={isLoading}>
      {errMessage && renderErrorMessage(errMessage)}
      {!errMessage && !isLoading && renderLibraryVersions(libraryVersions)}
    </Loader>
  );
};
