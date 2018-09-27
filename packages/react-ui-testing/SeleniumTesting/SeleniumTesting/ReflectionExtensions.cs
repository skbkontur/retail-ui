using System;
using System.Collections.Generic;
using System.Linq;

namespace SKBKontur.SeleniumTesting
{
    internal static class ReflectionExtensions
    {
        public static IEnumerable<T> GetCurrentTypeAttributes<T>(this Type type)
        {
            if(type == null || type == typeof(object))
                return new T[0];
            var baseInterfaces = new List<Type>();
            if(type.BaseType != null)
                baseInterfaces = type.BaseType.GetInterfaces().ToList();
            return new[]
                {
                    GetCurrentTypeAttributes<T>(type.BaseType),
                    type.GetInterfaces().Where(x => !baseInterfaces.Contains(x)).SelectMany(GetCurrentTypeAttributes<T>),
                    type.GetCustomAttributes(typeof(IPageActionAttribute), false).Cast<T>(),
                }.SelectMany(x => x);
        }
    }
}