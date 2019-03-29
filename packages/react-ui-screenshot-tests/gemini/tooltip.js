/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Tooltip', () => {
  gemini.suite('static', suite => {
    suite
      .before(renderStory('Tooltip', 'static tooltip'))
      .setCaptureElements('#test-element')
      .capture('simple');
  });

  gemini.suite('left', suite => {
    suite
      .before(renderStory('Tooltip', 'tooltip left'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('right', suite => {
    suite
      .before(renderStory('Tooltip', 'tooltip right'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('bottom', suite => {
    suite
      .before(renderStory('Tooltip', 'tooltip bottom'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('wrap inline-block', suite => {
    suite
      .before(renderStory('Tooltip', 'Tooltips without wrapper around inline-block with 50% width'))
      .setCaptureElements('#test-element')
      .capture('hover', (actions, find) => {
        actions.mouseMove(find('textarea'));
      });
  });

  gemini.suite('Opened without wrapper', suite => {
    suite
      .before(renderStory('Tooltip', 'Opened tooltip without wrapper'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Opened by focus (Button)', suite => {
    suite
      .before(renderStory('Tooltip', 'focus tooltip'))
      .setCaptureElements('#test-element')
      .capture('01 - plain')
      .capture('02 - focus', actions => {
        actions.sendKeys(gemini.TAB);
      })
      .capture('03 - blur', (actions, find) => {
        actions.sendKeys(find('button'), gemini.TAB);
      })
      .skip.in('firefox', 'в firefox завезли поддержку focusin/focusout только с 52ой версии');
  });

  gemini.suite('Opened by focus (input)', suite => {
    suite
      .before(renderStory('Tooltip', 'focus tooltip (native input)'))
      .setCaptureElements('#test-element')
      .capture('01 - plain')
      .capture('02 - focus', (actions, find) => {
        actions.focus(find('input'));
      })
      .capture('03 - blur', (actions, find) => {
        actions.sendKeys(find('input'), gemini.TAB);
      })
      .skip.in('firefox', 'в firefox завезли поддержку focusin/focusout только с 52ой версии');
  });

  gemini.suite('with external dynamic content', suite => {
    suite
      .before(renderStory('Tooltip', 'Tooltip with external dynamic content'))
      .setCaptureElements('#test-element')
      .ignoreElements({ every: 'button' })
      .capture('01 - plain')

      .capture('02 - changes top position if does not fit', (actions, find) => {
        actions.click(find('#Container-0 button'));
      })
      .capture('03 - does not change position back on shrink', (actions, find) => {
        actions.click(find('#Container-0 button'));
      })

      .capture('04 - does not change top position if fits', (actions, find) => {
        actions.click(find('#Container-1 button'));
      })
      .capture('05 - does not change position on shrink', (actions, find) => {
        actions.click(find('#Container-1 button'));
      })

      .capture('06 - changes left position if does not fit', (actions, find) => {
        actions.click(find('#Container-2 button'));
      })
      .capture('07 - does not change position back on shrink', (actions, find) => {
        actions.click(find('#Container-2 button'));
      })

      .capture('08 - does not change bottom position if fits', (actions, find) => {
        actions.click(find('#Container-3 button'));
      })
      .capture('09 - does not change position on shrink', (actions, find) => {
        actions.click(find('#Container-3 button'));
      })

      .capture('10 - does not change bottom position if does not fit', (actions, find) => {
        actions.click(find('#Container-4 button'));
      })
      .capture('11 - does not change position on shrink', (actions, find) => {
        actions.click(find('#Container-4 button'));
      });
  });

  gemini.suite('with Input and switchable content', suite => {
    suite
      .before(renderStory('Tooltip', 'Tooltip with Input and switchable content'))
      .setCaptureElements('#test-element')
      .capture('focus and types', (actions, find) => {
        const input = find('input');

        actions.click(input);
        actions.sendKeys(input, 'Hi');
      })
      .capture('clear input', (actions, find) => {
        actions.sendKeys(find('input'), [gemini.BACK_SPACE, gemini.BACK_SPACE]);
      });
  });

  gemini.suite('with dynamically changing triggers', suite => {
    suite
      .before(renderStory('Tooltip', 'dynamic triggers'))
      .before((actions, find) => {
        this.anchor = find('#anchor');
      })
      .setCaptureElements('#test-element')
      .ignoreElements({ every: 'button' })

      .capture('without trigger')

      .capture('hover - mouseEnter', (actions, find) => {
        actions.click(find('#hover'));
        actions.mouseMove(this.anchor);
      })
      .capture('hover - mouseLeave', (actions, find) => {
        actions.mouseMove(find('body', [0, 0]));
      })

      .capture('click - click anchor', (actions, find) => {
        actions.click(find('#click'));
        actions.click(this.anchor);
      })
      .capture('click - click outside', (actions, find) => {
        actions.click(find('body'));
      })

      .capture('focus - focus', (actions, find) => {
        actions.click(find('#focus'));
        actions.focus(this.anchor);
      })
      .capture('focus - blur', (actions, find) => {
        actions.focus(find('body'));
      })

      .capture('opened', (actions, find) => {
        actions.click(find('#opened'));
      })

      .capture('closed', (actions, find) => {
        actions.click(find('#closed'));
      });
  });
});
