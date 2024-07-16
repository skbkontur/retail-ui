import React from 'react';
import { Loader } from '../../Loader';
import { Link } from '../../Link';

const baseUrl = 'https://ui.gitlab-pages.kontur.host/docs/react-ui-storybook';
const createEndpoint = (path: string) => `${baseUrl}/${path}`;
const jsonEndpoint = createEndpoint('reactUIStorybookVersions.json');

interface LibraryVersion {
  version: string;
  path: string;
}
interface ResponseData {
  versions: LibraryVersion[];
}

const renderLibraryVersionItem = ({ path, version }: LibraryVersion) => {
  return (
    <li key={path}>
      {
        <Link target="_blank" href={path}>
          {version}
        </Link>
      }
    </li>
  );
};

const renderLibraryVersions = (libraryVersions: LibraryVersion[]) => {
  if (libraryVersions.length === 0) {
    return 'Список версий пуст';
  }

  return <ul>{libraryVersions.map((libraryVersion) => renderLibraryVersionItem(libraryVersion))}</ul>;
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
          return Promise.reject(Error(`Ошибка при запросе: ${response.status}`));
        }
        const { versions }: ResponseData = await response.json();
        setErrorMessage('');
        setLibraryVersions(versions);
      } catch (err) {
        setErrorMessage(err?.message || 'Ошибка при запросе');
        setLibraryVersions([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAllVersionsLibrary();
  }, []);

  return (
    <Loader active={isLoading}>
      {errMessage && <span>{errMessage}</span>}
      {!errMessage && !isLoading && renderLibraryVersions(libraryVersions)}
    </Loader>
  );
};
