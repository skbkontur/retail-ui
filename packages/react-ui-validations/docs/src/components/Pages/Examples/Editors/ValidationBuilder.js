class PropertyValidationBuilder {
    conditions = [];

    constructor(modelPicker, infoPicker, parentBuilder) {
        this.modelPicker = modelPicker;
        this.infoPicker = infoPicker;
        this.parentBuilder = parentBuilder;
    }

    required() {
        return this.satisfy(x => Boolean(x), "Поле должно быть заполнено", "submit");
    }

    satisfy(condition, message, type = "lostfocus") {
        this.conditions.push(model => {
            if (!condition(this.modelPicker(model), model)) {
                return {
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

    property(...args) {
        return this.parentBuilder.property(...args);
    }

    build(...args) {
        return this.parentBuilder.build(...args);
    }

    buildPropertyValidation() {
        return model => {
            for (const condition of this.conditions) {
                const validationResult = condition(model);
                if (validationResult) {
                    return validationResult;
                }
            }
            return undefined;
        };
    }
}

class ValidationBuilder {
    builders = [];

    property(modelPicker, infoPicker, configuration) {
        let infoPickerValue = infoPicker;
        if (!infoPickerValue) {
            infoPickerValue = modelPicker.toString().match(/return [\w\d]+?\.(.*?)(;|\})/)[1];
        }
        const builder = new PropertyValidationBuilder(modelPicker, infoPickerValue, this);
        if (configuration) {
            configuration(builder);
        }
        this.builders.push(builder);
        return builder;
    }

    build() {
        const conditions = this.builders.map(x => x.buildPropertyValidation());
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

export function validation() {
    return new ValidationBuilder();
}
