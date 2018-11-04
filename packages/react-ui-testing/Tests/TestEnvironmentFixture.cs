using System;
using System.Diagnostics;
using System.IO;
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
            WaitResponse("http://localhost:8083/");

            var tunnelIdentifier = Environment.GetEnvironmentVariable("TRAVIS_JOB_NUMBER", EnvironmentVariableTarget.Process) ?? $"{Environment.MachineName}-{Guid.NewGuid()}";
            sauceConnectProcess = CreateSauceConnectProcess(tunnelIdentifier);
            sauceConnectProcess.Start();

            BrowserSetUp.SetUp(tunnelIdentifier);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            BrowserSetUp.TearDown();

            //tunnel closes on any data in stdin
            sauceConnectProcess.StandardInput.WriteLine("0");
            sauceConnectProcess.WaitForExit(TimeSpan.FromSeconds(30).Milliseconds);
        }

        private static void WaitResponse(string url)
        {
            for(var i = 0; i < 60; i++)
            {
                var httpResponse = WebRequest.CreateHttp(url);
                httpResponse.Timeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
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

        private static Process CreateSauceConnectProcess(string tunnelIdentifier)
        {
            var processStartInfo = new ProcessStartInfo
                {
                    UseShellExecute = false,
                    RedirectStandardInput = true,
                    FileName = "node",
                    WorkingDirectory = PathUtils.FindProjectRootFolder(),
                    Arguments = $"sauce.js {tunnelIdentifier}"
                };

            return new Process {StartInfo = processStartInfo};
        }

        private Process sauceConnectProcess;
    }
}
