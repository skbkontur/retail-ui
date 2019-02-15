import { ValidationInfo } from "src/index";

export type ValidationResultFor<T> = Partial<{
    [Key in keyof T]: ValidationInfo;
}>;

class PropertyValidationBuilder<TModel, T> {
    conditions = [];
    private modelPicker: (model: TModel) => T;
    private infoPicker: keyof TModel;
    private parentBuilder: ValidationBuilder<TModel>;

    // @ts-ignore
    constructor(modelPicker, infoPicker, parentBuilder) {
        this.modelPicker = modelPicker;
        this.infoPicker = infoPicker;
        this.parentBuilder = parentBuilder;
    }

    required() {
        return this.satisfy(x => Boolean(x), "Поле должно быть заполнено", "submit");
    }

    satisfy(condition: (value: T, model: TModel) => boolean, message: React.ReactNode, type = "lostfocus") {
        // @ts-ignore
        this.conditions.push(model => {
            if (!condition(this.modelPicker(model), model)) {
                return {
                    // @ts-ignore
                    [this.infoPicker]: {
                        type: type,
                        message: message,
                    },
                };
            }
            return undefined;
        });
        return this;
    }

    property<TChild>(modelPicker: (model: TModel) => TChild, infoPicker?: any, configuration?: any) {
        return this.parentBuilder.property(modelPicker, infoPicker, configuration);
    }

    build() {
        return this.parentBuilder.build();
    }

    buildPropertyValidation() {
        // @ts-ignore
        return model => {
            for (const condition of this.conditions) {
                // @ts-ignore
                const validationResult = condition(model);
                if (validationResult) {
                    return validationResult;
                }
            }
            return undefined;
        };
    }
}

class ValidationBuilder<TModel> {
    builders = [];

    property<T>(modelPicker: (model: TModel) => T, infoPicker?: keyof TModel, configuration?: any): PropertyValidationBuilder<TModel, T> {
        let infoPickerValue = infoPicker;
        if (!infoPickerValue) {
            // @ts-ignore
            infoPickerValue = modelPicker.toString().match(/return [\w\d]+?\.(.*?)(;|\})/)[1];
        }
        const builder = new PropertyValidationBuilder(modelPicker, infoPickerValue, this);
        if (configuration) {
            configuration(builder);
        }
        // @ts-ignore
        this.builders.push(builder);
        // @ts-ignore
        return builder;
    }

    build() {
        // @ts-ignore
        const conditions = this.builders.map(x => x.buildPropertyValidation());
        // @ts-ignore
        return model => {
            return conditions.reduce((result, condition) => {
                const validationResult = condition(model);
                if (validationResult) {
                    return { ...validationResult, ...result };
                }
                return result;
            }, undefined);
        };
    }
}

export function validation<TModel>() {
    return new ValidationBuilder<TModel>();
}
