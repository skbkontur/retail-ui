using System;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading;
using DotNetEnv;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class StorybookTestBase : TestBase
    {
        public override void SetUp()
        {
            base.SetUp();

            var httpResponse = WebRequest.CreateHttp("https://fake.testkontur.ru/ip");
            var lanIP = new StreamReader(httpResponse.GetResponse().GetResponseStream()).ReadToEnd();
            var gitlabCIContainerIP = Env.GetString("CONTAINER_IP");
            Console.WriteLine($"The LAN IP is '{lanIP}'. The GitLab CI container IP is '{gitlabCIContainerIP}'");

            var hostIP = gitlabCIContainerIP ?? lanIP;
            Console.WriteLine($"Chosen host IP is '{hostIP}'");

            var match = storybookNamespacePattern.Match(GetType().FullName);
            var kind = match.Groups["Kind"].ToString();
            var story = match.Groups["Story"].ToString();

            var port = 6060;    

            var uri = new Uri($"http://{hostIP}:{port}/iframe.html?id={CreateStoryId(kind, story)}");

            Console.WriteLine($"Opening URL: {uri}");

            WebDriver.Navigate().GoToUrl(uri);
            Thread.Sleep(1000); // waiting for navigation
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
