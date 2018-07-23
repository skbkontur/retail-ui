using SKBKontur.SeleniumTesting;

namespace SKBKontur.ValidationTests.Bases
{
    public class TestBase
    {
        protected static string GetStoryUrl(string kind, string storyName)
        {
            return string.Format("http://localhost:8081/?selectedKind={0}&selectedStory={1}&full=1", kind, storyName);
        }

        protected T GetValue<T>(string kindName, string storyName) where T : PageBase
        {
            BrowserSetUpFixture.browser.OpenUrl(GetStoryUrl(kindName, storyName));
            return BrowserSetUpFixture.browser.GetPageAs<T>();
        }
    }
}