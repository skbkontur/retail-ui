using System.Collections.Generic;
using System.Linq;

namespace SKBKontur.SeleniumTesting.TestFrameworks
{
    internal static class TestFrameworkProvider
    {
        public static void Throw(string message)
        {
            if(testFramework == null)
            {
                testFramework = DetectFramework();
            }

            testFramework.Throw(message);
        }

        private static ITestFramework DetectFramework()
        {
            ITestFramework detectedFramework = null;

            detectedFramework = AttemptToDetectUsingDynamicScanning();

            return detectedFramework;
        }

        private static ITestFramework AttemptToDetectUsingDynamicScanning()
        {
            return frameworks.Values.FirstOrDefault(framework => framework.IsAvailable);
        }

        #region Private Definitions

        private static readonly Dictionary<string, ITestFramework> frameworks = new Dictionary<string, ITestFramework>
            {
                {"nunit", new NUnitTestFramework()},
                {"xunit", new XUnitTestFramework()},
                {"mstestv2", new MSTestFrameworkV2()},
                {"fallback", new FallbackTestFramework()}
            };

        private static ITestFramework testFramework;

        #endregion
    }
}