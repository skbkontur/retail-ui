using System;

namespace SKBKontur.SeleniumTesting.Internals.Commons
{
    public class TeamCityEnvironment
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