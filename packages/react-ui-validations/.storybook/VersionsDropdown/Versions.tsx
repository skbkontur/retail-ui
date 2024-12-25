import React from 'react';
import { MenuItem } from '@skbkontur/react-ui';

interface LibraryVersion {
  version: string;
  path: string;
}
interface ResponseData {
  versions: LibraryVersion[];
}

const untypicalVersionsToShow: string[] = [];
const typicalVersionPattern = /^\d+\.\d+\.\d+$/;

const baseUrl = 'https://ui.gitlab-pages.kontur.host/docs/storybook/react-ui-validations';
const createEndpoint = (path: string) => `${baseUrl}/${path}`;
const jsonEndpoint = createEndpoint('reactUIValidationsStorybookVersions.json');

const lastStyleguidistVersion: LibraryVersion = {
  version: '2.0.2 - last styleguidist documentation',
  path: 'https://tech.skbkontur.ru/react-ui-validations/',
};

const renderLibraryVersionItem = ({ path, version }: LibraryVersion) => {
  return (
    <MenuItem target="_blank" href={path}>
      {version}
    </MenuItem>
  );
};

const sortVersions = (a: LibraryVersion, b: LibraryVersion) => {
  const parseVersion = (version: string): number[] => {
    if (version === 'styleguidist') {
      return [-Infinity];
    }
    const match = version.match(typicalVersionPattern);
    return match ? match[0].split('.').map(Number) : [Infinity];
  };
  const splitA = parseVersion(a.version);
  const splitB = parseVersion(b.version);

  for (let i = 0; i < Math.max(splitA.length, splitB.length); i++) {
    if (splitA[i] < splitB[i]) {
      return 1;
    }
    if (splitA[i] > splitB[i]) {
      return -1;
    }
  }
  return a.version.localeCompare(b.version);
};

export const VersionsLibrary = () => {
  const [libraryVersions, setLibraryVersions] = React.useState<LibraryVersion[]>([]);

  React.useEffect(() => {
    const fetchAllVersionsLibrary = async () => {
      try {
        const response = await fetch(jsonEndpoint);
        if (!response.ok) {
          setLibraryVersions([]);
          return;
        }
        const { versions }: ResponseData = await response.json();
        setLibraryVersions(
          versions.filter((x) => x.version.match(typicalVersionPattern) || untypicalVersionsToShow.includes(x.version)),
        );
      } catch (err) {
        setLibraryVersions([]);
      }
    };

    void fetchAllVersionsLibrary();
  }, []);
  const allVersions: LibraryVersion[] = [...libraryVersions, lastStyleguidistVersion];

  return <>{allVersions.sort(sortVersions).map((libraryVersion) => renderLibraryVersionItem(libraryVersion))}</>;
};

export const getCurrentVersion = () => {
  const config = require('../../package.json');
  return config.version;
};
