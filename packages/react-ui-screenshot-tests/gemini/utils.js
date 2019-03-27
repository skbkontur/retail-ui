const { find } = require('gemini/lib/tests-api/find-func');

// NOTE For correct caching element id
// See `findElement` function in gemini/lib/tests-api/actions-builder.js
const body = find('body');

module.exports = {
  renderStory(kind, story) {
    return function(actions) {
      actions.mouseMove(body, { x: 0, y: 0 });
      actions.executeJS(
        eval(`(function() {
        return function(window) {
          window.scrollTo(0, 0);
          window.renderStory({ kind: "${kind}", story: "${story}" });
        }
      })()`),
      );
    };
  },
};
