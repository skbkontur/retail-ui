using System;
using System.IO;
using System.Linq;
using System.Net;

namespace SKBKontur.SeleniumTesting.Internals.Commons
{
    public static class ScreenshotSaver
    {
        public static void Save(byte[] screenshotBytes, string testName, DateTime now, string screenshotNameForMessage = "Screenshot")
        {
            var currentScreenshotDirectory = Path.Combine(PathUtils.FindCatalogueProjectRootFolder(), screenshotsDirectory, now.ToString("yyyy-MM-dd"), GetShortTestName(testName));
            if(!Directory.Exists(currentScreenshotDirectory))
                Directory.CreateDirectory(currentScreenshotDirectory);
            var localPath = Path.Combine(currentScreenshotDirectory, now.ToString("HH-mm-ss") + ".png");
            try
            {
                File.WriteAllBytes(localPath, screenshotBytes);
            }
            catch(Exception exception)
            {
                Console.WriteLine("Cannot save screenshot to '{0}'", localPath);
                Console.WriteLine(exception);
            }

            var remoteAddress = $"http://sickcat:2201/screenshot/{now.ToString("yyyy-MM-dd")}/{GetShortTestName(testName)}/{now.ToString("HH-mm-ss")}";
            try
            {
                using(var client = new WebClient())
                    client.UploadData(remoteAddress, "POST", screenshotBytes);
            }
            catch(Exception exception)
            {
                Console.WriteLine("Cannot post screenshot to '{0}'", remoteAddress);
                Console.WriteLine(exception);
            }
            Console.WriteLine("{0} saved to:\r\n{1}\r\n{2}", screenshotNameForMessage, remoteAddress, ConvertToFileURI(localPath));
        }

        private static string ConvertToFileURI(string localPath)
        {
            return new Uri(localPath).AbsoluteUri;
        }

        private static string GetShortTestName(string testName)
        {
            return string.Join(".", testName.Split('.').Select(x => x.Replace(@"""", "")).Reverse().Take(2).Reverse());
        }

        private static readonly string screenshotsDirectory = ".screenshots";
    }
}