using System;
using System.Diagnostics;
using System.IO;
using System.Management;
using System.Net;
using System.Threading;
using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests
{
    [SetUpFixture]
    [SaveScreenshotOfFailure]
    public class TestEnvironmentFixture
    {
        [OneTimeSetUp]
        public void SetUp()
        {
            if (TravisEnvironment.IsExecutionViaTravis)
            {
                tunnelIdentifier =
                    Environment.GetEnvironmentVariable("TRAVIS_JOB_NUMBER", EnvironmentVariableTarget.Process);
                webServerProcess = CreateWebServerProcess();
                webServerProcess.Start();

                WaitResponse("http://localhost:8083/");
            }
            else
            {
                tunnelIdentifier = Guid.NewGuid().ToString();
                sauceConnectProcess = CreateSauceConnectProcess(tunnelIdentifier);
                sauceConnectProcess.Start();
            }

            BrowserSetUp.SetUp(tunnelIdentifier);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            BrowserSetUp.TearDown();
            if (TravisEnvironment.IsExecutionViaTravis)
            {
                KillProcessAndChildren(webServerProcess.Id);
            }
            else
            {
                KillProcessAndChildren(sauceConnectProcess.Id);
            }
        }

        private static void WaitResponse(string url)
        {
            for(var i = 0; i < 2000; i++)
            {
                var httpResponse = WebRequest.CreateHttp(url);
                httpResponse.Timeout = (int)TimeSpan.FromHours(1).TotalMilliseconds;
                try
                {
                    using(var response = httpResponse.GetResponse())
                    {
                        using(var responseStream = response.GetResponseStream())
                        {
                            using(var responseStreamReader = new StreamReader(responseStream))
                            {
                                responseStreamReader.ReadToEnd();
                                return;
                            }
                        }
                    }
                }
                catch(WebException exception)
                {
                    if(exception.Response == null)
                    {
                        Thread.Sleep(2000);
                    }
                    else
                    {
                        using(var responseStream = exception.Response.GetResponseStream())
                        {
                            using(var responseStreamReader = new StreamReader(responseStream))
                            {
                                responseStreamReader.ReadToEnd();
                                return;
                            }
                        }
                    }
                }
                catch
                {
                    Thread.Sleep(2000);
                }
            }
            throw new Exception("Cannot wait response");
        }

        private static Process CreateWebServerProcess()
        {
            var processStartInfo = new ProcessStartInfo
                {
                    UseShellExecute = true,
                    FileName = "yarn",
                    WorkingDirectory = PathUtils.FindProjectRootFolder(),
                    Arguments = "start"
                };

            return new Process {StartInfo = processStartInfo};
        }

        private static Process CreateSauceConnectProcess(string tunnelIdentifier)
        {
            var processStartInfo = new ProcessStartInfo
                {
                    UseShellExecute = false,
                    FileName = "/usr/local/bin/node",
                    WorkingDirectory = PathUtils.FindProjectRootFolder(),
                    Arguments = $"sauce.js {tunnelIdentifier}"
                };

            return new Process {StartInfo = processStartInfo};
        }

        private static void KillProcessAndChildren(int pid)
        {
            // TODO crossplatform?
            var searcher = new ManagementObjectSearcher("Select * From Win32_Process Where ParentProcessID=" + pid);
            var moc = searcher.Get();
            foreach(var mo in moc)
            {
                KillProcessAndChildren(Convert.ToInt32(mo["ProcessID"]));
            }
            try
            {
                var proc = Process.GetProcessById(pid);
                proc.Kill();
            }
            catch(ArgumentException)
            {
                /* process already exited */
            }
        }

        private Process webServerProcess;
        private Process sauceConnectProcess;
        private string tunnelIdentifier;
    }
}
