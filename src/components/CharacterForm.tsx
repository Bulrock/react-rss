import React, { createRef, Component } from 'react';
import FormFieldValueValidator from '../models/FormFieldValueValidator';
import FormField from './FormField';
import { ICharacterFormProps } from '../models/types';

class CharacterForm extends Component<ICharacterFormProps> {
  private nameInput = createRef<FormField>();
  private locationInput = createRef<FormField>();
  private dateInput = createRef<FormField>();
  private fileInput = createRef<FormField>();
  private genderInput = createRef<FormField>();
  private speciesInput = createRef<FormField>();
  private statusInput = createRef<FormField>();
  // private nameValidator = new FormFieldValueValidator();
  // private locationValidator = new FormFieldValueValidator(1);
  // private dateValidator = new FormFieldValueValidator(1);
  // private fileValidator = new FormFieldValueValidator(1);
  // private genderValidator = new FormFieldValueValidator(1);
  // private speciesValidator = new FormFieldValueValidator(1);
  // private statusValidator = new FormFieldValueValidator(1);
  private genders: string[];
  private species: string[];
  // private inputGenderRefs: RefObject<HTMLInputElement>[];
  // private inputSpecieRefs: RefObject<HTMLInputElement>[];

  constructor(props: ICharacterFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.genders = this.props.genders;
    this.species = this.props.species;
    // this.inputGenderRefs = this.props.genders.map(() => {
    //   return createRef<HTMLInputElement>();
    // });
    // this.inputSpecieRefs = this.props.species.map(() => {
    //   return createRef<HTMLInputElement>();
    // });
  }

  private handleSubmit(event: React.SyntheticEvent) {
    const nameError = this.nameInput.current?.validate();
    const statusError = this.statusInput.current?.validate();
    console.log(nameError);
    console.log(statusError);
    event.preventDefault();
  }

  render() {
    return (
      <form className="character-form" onSubmit={this.handleSubmit}>
        {this.props.formFields.map((field) => {
          if (field.element === 'input') {
            return (
              <FormField
                key={field.label}
                element={field.element}
                label={field.label}
                type={field.type}
                ref={
                  field.label === 'Name: '
                    ? this.nameInput
                    : field.label === 'Date of birth: '
                    ? this.dateInput
                    : field.label === 'Image: '
                    ? this.fileInput
                    : this.locationInput
                }
                validator={
                  new FormFieldValueValidator(field.validationRules)
                  // field.label === 'Name: '
                  //   ? this.nameValidator
                  //   : field.label === 'Date of birth: '
                  //   ? this.dateValidator
                  //   : field.label === 'Image: '
                  //   ? this.fileValidator
                  //   : this.locationValidator
                }
              />
            );
          } else if (field.element === 'select') {
            return (
              <FormField
                key={field.label}
                element={field.element}
                label={field.label === 'Gender: ' ? 'Gender: ' : 'Species: '}
                type={field.type}
                options={field.label === 'Gender: ' ? this.genders : this.species}
                ref={field.label === 'Gender: ' ? this.genderInput : this.speciesInput}
                validator={
                  new FormFieldValueValidator(field.validationRules)
                  // field.label === 'Gender: ' ? this.genderValidator : this.speciesValidator
                }
              />
            );
          } else if (field.element === 'radio') {
            return (
              <FormField
                key={field.name}
                element={field.element}
                type={field.type}
                name={field.name}
                options={this.props.statuses}
                ref={this.statusInput}
                validator={
                  new FormFieldValueValidator(field.validationRules)
                  // this.statusValidator
                }
              />
            );
          }
        })}
        {/* <FormField
          element="input"
          label="Name: "
          type="text"
          ref={this.nameInput}
          validator={this.nameValidator}
        />
        <FormField
          element="input"
          label="Last known location: "
          type="text"
          ref={this.locationInput}
          validator={this.locationValidator}
        />
        <FormField
          element="input"
          label="Date of birth: "
          type="date"
          ref={this.dateInput}
          validator={this.dateValidator}
        />
        <FormField
          element="select"
          label="Gender: "
          type="select"
          options={this.genders}
          ref={this.genderInput}
          validator={this.genderValidator}
        />
        <FormField
          element="select"
          label="Species: "
          type="select"
          options={this.species}
          ref={this.speciesInput}
          validator={this.speciesValidator}
        />
        <FormField
          element="radio"
          type="radio"
          name="status"
          options={this.props.statuses}
          ref={this.statusInput}
          validator={this.statusValidator}
        />
        <FormField
          element="input"
          label="Image: "
          type="file"
          ref={this.fileInput}
          validator={this.fileValidator}
        /> */}
        <div className="form-buttons">
          <button type="reset">Reset form</button>
          <button type="submit">Submit form</button>
        </div>
      </form>
    );
  }
}

export default CharacterForm;
