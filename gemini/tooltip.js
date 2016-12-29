/* global gemini */

gemini.suite('Tooltip', (suite) => {
  suite.
    setUrl('iframe.html?selectedKind=Tooltip&selectedStory=static tooltip').
    setCaptureElements(['[class^="Box-root"]']).
    capture('simple');
});
