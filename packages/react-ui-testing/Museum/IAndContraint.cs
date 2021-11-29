namespace SKBKontur.SeleniumTesting
{
    public interface IAndContraint<out T>
    {
        T And { get; }
    }

    public class AndContraint<T> : IAndContraint<T>
    {
        public AndContraint(T context)
        {
            this.And = context;
        }

        public T And { get; }
    }
}