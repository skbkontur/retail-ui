using System;
using System.Text.RegularExpressions;

using NUnit.Framework;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class StorybookTestBase : TestBase
    {
        [SetUp]
        public void SetUp()
        {
            var match = storybookNamespacePattern.Match(GetType().FullName);
            var kind = match.Groups["Kind"];
            var story = match.Groups["Story"];
            var port = 8081;
            var uri = new Uri($"http://localhost:{port}/iframe.html?selectedKind={kind}&selectedStory={story}");
            GetWebDriver().Navigate().GoToUrl(uri);
        }

        private static readonly Regex storybookNamespacePattern = new Regex(@"^.*\.Storybook\.(?<Kind>.*)\.(?<Story>.*)", RegexOptions.Compiled);
    }
}
