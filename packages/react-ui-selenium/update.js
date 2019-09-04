const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const reportDir = path.join(__dirname, './report');
const imagesDir = path.join(__dirname, './images');

fs.readdirSync(reportDir).forEach(browserName => {
  const browserDir = path.join(reportDir, browserName);

  fs.readdirSync(browserDir).forEach(kind => {
    const kindDir = path.join(browserDir, kind);

    fs.readdirSync(kindDir).forEach(story => {
      const storyDir = path.join(kindDir, story);

      fs.readdirSync(storyDir).forEach(test => {
        const testDir = path.join(storyDir, test);

        fs.readdirSync(testDir)
          .filter(image => image.includes('-actual-'))
          .forEach(image => {
            const imageDir = path.join(imagesDir, browserName, kind, story, test);
            const srcPath = path.join(testDir, image);
            const dstPath = path.join(imageDir, image.replace(/-actual-\d+/, ''));

            mkdirp.sync(imageDir);

            fs.copyFileSync(srcPath, dstPath);
          });
      });
    });
  });
});
