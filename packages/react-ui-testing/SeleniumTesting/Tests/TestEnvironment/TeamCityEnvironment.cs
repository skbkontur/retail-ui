using System;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    internal class TeamCityEnvironment
    {
        public static bool IsExecutionViaTeamCity
        {
            get
            {
                if(isExecutionViaTeamCity == null)
                    isExecutionViaTeamCity = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("TEAMCITY_VERSION"));
                return isExecutionViaTeamCity.Value;
            }
        }

        private static bool? isExecutionViaTeamCity;
    }
}