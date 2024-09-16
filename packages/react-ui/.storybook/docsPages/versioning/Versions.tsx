import React from 'react';

import { Loader } from '../../../components/Loader';
import { Link } from '../../../components/Link';

interface LibraryVersion {
  version: string;
  path: string;
}
interface ResponseData {
  versions: LibraryVersion[];
}

const baseUrl = 'https://ui.gitlab-pages.kontur.host/docs/storybook/react-ui';
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
  return (
    <>
      <p style={{ margin: '0' }}>Не удалось загрузить список версий.</p>
      <p style={{ margin: '0' }}>{errMessage ? `Ошибка при запросе: ${errMessage}.` : 'Ошибка при запросе.'}</p>
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
