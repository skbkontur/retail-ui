using System.Collections;

using NUnit.Framework;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class RetailUIAndReactVersions : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            foreach(var versionPair in ProcessUtils.GetRetailAndReactVersions())
            {
                yield return new TestFixtureData(versionPair.React, versionPair.ReactUI);
            }
        }
    }
}
