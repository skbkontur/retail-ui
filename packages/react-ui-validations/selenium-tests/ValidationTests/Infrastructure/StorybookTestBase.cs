using System;
using System.Text.RegularExpressions;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class StorybookTestBase : TestBase
    {
        public override void SetUp()
        {
            base.SetUp();
            var match = storybookNamespacePattern.Match(GetType().FullName);
            var kind = match.Groups["Kind"].ToString();
            var story = match.Groups["Story"].ToString();
            var port = 6060;
            var uri = new Uri($"http://localhost:{port}/iframe.html?id={CreateStoryId(kind, story)}");
            WebDriver.Navigate().GoToUrl(uri);
        }

        public static string CreateStoryId(string kind, string story)
        {
            // Превращает название "TestCaseCase" в "test-case-case"
            var storybookUrlStoryName = Regex.Replace(story, "(?<!^)([A-Z])", "-$1", RegexOptions.Compiled);
            return $"{kind}--{storybookUrlStoryName}".ToLower();
        }

        private static readonly Regex storybookNamespacePattern = new Regex(@"^.*\.Storybook\.(?<Kind>.*)\.(?<Story>.*)", RegexOptions.Compiled);
    }
}
