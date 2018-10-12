using SKBKontur.SeleniumTesting.Internals.SemVer;

namespace SKBKontur.SeleniumTesting.Internals
{
    public static class SemverStringExtensions
    {
        public static bool IsVersionSatisfy(this string version, string expectedRange)
        {
            return new Range(expectedRange).IsSatisfied(new Version(version));
        }

        public static bool IsVersionSatisfyOrUndefined(this string version, string expectedRange)
        {
            if(string.IsNullOrWhiteSpace(version))
                return true;
            return new Range(expectedRange).IsSatisfied(new Version(version));
        }
    }
}