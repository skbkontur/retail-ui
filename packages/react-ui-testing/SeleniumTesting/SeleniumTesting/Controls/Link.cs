using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Link : ControlBase
    {
        private const string Script = "var link = arguments[0];" +
                                      "var hasIcon = link.firstChild &&" +
                                      "              link.firstChild.firstChild &&" +
                                      "              link.firstChild.firstChild.getAttribute('data-comp-name') === 'Icon';" +
                                      "" +
                                      "if (!hasIcon) {" +
                                      "    return link.innerText;" +
                                      "}" +
                                      "" +
                                      "var clone = link.cloneNode(true);" +
                                      "clone.removeChild(clone.firstChild);" +
                                      "return clone.innerText;";

        public Link(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
        public IProp<string> Url => ValueFromElement(element => element.GetAttribute("href"));
        public IProp<string> Text => ValueFromElement(element => (string) ExecuteScript(Script, element));
    }
}