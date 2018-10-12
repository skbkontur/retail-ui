using System;
using System.Linq;
using System.Reflection;

namespace SKBKontur.SeleniumTesting.TestFrameworks
{
    internal abstract class LateBoundTestFramework : ITestFramework
    {
        public void Throw(string message)
        {
            Type exceptionType = assembly.GetType(ExceptionFullName);
            if(exceptionType == null)
            {
                throw new Exception($"Failed to create the assertion exception for the current test framework: \"{ExceptionFullName}, {assembly.FullName}\"");
            }

            throw (Exception)Activator.CreateInstance(exceptionType, message);
        }

        public bool IsAvailable
        {
            get
            {
                string prefix = AssemblyName + ",";

                assembly = AppDomain.CurrentDomain
                                    .GetAssemblies()
                                    .FirstOrDefault(a => a.FullName.StartsWith(prefix, StringComparison.CurrentCultureIgnoreCase));

                return (assembly != null);
            }
        }

        protected abstract string AssemblyName { get; }
        protected abstract string ExceptionFullName { get; }
        private Assembly assembly = null;
    }
}