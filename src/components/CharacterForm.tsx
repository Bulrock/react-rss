import React, { createRef, Component, RefObject } from 'react';
import FormFieldValueValidator from '../models/FormFieldValueValidator';
import FormField from './FormField';
import { ICharacterFormProps, ICharacterFormState } from '../models/types';
import CharacterFactory from '../models/CharacterFactory';

class CharacterForm extends Component<ICharacterFormProps, ICharacterFormState> {
  private formFieldRefs = new Array<RefObject<FormField>>();
  private characterFactory = new CharacterFactory();

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
        let fieldValueArr: string[] = [];
        fieldValueArr = [];
        this.formFieldRefs.forEach((field) => {
          if (
            typeof field.current?.fieldValue !== 'undefined' &&
            typeof field.current?.fieldValue !== 'boolean'
          ) {
            if (typeof field.current.fieldValue !== 'object') {
              fieldValueArr.push(field.current.fieldValue);
            } else {
              const objectUrl = URL.createObjectURL((field.current.fieldValue as FileList)[0]);
              fieldValueArr.push(objectUrl);
            }
          }
        });
        this.props.onSubmit(this.characterFactory.create(fieldValueArr));
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
          <button data-testid="form-reset-btn" type="reset">
            Reset form
          </button>
          <button data-testid="form-submit-btn" type="submit">
            Submit form
          </button>
        </div>
        <span
          data-testid="submit-message"
          className={this.state.showSubmitMessage ? 'submit-message' : 'notsubmit-message'}
        >
          Data has been saved
        </span>
      </form>
    );
  }
}

export default CharacterForm;
