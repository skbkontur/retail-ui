using System;
using System.Diagnostics;
using System.IO;
using Newtonsoft.Json;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public static class ProcessUtils
    {
        public static Versions[] GetRetailAndReactVersions()
        {
            var p = new Process
            {
                StartInfo =
                {
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    FileName = "node",
                    Arguments = Path.Combine(PathUtils.FindProjectRootFolder(), "TestPages/print-versions.js")
                }
            };
            p.Start();
            var output = p.StandardOutput.ReadToEnd();
            var errorOutput = p.StandardError.ReadToEnd();
            p.WaitForExit();
            if (p.ExitCode != 0)
                throw new Exception(errorOutput);
            if (string.IsNullOrWhiteSpace(output))
                throw new Exception("Cannot extract versions");
            return JsonConvert.DeserializeObject<Versions[]>(output);
        }
    }
}
