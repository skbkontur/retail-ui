import { story, kind, test } from 'creevey';
import { delay } from '@skbkontur/react-ui/lib/delay';

kind('Input', () => {
  story('TwoWordsRequired', () => {
    test('invalidText', async (context) => {
      const input = await context.webdriver.findElement({ css: '[data-tid~="test-input"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(input)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ReactElementInMessage', () => {
    test('invalidText', async (context) => {
      const input = await context.webdriver.findElement({ css: '[data-tid~="test-input"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(input)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollMessage', () => {
    test('invalidText', async (context) => {
      const submitTop = await context.webdriver.findElement({ css: '[data-tid~="top-submit"]' });
      const submitCenter = await context.webdriver.findElement({ css: '[data-tid~="center-submit"]' });
      const submitBottom = await context.webdriver.findElement({ css: '[data-tid~="bottom-submit"]' });

      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitTop)
        .perform();
      await delay(500);
      const autoscrollAfterTopSubmit = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        window.scrollBy(0, -100);
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitCenter)
        .perform();
      await delay(500);
      const noScrollAfterCenterSubmit = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        window.scroll(0, window.document.body.scrollHeight);
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitBottom)
        .perform();
      await delay(1000);
      const autoscrollAfterBottomSubmit = await context.webdriver.takeScreenshot();

      await context.matchImages({
        autoscrollAfterTopSubmit,
        noScrollAfterCenterSubmit,
        autoscrollAfterBottomSubmit,
      });
    });
  });

  story('DependentFields', () => {
    test('maleInSelectAndAnotherInInput', async (context) => {
      const input = await context.webdriver.findElement({ css: '[data-tid~="test-input"]' });
      const select = await context.webdriver.findElement({ css: '[data-tid~="select"]' });
      const submit = await context.webdriver.findElement({ css: '[data-tid~="submit"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(select)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .click(input)
        .sendKeys('m')
        .click(submit)
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollInsideTheContainer', () => {
    test('clickSubmit', async (context) => {
      const submit = await context.webdriver.findElement({ css: '[data-tid~="submit"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submit)
        .perform();
      await delay(1500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('SelectFirstControlForValidation', () => {
    test('invalidText', async (context) => {
      const submit = await context.webdriver.findElement({ css: '[data-tid~="submit"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submit)
        .pause(500)
        .sendKeys("i'm active!")
        .perform();
      const focusedThenFilledWhenSubmitAndAllEmpty = await context.webdriver.takeScreenshot();

      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submit)
        .perform();
      const secondFocusedWhenSubmitAndFirstFull = await context.webdriver.takeScreenshot();
      await context.matchImages({ focusedThenFilledWhenSubmitAndAllEmpty, secondFocusedWhenSubmitAndFirstFull });
    });
  });

  story('ScrollWithFixedPlaceBottom', () => {
    test('invalidText', async (context) => {
      const submit = await context.webdriver.findElement({ css: '[data-tid~="submit"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submit)
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });
  });

  story('ValidationWithLevelWarning', () => {
    test('validateImmediate', async (context) => {
      const immediateValidationInput = await context.webdriver.findElement({
        css: '[data-tid~="immediate-validation-input"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(immediateValidationInput)
        .sendKeys('test')
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
    test('validateOnLostfocus', async (context) => {
      const lostfocusValidationInput = await context.webdriver.findElement({
        css: '[data-tid~="lostfocus-validation-input"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(lostfocusValidationInput)
        .sendKeys('test')
        .perform();
      const noTooltipImmediate = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .move({
          origin: lostfocusValidationInput,
        })
        .perform();
      const tooltipOnHover = await context.takeScreenshot();
      await context.matchImages({ noTooltipImmediate, tooltipOnHover });
    });
    test('validateOnSubmit', async (context) => {
      const submitValidationInput = await context.webdriver.findElement({
        css: '[data-tid~="submit-validation-input"]',
      });
      const submit = await context.webdriver.findElement({ css: '[data-tid~="submit"]' });

      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitValidationInput)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .move({
          origin: submitValidationInput,
        })
        .perform();
      const noTooltipOnBlur = await context.takeScreenshot();

      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submit)
        .move({
          origin: submitValidationInput,
        })
        .perform();
      await delay(1000);
      const tooltipOnSubmitAndHover = await context.takeScreenshot();

      await context.matchImages({ noTooltipOnBlur, tooltipOnSubmitAndHover });
    });
  });

  story('TooltipTopLeft', () => {
    test('invalidTooltip', async (context) => {
      const input = await context.webdriver.findElement({ css: '.react-ui-1xb4xgu' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(input)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .click(input)
        .pause(500)
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
