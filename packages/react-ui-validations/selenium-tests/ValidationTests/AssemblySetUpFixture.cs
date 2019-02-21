using Kontur.Selone.Extensions;
using Kontur.Selone.WebDrivers;

using NUnit.Framework;

using SKBKontur.ValidationTests.Infrastructure;

[assembly : Parallelizable(ParallelScope.Children)]
[assembly : LevelOfParallelism(1)]

namespace SKBKontur.ValidationTests
{
    [SetUpFixture]
    public class AssemblySetUpFixture
    {
        [OneTimeSetUp]
        public void SetUp()
        {
            var factory = new ChromeDriverFactory();
            var cleaner = new DelegateWebDriverCleaner(x => x.ResetWindows());
            WebDriverPool = new WebDriverPool(factory, cleaner);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            WebDriverPool.Clear();
        }

        public static WebDriverPool WebDriverPool { get; private set; }
    }
}
