using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

using Newtonsoft.Json;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public static class ProcessUtils
    {
        public static string[][] GetRetailAndReactVersions()
        {
            var output = GetOutputWithRetries();
            return JsonConvert.DeserializeObject<Dictionary<string, string[]>>(output)
                              .SelectMany(x => x.Value.Select(y => new[] {x.Key, y}))
                              .ToArray();
        }

        private static string GetOutputWithRetries()
        {
            for(var i = 0; i < 10; i++)
            {
                var result = GetOutput();
                if(string.IsNullOrWhiteSpace(result) || string.IsNullOrWhiteSpace(result.Trim()))
                {
                    continue;
                }
                return result;
            }
            throw new Exception("Cannot extract versions");
        }

        private static string GetOutput()
        {
            var p = new Process
                {
                    StartInfo =
                        {
                            UseShellExecute = false,
                            RedirectStandardOutput = true,
                            RedirectStandardError = true,
                            FileName = Path.Combine(PathUtils.FindProjectRootFolder(), "printVersions.bat")
                        }
                };
            p.Start();
            var output = p.StandardOutput.ReadToEnd();
            var errorOutput = p.StandardError.ReadToEnd();
            p.WaitForExit();
            if(p.ExitCode != 0)
            {
                throw new Exception(errorOutput);
            }
            return output;
        }
    }
}