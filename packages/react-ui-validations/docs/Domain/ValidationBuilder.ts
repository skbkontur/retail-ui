import * as React from 'react';
import { ValidationBehaviour, ValidationInfo } from '../../src';
import { Nullable } from '../../typings/Types';

export type ValidationResultFor<T> = Partial<{ [Key in keyof T]: ValidationInfo }>;

type ModelValidationDelegate<TModel> = (model: TModel) => Nullable<ValidationResultFor<TModel>>;

interface IPropertyValidationBuilder<TModel> {
  buildPropertyValidation(): ModelValidationDelegate<TModel>;
}

class PropertyValidationBuilder<TModel, T> implements IPropertyValidationBuilder<TModel> {
  private readonly conditions: Array<ModelValidationDelegate<TModel>> = [];
  private readonly modelPicker: (model: TModel) => T;
  private readonly infoPicker: keyof TModel;
  private readonly parentBuilder: ValidationBuilder<TModel>;

  constructor(modelPicker: (model: TModel) => T, infoPicker: keyof TModel, parentBuilder: ValidationBuilder<TModel>) {
    this.modelPicker = modelPicker;
    this.infoPicker = infoPicker;
    this.parentBuilder = parentBuilder;
  }

  public required() {
    return this.satisfy(x => Boolean(x), 'Поле должно быть заполнено', 'submit');
  }

  public satisfy(
    condition: (value: T, model: TModel) => boolean,
    message: React.ReactNode,
    type: ValidationBehaviour = 'lostfocus',
  ) {
    this.conditions.push(model => {
      if (!condition(this.modelPicker(model), model)) {
        const result: ValidationResultFor<TModel> = {};
        result[this.infoPicker] = {
          type,
          message,
        } as any;
        return result;
      }
      return null;
    });
    return this;
  }

  public property<P>(
    modelPicker: (model: TModel) => P,
    infoPicker?: keyof TModel,
    configuration?: (builder: PropertyValidationBuilder<TModel, P>) => void,
  ): PropertyValidationBuilder<TModel, P> {
    return this.parentBuilder.property(modelPicker, infoPicker, configuration);
  }

  public build() {
    return this.parentBuilder.build();
  }

  public buildPropertyValidation(): ModelValidationDelegate<TModel> {
    return model => {
      for (const condition of this.conditions) {
        const validationResult = condition(model);
        if (validationResult) {
          return validationResult;
        }
      }
      return null;
    };
  }
}

class ValidationBuilder<TModel> {
  public builders: Array<IPropertyValidationBuilder<TModel>> = [];

  public property<T>(
    modelPicker: (model: TModel) => T,
    infoPicker?: keyof TModel,
    configuration?: (builder: PropertyValidationBuilder<TModel, T>) => void,
  ): PropertyValidationBuilder<TModel, T> {
    let infoPickerValue = infoPicker;
    if (!infoPickerValue) {
      const picker = modelPicker.toString();
      const match = picker.match(/return [\w\d]+?\.(.*?)(;|\})/);
      if (!match) {
        throw new Error('bad path to property ' + picker);
      }
      infoPickerValue = match[1] as keyof TModel;
    }
    const builder = new PropertyValidationBuilder(modelPicker, infoPickerValue, this);
    if (configuration) {
      configuration(builder);
    }
    this.builders.push(builder);
    return builder;
  }

  public build(): ModelValidationDelegate<TModel> {
    const conditions = this.builders.map(x => x.buildPropertyValidation());
    return model => {
      return conditions.reduce((result, condition) => {
        const validationResult = condition(model);
        return validationResult ? { ...(validationResult as any), ...(result || {}) } : result;
      }, null);
    };
  }
}

export function validation<TModel>() {
  return new ValidationBuilder<TModel>();
}
