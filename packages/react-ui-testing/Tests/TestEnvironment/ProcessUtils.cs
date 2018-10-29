using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class Versions
    {
        [JsonProperty("react")] public string React { get; set; }

        [JsonProperty("retail-ui")] public string RetailUI { get; set; }
    }

    public static class ProcessUtils
    {
        public static string[][] GetRetailAndReactVersions()
        {
            var output = GetOutputVersions();
            return JsonConvert.DeserializeObject<List<Versions>>(output)
                .Select(x => new[] {x.React, x.RetailUI}).ToArray();
        }

        private static string GetOutputVersions()
        {
            var p = new Process
            {
                StartInfo =
                {
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    FileName = "node",
                    Arguments = Path.Combine(PathUtils.FindProjectRootFolder(), "TestPages/versions.js")
                }
            };
            p.Start();
            var output = p.StandardOutput.ReadToEnd();
            var errorOutput = p.StandardError.ReadToEnd();
            p.WaitForExit();
            if (p.ExitCode != 0) throw new Exception(errorOutput);
            if (string.IsNullOrWhiteSpace(output) || string.IsNullOrWhiteSpace(output.Trim())) throw new Exception("Cannot extract versions");
            return output;
        }
    }
}
