using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SKBKontur.SeleniumTesting.Tests.Helpers
{
    public class NpmLibVersion : IComparable<NpmLibVersion>
    {
        public NpmLibVersion(string version)
        {
            this.version = version;
            var match = regex.Match(version);
            if(!match.Success)
            {
                throw new ArgumentException("Version should match pattern 'major.minor.patch'");
            }
            Major = int.Parse(match.Groups["major"].Value);
            Minor = int.Parse(match.Groups["minor"].Value);
            Patch = int.Parse(match.Groups["patch"].Value);
        }

        public int Major { get; }
        public int Minor { get; }
        public int Patch { get; }

        public static bool operator <(NpmLibVersion left, NpmLibVersion right)
        {
            return Comparer<NpmLibVersion>.Default.Compare(left, right) < 0;
        }

        public static bool operator >(NpmLibVersion left, NpmLibVersion right)
        {
            return Comparer<NpmLibVersion>.Default.Compare(left, right) > 0;
        }

        public static bool operator <=(NpmLibVersion left, NpmLibVersion right)
        {
            return Comparer<NpmLibVersion>.Default.Compare(left, right) <= 0;
        }

        public static bool operator >=(NpmLibVersion left, NpmLibVersion right)
        {
            return Comparer<NpmLibVersion>.Default.Compare(left, right) >= 0;
        }

        public override string ToString()
        {
            return version;
        }

        public int CompareTo(NpmLibVersion other)
        {
            if(ReferenceEquals(this, other))
            {
                return 0;
            }
            if(ReferenceEquals(null, other))
            {
                return 1;
            }
            var xComparison = Major.CompareTo(other.Major);
            if(xComparison != 0)
            {
                return xComparison;
            }
            var yComparison = Minor.CompareTo(other.Minor);
            if(yComparison != 0)
            {
                return yComparison;
            }
            return Patch.CompareTo(other.Patch);
        }

        private static readonly Regex regex = new Regex(@"^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$", RegexOptions.Compiled);
        private readonly string version;
    }
}