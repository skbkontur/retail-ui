const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const fetch = require('node-fetch');

const packages = ['@skbkontur/react-ui', '@skbkontur/react-ui-addons', '@skbkontur/react-ui-validations'];

// const raw = readFileSync(join(__dirname, 'search.json'));
let obj = {};

var query = `
query ($query: String!) {
  search(query: $query) {
    results {
      matchCount
			approximateResultCount
      results {
        ... on FileMatch {
          file {
            path
            content
          }
          repository {
            name
          }
        }
      }
    }
  }
}
`;

const variables = {
  query: '@skbkontur/react-ui file:package.json fork:yes',
};

fetch('https://sg.testkontur.ru/.api/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'token 82e3078868f7ab30985a068422ea2ba6b7e01974',
  },
  body: JSON.stringify({
    query,
    variables,
  }),
})
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    obj = data;

    if (!obj?.data?.search) {
      console.log('Error', obj);
      return;
    }

    let result = packages.reduce((acc, name) => ({ ...acc, [name]: { total: 0, versions: {}, matches: {} } }), {});

    obj.data.search.results.results.forEach(({ file, repository }) => {
      const json = JSON.parse(file.content);
      packages.forEach((packageName) => {
        const version = json.dependencies?.[packageName] || '';
        if (version) {
          const trimmedVersion = version.replace(/[\^~]/, '');
          result[packageName].total += 1;
          result[packageName].versions[trimmedVersion] = (result[packageName].versions[trimmedVersion] || 0) + 1;
          result[packageName].matches[repository.name.replace('git.testkontur.ru/', '')] = {
            ...result[packageName].matches[repository.name.replace('git.testkontur.ru/', '')],
            [file.path]: trimmedVersion,
          };
        }
      });
    });

    console.dir(result, { depth: null });

    writeFileSync(join(__dirname, 'result.json'), JSON.stringify(result, null, 2));
  })
  .catch(console.log);

// const res = {
//   '@skbkontur/react-ui': {
//     'total': 30,
//     'versions': {
//       '1.0.0': 2,
//     },
//     'matches': {
//       'xcom/xcom': {
//         '../../package.json': '1.0.0',
//         '../../../package.json': '1.0.0',
//       },
//     }
//     // ...
//   },
//   '@skbkontur/react-ui-validations': {
//     'xcom/xcom': {
//       '../../package.json': '1.0.0',
//       '../../../package.json': '1.0.0',
//     },
//     // ...
//   },
// };
