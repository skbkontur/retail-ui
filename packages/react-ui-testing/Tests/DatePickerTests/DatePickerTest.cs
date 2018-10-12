using System;

using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.DatePickerTests
{
    [DefaultWaitInterval(2000)]
    public class DatePickerTest : TestBase
    {
        public DatePickerTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("DatePicker").GetPageAs<DatePickerTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleDatePicker.IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void TestInputDateInEmpty()
        {
            page.SimpleDatePicker.ClearAndInputDate(new DateTime(2017, 11, 30, 12, 0, 0));
            page.SimpleDatePicker.Value.Wait().That(Is.EqualTo("30.11.2017"));
        }

        [Test]
        public void TestInputTextInEmpty()
        {
            page.SimpleDatePicker.ClearAndInputText("30.11.2017");
            page.SimpleDatePicker.Value.Wait().That(Is.EqualTo("30.11.2017"));
        }

        [Test]
        public void TestInputDateInFilled()
        {
            page.FilledDatePicker.ClearAndInputDate(new DateTime(2017, 11, 30, 12, 0, 0));
            page.FilledDatePicker.Value.Wait().That(Is.EqualTo("30.11.2017"));
        }

        [Test]
        public void TestInputTextInFilled()
        {
            page.FilledDatePicker.ClearAndInputText("30.11.2017");
            page.FilledDatePicker.Value.Wait().That(Is.EqualTo("30.11.2017"));
        }

        [Test]
        public void TestValueInFilled()
        {
            page.FilledDatePicker.Value.Wait().That(Is.EqualTo("29.08.2016"));
        }

        [Test]
        public void TestClearFilled()
        {
            page.FilledDatePicker.Clear();
            page.FilledDatePicker.Value.Wait().That(Is.Empty);
        }

        [Test]
        public void TestDisabled()
        {
            page.DisabledDatePicker.IsDisabled.Wait().That(Is.True);
        }

        [Test]
        public void TestNotDisabled()
        {
            page.FilledDatePicker.IsDisabled.Wait().That(Is.False);
        }

        [Test]
        public void TestValueInDisabled()
        {
            page.DisabledDatePicker.Value.Wait().That(Is.EqualTo("31.12.2017"));
        }

        private DatePickerTestPage page;
    }
}