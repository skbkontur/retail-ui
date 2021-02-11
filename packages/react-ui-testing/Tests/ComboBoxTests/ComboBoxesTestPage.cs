using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ComboBoxTests
{
    [AutoFillControls]
    public class ComboBoxesTestPage : PageBase
    {
        public ComboBoxesTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public ComboBox DisabledComboBox { get; private set; }
        public ComboBox SimpleComboBox { get; private set; }
        public ComboBox FilledComboBox { get; private set; }

        public ComboBox NotFoundComboBox { get; private set; }

        [Selector("##SimpleComboBox"), ChildSelector("noscript:portal MenuItem")]
        public ControlList<Label> SimpleComboBoxItems { get; private set; }

        [Selector("##ComboBoxNoPortal"), ChildSelector("DropdownContainer MenuItem")]
        public ControlList<Label> NoPortalComboBoxItems { get; private set; }

        public ComboBox ComboBoxNoPortal { get; private set; }
    }
}
