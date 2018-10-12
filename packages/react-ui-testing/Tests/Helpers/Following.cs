using System;

using NUnit.Framework;

namespace SKBKontur.SeleniumTesting.Tests.Helpers
{
    public static class Following
    {
        public static Action Code(Action action)
        {
            return action;
        }

        public static void CodeFails(params Action[] actions)
        {
            foreach(var action in actions)
            {
                try
                {
                    action();
                    Assert.Fail("All actions should fails");
                }
                catch(AssertionException exception)
                {
                    Console.WriteLine(exception.Message);
                    Console.WriteLine();
                    Console.WriteLine();
                }
            }
        }
    }
}