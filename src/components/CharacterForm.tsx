import React, { createRef, Component, RefObject } from 'react';
import FormFieldValueValidator from '../models/FormFieldValueValidator';
import FormField from './FormField';
import { ICharacterFormProps, ICharacterFormState } from '../models/types';
import CharacterFormValueCardAdapter from '../models/CharacterFormValueCardAdapter';

class CharacterForm extends Component<ICharacterFormProps, ICharacterFormState> {
  private formFieldRefs = new Array<RefObject<FormField>>();
  private valueCardAdapter = new CharacterFormValueCardAdapter();

  constructor(props: ICharacterFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formFieldRefs =
      this.props.formFields?.map(() => {
        return createRef<FormField>();
      }) || [];
    this.state = {
      showSubmitMessage: false,
      formValueArr: [],
    };
  }

  private onSubmit(success: boolean) {
    if (success) {
      this.setState({ showSubmitMessage: false });
    } else {
      this.setState({ showSubmitMessage: true });
      setTimeout(() => {
        let fieldValueArr = [''];
        fieldValueArr = [];
        this.formFieldRefs.forEach((field) => {
          if (
            typeof field.current?.fieldValue !== 'undefined' &&
            typeof field.current?.fieldValue !== 'boolean'
          ) {
            fieldValueArr.push(field.current.fieldValue);
          }
        });
        this.state.formValueArr.push(this.valueCardAdapter.formCard(fieldValueArr));
        this.props.updateData(this.state.formValueArr);
        this.resetFormFieldRefs();
        this.setState({ showSubmitMessage: false });
      }, 2000);
    }
  }

  private resetFormFieldRefs() {
    this.formFieldRefs.forEach((ref) => ref.current?.reset());
  }

  private handleSubmit(event: React.SyntheticEvent) {
    const hasErrorArr = [false];
    this.formFieldRefs.forEach((formField) => {
      if (formField.current?.validate() === '') {
        hasErrorArr.push(false);
      } else {
        hasErrorArr.push(true);
      }
    });
    hasErrorArr.some((elem) => elem !== false) ? this.onSubmit(true) : this.onSubmit(false);
    event.preventDefault();
  }

  render() {
    return (
      <form className="character-form" onSubmit={this.handleSubmit}>
        {this.props.formFields.map((field, index) => {
          return (
            <FormField
              key={`${field.element}-${index}`}
              element={field.element}
              label={field.label}
              name={field.name}
              type={field.type}
              options={field.options}
              ref={this.formFieldRefs[index]}
              validator={new FormFieldValueValidator(field.validationRules)}
            />
          );
        })}
        <div className="form-buttons">
          <button type="reset">Reset form</button>
          <button type="submit">Submit form</button>
        </div>
        <span className={this.state.showSubmitMessage ? 'submit-message' : 'notsubmit-message'}>
          Data has been saved
        </span>
      </form>
    );
  }
}

export default CharacterForm;
