/* global gemini */

gemini.suite('Simple ToastView', (suite) => {
  suite
    .setCaptureElements(['[class^=".Toast-wrapper"]'])
    .setUrl('iframe.html?selectedKind=ToastView&selectedStory=simple toast')
    .capture('simple')
});

gemini.suite('ToastView With Action', (suite) => {
  suite
    .setCaptureElements(['[class^=".Toast-wrapper"]'])
    .setUrl('iframe.html?selectedKind=ToastView&selectedStory=with action')
    .capture('with action');
})
