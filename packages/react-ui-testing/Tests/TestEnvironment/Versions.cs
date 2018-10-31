using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class Versions
    {
        [JsonProperty("react")]
        public string React { get; set; }

        [JsonProperty("retail-ui")]
        public string RetailUI { get; set; }
    }
}
