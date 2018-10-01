using System;
using JetBrains.Annotations;

namespace SKBKontur.SeleniumTesting
{
    public interface IBrowser : IDisposable
    {
        [NotNull]
        T GetPageAs<T>() where T : PageBase;

        [NotNull]
        Browser OpenUrl([NotNull] string url);

        [NotNull]
        string GetCurrentUrl();

        void SaveScreenshot([NotNull] string testName);
    }
}