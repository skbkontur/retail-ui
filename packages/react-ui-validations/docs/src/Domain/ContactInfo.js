// @flow
import type { ValidationInfo } from "../../Commons/Validations";

export type ContactInfo = {
    name: string,
    email: string,
    phone: string,
    sex: "male" | "female" | null,
};

export type ContactInfoValidationInfo = {
    name?: ValidationInfo,
    email?: ValidationInfo,
    phone?: ValidationInfo,
    sex?: ValidationInfo,
};

export type FormEditorProps = {
    data: ContactInfo,
    validationInfo: ContactInfoValidationInfo,
    onChange: (update: $Shape<ContactInfo>) => any,
};
