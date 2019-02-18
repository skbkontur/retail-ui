import OnBlurValidations from "./OnBlurValidations/OnBlurValidations.md";
import DifferentMessages from "./DifferentMessages/DifferentMessages";
import TextMessages from "./TextMessages/TextMessages";
import ScrollToFirstInvalid from "./ScrollToFirstInvalid/ScrollToFirstInvalid";
import Editors from "./Editors/Editors";

export default [
    {
        component: OnBlurValidations,
        url: "on-blur-validations",
        caption: "Валидации по потере фокуса",
    },
    {
        component: TextMessages,
        url: "simple-text-messages",
        caption: "Подписи к контролам",
    },
    {
        component: DifferentMessages,
        url: "different-messages",
        caption: "Разные типы сообщений",
    },
    {
        component: ScrollToFirstInvalid,
        url: "scroll-to-first-invalid",
        caption: "Скроллинг к первому невалидному",
    },
    {
        component: Editors,
        url: "editors",
        caption: "Редакторы",
    },
];
