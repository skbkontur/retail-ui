using Newtonsoft.Json;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class Versions
    {
        [JsonProperty("react")]
        public string React { get; set; }

        [JsonProperty("@skbkontur/react-ui")]
        public string ReactUI { get; set; }
    }
}
