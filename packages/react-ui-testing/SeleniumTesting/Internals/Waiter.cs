using System;
using System.Diagnostics;
using System.Threading;

using JetBrains.Annotations;

using SKBKontur.SeleniumTesting.Internals.Commons;
using SKBKontur.SeleniumTesting.TestFrameworks;

namespace SKBKontur.SeleniumTesting.Internals
{
    internal static class Waiter
    {
        [ContractAnnotation("tryFunc:false => halt")]
        public static void Wait(Func<bool> tryFunc, string actionDescription, string actualText = "", int? timeout = null)
        {
            timeout = (int)IncreseFirstTimeoutIfNeedForTeamcity(TimeSpan.FromMilliseconds(timeout ?? defaultTimeout)).TotalMilliseconds;
            DoWait(tryFunc, () => TestFrameworkProvider.Throw($"Действие {actionDescription} не выполнилось за {GetActualTimeout(timeout)} мс. {actualText}"), timeout);
        }

        private static TimeSpan IncreseFirstTimeoutIfNeedForTeamcity(TimeSpan timeout)
        {
            if(!TeamCityEnvironment.IsExecutionViaTeamCity) return timeout;
            if(firstWaitWasIncreased) return timeout;
            firstWaitWasIncreased = true;
            return TimeSpan.FromMilliseconds(timeout.TotalMilliseconds * firstTestTimeoutFactor);
        }

        public static void DoWait(Func<bool> tryFunc, Action doIfWaitFails, int? timeout = null)
        {
            var w = Stopwatch.StartNew();
            do
            {
                if(tryFunc())
                    return;
                Thread.Sleep(waitTimeout);
            } while(w.ElapsedMilliseconds < GetActualTimeout(timeout));
            doIfWaitFails();
        }

        private static int GetActualTimeout(int? timeout)
        {
            return timeout ?? defaultTimeout;
        }

        private const int waitTimeout = 100;
        private const int defaultTimeout = 20000;
        private const int firstTestTimeoutFactor = 3;
        private static bool firstWaitWasIncreased;
    }
}