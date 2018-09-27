namespace SKBKontur.SeleniumTesting.TestFrameworks
{
    internal interface ITestFramework
    {
        bool IsAvailable { get; }
        void Throw(string message);
    }
}