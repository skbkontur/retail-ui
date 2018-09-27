using System.Collections.Generic;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    public class ActualContainer
    {
        public List<string> ActualValues { get; set; }
        public ElementNotFoundException NotFoundMessage { get; set; }
    }
}