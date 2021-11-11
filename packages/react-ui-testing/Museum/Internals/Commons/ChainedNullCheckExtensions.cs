using System;
using System.Collections.Generic;
using System.Linq;

namespace SKBKontur.SeleniumTesting.Internals.Commons
{
    public static class ChainedNullCheckExtensions
    {
        public static TResult With<TInput, TResult>(this TInput o, Func<TInput, TResult> evaluator)
            where TResult : class where TInput : class
        {
            return o == null ? null : evaluator(o);
        }

        public static TResult? With<TInput, TResult>(this TInput o, Func<TInput, TResult?> evaluator)
            where TResult : struct where TInput : class
        {
            return o == null ? null : evaluator(o);
        }

        public static TResult Return<TInput, TResult>(this TInput o, Func<TInput, TResult> evaluator, TResult failureValue) where TInput : class
        {
            return o == null ? failureValue : evaluator(o);
        }

        public static TResult Return<TInput, TResult>(this TInput? o, Func<TInput?, TResult> evaluator, TResult failureValue) where TInput : struct
        {
            return o == null ? failureValue : evaluator(o);
        }

        public static TResult Return<TInput, TResult>(this TInput o, Func<TInput, TResult?> evaluator, TResult failureValue) where TInput : class where TResult : struct
        {
            return o == null ? failureValue : (evaluator(o) ?? failureValue);
        }

        public static TResult? Return<TInput, TResult>(this TInput o, Func<TInput, TResult> evaluator, TResult? failureValue) where TInput : class where TResult : struct
        {
            return o == null ? failureValue : evaluator(o);
        }

        public static bool ReturnSuccess<TInput>(this TInput o) where TInput : class
        {
            return o != null;
        }

        public static TInput If<TInput>(this TInput o, Func<TInput, bool> evaluator)
            where TInput : class
        {
            if(o == null) return null;
            return evaluator(o) ? o : null;
        }

        public static TInput Unless<TInput>(this TInput o, Func<TInput, bool> evaluator)
            where TInput : class
        {
            if(o == null) return null;
            return evaluator(o) ? null : o;
        }

        public static TInput Do<TInput>(this TInput o, Action<TInput> action)
            where TInput : class
        {
            if(o == null) return null;
            action(o);
            return o;
        }

        public static TInput[] ReturnArray<TInput>(this TInput[] o)
        {
            return o ?? new TInput[0];
        }

        public static IEnumerable<TInput> ReturnEnumerable<TInput>(this IEnumerable<TInput> o, TInput defaultElement = default(TInput))
        {
            return o == null ? Enumerable.Empty<TInput>() : o.Select(input => ReferenceEquals(input, null) ? defaultElement : input);
        }
    }
}