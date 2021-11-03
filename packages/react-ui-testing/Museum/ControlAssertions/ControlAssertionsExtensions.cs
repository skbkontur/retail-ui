using System;

using SKBKontur.SeleniumTesting.Assertions;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public static class ControlAssertionsExtensions
    {
        [Obsolete]
        public static InputAssertions ExpectTo(this Input input)
        {
            return ExpectTo(new SingleItemAssertable<Input>(input));
        }

        [Obsolete]
        public static InputAssertions ExpectTo(this IAssertable<Input> input)
        {
            return new InputAssertions(input);
        }

        [Obsolete]
        public static ComboBoxAssertions ExpectTo(this ComboBox input)
        {
            return ExpectTo(new SingleItemAssertable<ComboBox>(input));
        }

        [Obsolete]
        public static ComboBoxAssertions ExpectTo(this IAssertable<ComboBox> input)
        {
            return new ComboBoxAssertions(input);
        }

        [Obsolete]
        public static ButtonAssertions ExpectTo(this Button input)
        {
            return ExpectTo(new SingleItemAssertable<Button>(input));
        }

        [Obsolete]
        public static ButtonAssertions ExpectTo(this IAssertable<Button> input)
        {
            return new ButtonAssertions(input);
        }

        [Obsolete]
        public static CheckBoxAssertions ExpectTo(this Checkbox input)
        {
            return ExpectTo(new SingleItemAssertable<Checkbox>(input));
        }

        [Obsolete]
        public static CheckBoxAssertions ExpectTo(this IAssertable<Checkbox> input)
        {
            return new CheckBoxAssertions(input);
        }

        [Obsolete]
        public static LinkAssertions ExpectTo(this Link input)
        {
            return ExpectTo(new SingleItemAssertable<Link>(input));
        }

        [Obsolete]
        public static LinkAssertions ExpectTo(this IAssertable<Link> input)
        {
            return new LinkAssertions(input);
        }

        [Obsolete]
        public static SelectAssertions ExpectTo(this Select input)
        {
            return ExpectTo(new SingleItemAssertable<Select>(input));
        }

        [Obsolete]
        public static SelectAssertions ExpectTo(this IAssertable<Select> input)
        {
            return new SelectAssertions(input);
        }

        [Obsolete]
        public static GenericAssertions<ModalBase> ExpectTo(this ModalBase input)
        {
            return ExpectTo(new SingleItemAssertable<ModalBase>(input));
        }

        [Obsolete]
        public static GenericAssertions<ModalBase> ExpectTo(this IAssertable<ModalBase> input)
        {
            return new GenericAssertions<ModalBase>(input);
        }

        [Obsolete]
        public static LabelAssertions ExpectTo(this Label input)
        {
            return ExpectTo(new SingleItemAssertable<Label>(input));
        }

        [Obsolete]
        public static LabelAssertions ExpectTo(this IAssertable<Label> input)
        {
            return new LabelAssertions(input);
        }

        [Obsolete]
        public static TextAreaAssertions ExpectTo(this TextArea input)
        {
            return ExpectTo(new SingleItemAssertable<TextArea>(input));
        }

        [Obsolete]
        public static TextAreaAssertions ExpectTo(this IAssertable<TextArea> input)
        {
            return new TextAreaAssertions(input);
        }

        [Obsolete]
        public static ControlBaseAssertions ExpectTo(this ControlBase input)
        {
            return ExpectTo(new SingleItemAssertable<ControlBase>(input));
        }

        [Obsolete]
        public static ControlBaseAssertions ExpectTo(this IAssertable<ControlBase> input)
        {
            return new ControlBaseAssertions(input);
        }

        [Obsolete]
        public static ControlListAssertions<TItem> ExpectTo<TItem>(this ControlListBase<TItem> input) where TItem : ControlBase
        {
            return new ControlListAssertions<TItem>(new SingleItemAssertable<ControlListBase<TItem>>(input));
        }

        [Obsolete]
        public static CompoundControlAssertions<CompoundControl> ExpectTo(this CompoundControl control)
        {
            return ExpectTo(new SingleItemAssertable<CompoundControl>(control));
        }

        [Obsolete]
        public static CompoundControlAssertions<CompoundControl> ExpectTo(this IAssertable<CompoundControl> control)
        {
            return new CompoundControlAssertions<CompoundControl>(control);
        }
    }
}