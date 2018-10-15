﻿using System;
using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ButtonTests
{
    [DefaultWaitInterval(2000)]
    public class ButtonTest : TestBase
    {
        public ButtonTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Button").GetPageAs<ButtonTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            Console.WriteLine("Button");
            page.SimpleButton.IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void TestWarning()
        {
            page.WarningButton.HasWarning.Wait().True();
        }

        private ButtonTestPage page;
    }
}
