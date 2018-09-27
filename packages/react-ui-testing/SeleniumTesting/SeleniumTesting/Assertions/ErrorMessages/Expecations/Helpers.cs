using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal static class Helpers
    {
        public static string FormatActualValues(ActualContainer actualContainer)
        {
            var actualValues = actualContainer.ActualValues;
            if(actualValues.Count > 0)
            {
                if(actualValues.Count == 1)
                {
                    return string.Format("было:" + Environment.NewLine + "  '{0}'", actualValues.Single());
                }
                var result = new StringBuilder();
                result.AppendLine("было:");
                result.Append(FormatStringValues(actualValues, 2));
                return result.ToString();
            }
            else
            {
                return $"не был найден контрол {actualContainer.NotFoundMessage.ControlType.Name}({actualContainer.NotFoundMessage.Control.GetAbsolutePathBySelectors()})";
            }
        }

        public static string FormatStringValue(string actualValue)
        {
            return $"  '{actualValue}'";
        }

        public static string FormatStringValues(IEnumerable<string> actualValues, int spacesBeforeEachLine)
        {
            var result = new StringBuilder();

            var prefix = new string(' ', spacesBeforeEachLine);
            result.AppendLine(prefix + "[");
            foreach(var actualValue in actualValues)
            {
                result.AppendLine(string.Format(prefix + "  '{0}',", actualValue));
            }
            result.Append(prefix + "]");

            return result.ToString();
        }
    }
}