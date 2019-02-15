import { Nullable } from "../../typings/Types";
import { ValidationResultFor } from "../components/Pages/Examples/Editors/ValidationBuilder";
import { ValidationInfo } from "src/index";

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
    validationInfo: Nullable<ValidationResultFor<ContactInfo>>,
    onChange: (update: Partial<ContactInfo>) => any,
};
