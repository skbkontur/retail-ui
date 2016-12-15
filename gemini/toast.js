/* global gemini */

gemini.suite('Simple ToastView', (suite) => {
  suite.
    setUrl('iframe.html?selectedKind=ToastView&selectedStory=simple toast').
    setCaptureElements(['[class^="Toast-root"]']).
    capture('simple');
});

gemini.suite('ToastView With Action', (suite) => {
  suite.
    setUrl('iframe.html?selectedKind=ToastView&selectedStory=with action').
    setCaptureElements(['[class^="Toast-root"]']).
    capture('with action');
});
