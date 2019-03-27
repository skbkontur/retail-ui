using System;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class TeamcityEnvironment
    {
        public static bool IsExecutionViaTeamcity
        {
            get
            {
                if(isExecutionViaTeamcity == null)
                    isExecutionViaTeamcity = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("TEAMCITY_VERSION"));
                return isExecutionViaTeamcity.Value;
            }
        }

        private static bool? isExecutionViaTeamcity;
    }
}
