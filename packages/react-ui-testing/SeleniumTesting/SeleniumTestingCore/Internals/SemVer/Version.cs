using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SKBKontur.SeleniumTesting.Internals.SemVer
{
    /// <summary>
    ///     A semantic version.
    /// </summary>
    internal class Version : IComparable<Version>, IEquatable<Version>
    {
        /// <summary>
        ///     Construct a new semantic version from a version string.
        /// </summary>
        /// <param name="input">The version string.</param>
        /// <param name="loose">When true, be more forgiving of some invalid version specifications.</param>
        /// <exception cref="System.ArgumentException">Thrown when the version string is invalid.</exception>
        public Version(string input, bool loose = false)
        {
            _inputString = input;

            var regex = loose ? looseRegex : strictRegex;

            var match = regex.Match(input);
            if(!match.Success)
            {
                throw new ArgumentException($"Invalid version string: {input}");
            }

            Major = Int32.Parse(match.Groups[1].Value);

            Minor = Int32.Parse(match.Groups[2].Value);

            Patch = Int32.Parse(match.Groups[3].Value);

            if(match.Groups[4].Success)
            {
                var inputPreRelease = match.Groups[5].Value;
                var cleanedPreRelease = PreReleaseVersion.Clean(inputPreRelease);
                if(!loose && inputPreRelease != cleanedPreRelease)
                {
                    throw new ArgumentException($"Invalid pre-release version: {inputPreRelease}");
                }
                PreRelease = cleanedPreRelease;
            }

            if(match.Groups[6].Success)
            {
                Build = match.Groups[7].Value;
            }
        }

        /// <summary>
        ///     Construct a new semantic version from version components.
        /// </summary>
        /// <param name="major">The major component of the version.</param>
        /// <param name="minor">The minor component of the version.</param>
        /// <param name="patch">The patch component of the version.</param>
        /// <param name="preRelease">The pre-release version string, or null for no pre-release version.</param>
        /// <param name="build">The build version string, or null for no build version.</param>
        public Version(int major, int minor, int patch,
                       string preRelease = null, string build = null)
        {
            Major = major;
            Minor = minor;
            Patch = patch;
            PreRelease = preRelease;
            Build = build;
        }

        /// <summary>
        ///     The major component of the version.
        /// </summary>
        public int Major { get; }

        /// <summary>
        ///     The minor component of the version.
        /// </summary>
        public int Minor { get; }

        /// <summary>
        ///     The patch component of the version.
        /// </summary>
        public int Patch { get; }

        /// <summary>
        ///     The pre-release string, or null for no pre-release version.
        /// </summary>
        public string PreRelease { get; }

        /// <summary>
        ///     The build string, or null for no build version.
        /// </summary>
        public string Build { get; }

        /// <summary>
        ///     Returns this version without any pre-release or build version.
        /// </summary>
        /// <returns>The base version</returns>
        public Version BaseVersion()
        {
            return new Version(Major, Minor, Patch);
        }

        /// <summary>
        ///     Returns the original input string the version was constructed from or
        ///     the cleaned version if the version was constructed from version components.
        /// </summary>
        /// <returns>The version string</returns>
        public override string ToString()
        {
            return _inputString ?? Clean();
        }

        /// <summary>
        ///     Return a cleaned, normalised version string.
        /// </summary>
        /// <returns>The cleaned version string.</returns>
        public string Clean()
        {
            var preReleaseString = PreRelease == null ? ""
                                       : $"-{PreReleaseVersion.Clean(PreRelease)}";
            var buildString = Build == null ? ""
                                  : $"+{Build}";

            return $"{Major}.{Minor}.{Patch}{preReleaseString}{buildString}";
        }

        /// <summary>
        ///     Calculate a hash code for the version.
        /// </summary>
        public override int GetHashCode()
        {
            // The build version isn't included when calculating the hash,
            // as two versions with equal properties except for the build
            // are considered equal.

            unchecked // Allow integer overflow with wrapping
            {
                int hash = 17;
                hash = hash * 23 + Major.GetHashCode();
                hash = hash * 23 + Minor.GetHashCode();
                hash = hash * 23 + Patch.GetHashCode();
                if(PreRelease != null)
                {
                    hash = hash * 23 + PreRelease.GetHashCode();
                }
                return hash;
            }
        }

        // Implement IEquatable<Version>
        /// <summary>
        ///     Test whether two versions are semantically equivalent.
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        public bool Equals(Version other)
        {
            if(ReferenceEquals(other, null))
            {
                return false;
            }
            return CompareTo(other) == 0;
        }

        // Implement IComparable<Version>
        public int CompareTo(Version other)
        {
            if(ReferenceEquals(other, null))
            {
                return 1;
            }

            foreach(var c in PartComparisons(other))
            {
                if(c != 0)
                {
                    return c;
                }
            }

            return PreReleaseVersion.Compare(this.PreRelease, other.PreRelease);
        }

        private IEnumerable<int> PartComparisons(Version other)
        {
            yield return Major.CompareTo(other.Major);
            yield return Minor.CompareTo(other.Minor);
            yield return Patch.CompareTo(other.Patch);
        }

        public override bool Equals(object other)
        {
            return Equals(other as Version);
        }

        public static bool operator ==(Version a, Version b)
        {
            if(ReferenceEquals(a, null))
            {
                return ReferenceEquals(b, null);
            }
            return a.Equals(b);
        }

        public static bool operator !=(Version a, Version b)
        {
            return !(a == b);
        }

        public static bool operator >(Version a, Version b)
        {
            if(ReferenceEquals(a, null))
            {
                return false;
            }
            return a.CompareTo(b) > 0;
        }

        public static bool operator >=(Version a, Version b)
        {
            if(ReferenceEquals(a, null))
            {
                return ReferenceEquals(b, null) ? true : false;
            }
            return a.CompareTo(b) >= 0;
        }

        public static bool operator <(Version a, Version b)
        {
            if(ReferenceEquals(a, null))
            {
                return ReferenceEquals(b, null) ? false : true;
            }
            return a.CompareTo(b) < 0;
        }

        public static bool operator <=(Version a, Version b)
        {
            if(ReferenceEquals(a, null))
            {
                return true;
            }
            return a.CompareTo(b) <= 0;
        }

        private readonly string _inputString;

        private static readonly Regex strictRegex = new Regex(@"^
            \s*v?
            (\d+)                     # major version
            \.
            (\d+)                     # minor version
            \.
            (\d+)                     # patch version
            (\-([0-9A-Za-z\-\.]+))?   # pre-release version
            (\+([0-9A-Za-z\-\.]+))?   # build metadata
            \s*
            $",
                                                              RegexOptions.IgnorePatternWhitespace);

        private static readonly Regex looseRegex = new Regex(@"^
            [v=\s]*
            (\d+)                     # major version
            \.
            (\d+)                     # minor version
            \.
            (\d+)                     # patch version
            (\-?([0-9A-Za-z\-\.]+))?  # pre-release version
            (\+([0-9A-Za-z\-\.]+))?   # build metadata
            \s*
            $",
                                                             RegexOptions.IgnorePatternWhitespace);
    }
}