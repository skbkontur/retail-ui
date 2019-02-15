import { Nullable } from "../../typings/Types";
import { ValidationResultFor } from "docs/components/Pages/Examples/Editors/ValidationBuilder";

export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    sex: "male" | "female" | null;
}

export interface FormEditorProps {
    data: ContactInfo;
    validationInfo?: Nullable<ValidationResultFor<ContactInfo>>;
    onChange: (update: Partial<ContactInfo>) => void;
}
