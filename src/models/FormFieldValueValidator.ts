import { IValidationRule } from './types';

export default class FormFieldValueValidator {
  validationRules: IValidationRule[];
  constructor(rules: IValidationRule[]) {
    this.validationRules = rules;
  }

  validate(value: string | undefined): string {
    this.validationRules.forEach((rul) => {
      if (rul.rule === 'required') {
        if (!value) {
          return rul.errorMessage;
        }
      }
      // if (rul.rule === 'date') {
      //   if (value > new Date(Date.now()).getDate()) {
      //     return rul.errorMessage;
      //   }
      // }
    });
    return '';
  }
}
