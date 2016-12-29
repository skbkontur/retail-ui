/* global gemini */

gemini.suite('Small button Baseline', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Baseline&selectedStory=Button%20and%20text'). // eslint-disable-line max-len
    setCaptureElements('#test-element').
    capture('simple');
});

gemini.suite('Medium button Baseline', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Baseline&selectedStory=Medium%20Button%20and%20text'). // eslint-disable-line max-len
    setCaptureElements('#test-element').
    capture('simple');
});

gemini.suite('Large button Baseline', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Baseline&selectedStory=Large%20Button%20and%20text'). // eslint-disable-line max-len
    setCaptureElements('#test-element').
    capture('simple');
});

gemini.suite('Link and button Baseline', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Baseline&selectedStory=Button%20and%20link'). // eslint-disable-line max-len
    setCaptureElements('#test-element').
    capture('simple');
});

gemini.suite('Input and text Baseline', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Baseline&selectedStory=Input%20and%20text'). // eslint-disable-line max-len
    setCaptureElements('#test-element').
    capture('simple');
});
