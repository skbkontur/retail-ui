﻿using System;
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
            var kind = match.Groups["Kind"].ToString();
            var story = match.Groups["Story"].ToString();
            var port = 8081;
            var uri = new Uri($"http://localhost:{port}/iframe.html?path=/story/{CreateStoryId(kind, story)}");
            GetWebDriver().Navigate().GoToUrl(uri);
        }

        public static string CreateStoryId(string kind, string story)
        {
            return $"{kind}--{story}".Replace("_", "-").ToLower();
        }

        private static readonly Regex storybookNamespacePattern = new Regex(@"^.*\.Storybook\.(?<Kind>.*)\.(?<Story>.*)", RegexOptions.Compiled);
    }
}
