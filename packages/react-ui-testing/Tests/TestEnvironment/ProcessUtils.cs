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
            var output = GetOutputWithRetries();
            return JsonConvert.DeserializeObject<List<Versions>>(output)
                .Select(x => new[] {x.React, x.RetailUI}).ToArray();
        }

        private static string GetOutputWithRetries()
        {
            for (var i = 0; i < 10; i++)
            {
                var result = GetOutputWithLatestVersion();
                if (string.IsNullOrWhiteSpace(result) || string.IsNullOrWhiteSpace(result.Trim())) continue;
                return result;
            }

            throw new Exception("Cannot extract versions");
        }

        private static string GetOutputWithLatestVersion()
        {
            var p = new Process
            {
                StartInfo =
                {
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    FileName = "node",
                    Arguments = Path.Combine(PathUtils.FindProjectRootFolder(), "TestPages/versionsForRun.js")
                }
            };
            p.Start();
            var output = p.StandardOutput.ReadToEnd();
            var errorOutput = p.StandardError.ReadToEnd();
            p.WaitForExit();
            if (p.ExitCode != 0) throw new Exception(errorOutput);
            return output;
        }
    }
}
