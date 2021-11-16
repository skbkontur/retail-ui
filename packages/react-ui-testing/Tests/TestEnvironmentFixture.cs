using System;
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
            // WaitResponse("http://localhost:8083/");

            var tunnelIdentifier = $"{Environment.MachineName}-{Guid.NewGuid()}";

            BrowserSetUp.SetUp(tunnelIdentifier);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            BrowserSetUp.TearDown();
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
    }
}
