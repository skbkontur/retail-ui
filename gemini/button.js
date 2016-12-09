/* global gemini */

gemini.suite('button', (suite) => {
  suite.setUrl('/iframe.html?selectedKind=Button&selectedStory=playground')
    .setCaptureElements('#root')
    .capture('idle')
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('button'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('button'));
    })
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('button'));
    });
});
