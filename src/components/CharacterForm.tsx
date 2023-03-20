import React, { createRef, Component, RefObject } from 'react';
import FormFieldValueValidator from '../models/FormFieldValueValidator';
import FormField from './FormField';
import { ICharacterFormProps } from '../models/types';

class CharacterForm extends Component<ICharacterFormProps> {
  private formFieldRefs = new Array<RefObject<FormField>>();

  constructor(props: ICharacterFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formFieldRefs =
      this.props.formFields?.map(() => {
        return createRef<FormField>();
      }) || [];
  }

  private handleSubmit(event: React.SyntheticEvent) {
    this.formFieldRefs.forEach((formField) => {
      if (formField.current?.validate()) {
        console.log(formField.current?.validate());
      }
    });
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
      </form>
    );
  }
}

export default CharacterForm;
