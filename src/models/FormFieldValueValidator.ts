import { IValidationRule } from './types';

export default class FormFieldValueValidator {
  validationRules: IValidationRule[];
  constructor(rules: IValidationRule[]) {
    this.validationRules = rules;
  }

  validate(value: string | boolean | object | undefined): string {
    for (let i = 0; i < this.validationRules.length; i++) {
      if (this.validationRules[i].rule === 'required') {
        if (!value || (typeof value === 'object' && (value as FileList).length === 0)) {
          return this.validationRules[i].errorMessage;
        }
      }
      if (
        this.validationRules[i].rule === 'date' &&
        typeof value !== 'boolean' &&
        typeof value !== 'object'
      ) {
        if (!value) return this.validationRules[1].errorMessage;
        if (new Date(value) > new Date(Date.now())) {
          return this.validationRules[i].errorMessage;
        }
      }

      if (
        this.validationRules[i].rule !== 'required' &&
        this.validationRules[i].rule !== 'date' &&
        typeof value !== 'boolean'
      ) {
        if (!value) return this.validationRules[i].errorMessage;
        if (typeof value !== 'object' && !new RegExp(this.validationRules[i].rule).test(value)) {
          return this.validationRules[i].errorMessage;
        }
      }
    }
    return '';
  }
}
