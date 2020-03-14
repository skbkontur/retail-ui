import path from 'path';
import { CreeveyConfig } from 'creevey'

const config: CreeveyConfig = {
  enableFastStoriesLoading: true,
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: 'http://localhost:4444',
  storybookUrl: 'http://localhost:6060',
  browsers: {
    chrome: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
    }
  },
};

export default config;
