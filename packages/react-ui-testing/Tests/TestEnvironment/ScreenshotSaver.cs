using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public static class ScreenshotSaver
    {
        public static void Save(byte[] screenshotBytes, string testName, DateTime now)
        {
            var currentScreenshotDirectory = Path.Combine(PathUtils.FindProjectRootFolder(), screenshotsDirectory,
                now.ToString("yyyy-MM-dd"), GetShortTestName(testName));
            if(!Directory.Exists(currentScreenshotDirectory))
                Directory.CreateDirectory(currentScreenshotDirectory);
            var fileName = $"{now:HH-mm-ss}.png";
            var filePath = Path.Combine(currentScreenshotDirectory, fileName);

            try
            {
                File.WriteAllBytes(filePath, screenshotBytes);
                Console.WriteLine($"##teamcity[publishArtifacts '{filePath} => {screenshotsDirectory}']");
                Console.WriteLine($"##teamcity[testMetadata type='image' value='{screenshotsDirectory}/{fileName}']");
                Console.WriteLine("Screenshot saved to:\r\n{0}", ConvertToFileURI(filePath));
            }
            catch(Exception exception)
            {
                Console.WriteLine("Cannot save screenshot to '{0}'", filePath);
                Console.WriteLine(exception);
            }
        }

        private static string ConvertToFileURI(string localPath)
        {
            return new Uri(localPath).AbsoluteUri;
        }

        private static string GetShortTestName(string testName, int maxLength = 128)
        {
            var testNameLocal = GetLocalTestName(testName);
            var resultLength = Math.Min(maxLength, testNameLocal.Length);
            var result = new StringBuilder(resultLength);

            foreach(var symbol in testNameLocal.Take(resultLength))
            {
                var value = !IsUrlSafeChar(symbol) || InvalidPathChars.Contains(symbol) ? '_' : symbol;
                result.Append(value);
            }

            return result.ToString();
        }

        private static string GetLocalTestName(string testName)
        {
            return string.Join(".", testName.Split('.').Reverse().Take(2).Reverse());
        }

        private static bool IsUrlSafeChar(char ch)
        {
            if((ch >= 97 && ch <= 122) || (ch >= 65 && ch <= 90) || (ch >= 48 && ch <= 57) || ch == 33)
                return true;
            switch(ch)
            {
                case '(':
                case ')':
                case '*':
                case '-':
                case '.':
                case '_':
                    return true;
                default:
                    return false;
            }
        }

        private static readonly HashSet<char> InvalidPathChars = new HashSet<char>(Path.GetInvalidPathChars());

        private static readonly string screenshotsDirectory = ".screenshots";
    }
}
