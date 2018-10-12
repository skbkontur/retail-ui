using System;
using System.IO;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    internal static class PathUtils
    {
        public static string FindContainingDirectory(string filename)
        {
            var currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
            while(!File.Exists(Path.Combine(currentDirectory, filename)))
            {
                if(Directory.GetParent(currentDirectory) == null)
                    throw new Exception(string.Format("Cannot find directory containing {1}. Trying to find from: '{0}'", AppDomain.CurrentDomain.BaseDirectory, filename));
                currentDirectory = Directory.GetParent(currentDirectory).FullName;
            }
            return currentDirectory;
        }

        public static string FindProjectRootFolder()
        {
            return FindContainingDirectory("SeleniumTesting.sln");
        }
    }
}