import React from 'react';

import { Loader } from '../../../components/Loader';
import { Link } from '../../../components/Link';
const oldVersions = require('./oldVersions.json');

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
  const versionNumber = version.split('.');
  let versionHeader;
  if ((versionNumber[1] === '0' && versionNumber[2] === '0') || version === '5.x') {
    // 'major'
    versionHeader = <h2>{version}</h2>;
  } else if (versionNumber[2] === '0') {
    // 'minor'
    versionHeader = <h3 style={{ paddingLeft: '20px' }}>{version}</h3>;
  } else {
    // 'patch'
    versionHeader = <h4 style={{ paddingLeft: '40px' }}>{version}</h4>;
  }

  return (
    <Link target="_blank" href={path} style={{ display: 'block' }}>
      {versionHeader}
    </Link>
  );
};

const renderLibraryVersions = (libraryVersions: LibraryVersion[]) => {
  if (libraryVersions.length === 0) {
    return <p>Список версий пуст.</p>;
  }
  return (
    <>
      {libraryVersions.map((libraryVersion) => renderLibraryVersionItem(libraryVersion))}
      {oldVersions.map((libraryVersion: LibraryVersion) => renderLibraryVersionItem(libraryVersion))}
    </>
  );
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
        setLibraryVersions(versions.filter((x) => !isNaN(Number(x.version.split('.')[0]))));
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
