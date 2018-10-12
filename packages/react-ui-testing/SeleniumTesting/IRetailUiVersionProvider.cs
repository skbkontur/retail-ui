using JetBrains.Annotations;

namespace SKBKontur.SeleniumTesting
{
    public interface IRetailUiVersionProvider
    {
        [CanBeNull]
        string GetRetailUiVersion();
    }
}