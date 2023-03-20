import React, { createRef, Component, RefObject } from 'react';
import FormFieldValueValidator from '../models/FormFieldValueValidator';
import FormField from './FormField';
import { ICharacterFormProps } from '../models/types';

class CharacterForm extends Component<ICharacterFormProps, { showSubmitMessage: boolean }> {
  private formFieldRefs = new Array<RefObject<FormField>>();

  constructor(props: ICharacterFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formFieldRefs =
      this.props.formFields?.map(() => {
        return createRef<FormField>();
      }) || [];
    this.state = {
      showSubmitMessage: false,
    };
  }

  private onSubmit(success: boolean) {
    if (success) {
      this.setState({ showSubmitMessage: false });
    } else {
      this.setState({ showSubmitMessage: true });
      setTimeout(() => {
        this.resetFormFieldRefs();
        this.setState({ showSubmitMessage: false });
      }, 3000);
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
