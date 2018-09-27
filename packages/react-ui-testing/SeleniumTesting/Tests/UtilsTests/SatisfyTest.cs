using NUnit.Framework;

using SKBKontur.SeleniumTesting.Internals;

namespace SKBKontur.SeleniumTesting.Tests.UtilsTests
{
    public class VersionSatisfyTest
    {
        [Test]
        public void TestSimplgeSatisfy()
        {
            Assert.That("3.1.2".IsVersionSatisfy("3.x"));
            Assert.That("3.1.2".IsVersionSatisfy(">=3.1.0"));
            Assert.That("3.1.2".IsVersionSatisfy(">3.1.0"));
            Assert.That("3.1.2".IsVersionSatisfy("3.2"), Is.False);
            Assert.That("3.1.2".IsVersionSatisfy("3.0.x"), Is.False);
        }
    }
}