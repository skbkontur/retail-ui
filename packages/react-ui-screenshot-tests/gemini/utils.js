module.exports = {
  renderStory(kind, story) {
    return function(actions) {
      actions.executeJS(
        eval(`(function() {
        return function(window) {
          window.renderStory({ kind: "${kind}", story: "${story}" });
        }
      })()`)
      );
    };
  }
};
