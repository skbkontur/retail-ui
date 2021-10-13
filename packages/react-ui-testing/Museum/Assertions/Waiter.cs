using System;
using System.Diagnostics;
using System.Threading;

using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals.Commons;
using SKBKontur.SeleniumTesting.TestFrameworks;

namespace SKBKontur.SeleniumTesting.Assertions
{
    internal static class Waiter
    {
        public static void Wait(Func<bool> tryFunc, Func<TimeSpan, Exception, string> actionDescription, TimeSpan timeout)
        {
            timeout = IncreseFirstTimeoutIfNeedForTeamcity(timeout);
            DoWait(tryFunc, exception => TestFrameworkProvider.Throw(actionDescription(timeout, exception)), timeout);
        }

        private static TimeSpan IncreseFirstTimeoutIfNeedForTeamcity(TimeSpan timeout)
        {
            if(!TeamCityEnvironment.IsExecutionViaTeamCity) return timeout;
            if(firstWaitWasIncreased) return timeout;
            firstWaitWasIncreased = true;
            return TimeSpan.FromMilliseconds(timeout.TotalMilliseconds * firstTestTimeoutFactor);
        }

        private static void DoWait(Func<bool> tryFunc, Action<Exception> doIfWaitFails, TimeSpan timeout)
        {
            Exception lastException = null;
            var w = Stopwatch.StartNew();
            do
            {
                try
                {
                    if(tryFunc())
                        return;
                }
                catch(StaleElementReferenceException e)
                {
                    throw e;
                }
                catch(Exception exception)
                {
                    lastException = exception;
                }
                Thread.Sleep(waitTimeout);
            } while(w.Elapsed < timeout);
            doIfWaitFails(lastException);
        }

        private const int waitTimeout = 100;
        private const int firstTestTimeoutFactor = 3;
        private static bool firstWaitWasIncreased;
    }
}