using System.Collections;

using NUnit.Framework;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class RetailUIAndReactVersions : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            if(!TeamCityEnvironment.IsExecutionViaTeamCity)
            {
                yield break;
            }
            foreach(var versionPair in ProcessUtils.GetRetailAndReactVersions())
            {
                yield return new TestFixtureData(versionPair[0], versionPair[1]);
            }
        }
    }
}