import { IValidationRule } from './types';

export default class FormFieldValueValidator {
  validationRules: IValidationRule[];
  constructor(rules: IValidationRule[]) {
    this.validationRules = rules;
  }

  validate(value: string | undefined): string {
    this.validationRules.forEach((rul) => {
      if (typeof rul.rule === 'number') {
        if (!value || value.length < rul.rule) {
          return rul.errorMessage;
        }
      }
    });
    return '';
  }
}
