import FormFieldValueValidator from '../models/FormFieldValueValidator';
import React, { createRef, Component, RefObject } from 'react';
import { IFormProps, IFormState } from '../models/types';

class FormField extends Component<IFormProps, IFormState> {
  validator: FormFieldValueValidator;
  inputRef = createRef<HTMLInputElement>();
  selectRef = createRef<HTMLSelectElement>();
  radioRefs = new Array<RefObject<HTMLInputElement>>();
  constructor(props: IFormProps) {
    super(props);
    this.validator = this.props.validator;
    if (this.props.element === 'radio') {
      this.radioRefs =
        this.props.options?.map(() => {
          return createRef<HTMLInputElement>();
        }) || [];
    }
    this.state = { error: '' };
  }

  get fieldValue(): string | boolean | object {
    return (
      this.inputRef.current?.files ||
      this.inputRef.current?.value ||
      this.inputRef.current?.checked ||
      this.selectRef.current?.value ||
      this.radioRefs.find((radioRef) => radioRef.current?.checked)?.current?.value ||
      ''
    );
  }

  reset(): void {
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
      this.inputRef.current.checked = false;
    }
    if (this.selectRef.current) {
      this.selectRef.current.value = '';
    }
    if (this.radioRefs) {
      this.radioRefs.forEach((radioRef) => {
        if (radioRef.current) {
          radioRef.current.checked = false;
        }
      });
    }
  }

  validate(): string {
    const error = this.props.validator.validate(this.fieldValue);
    this.setState({ error: error });
    return error;
  }

  renderInput() {
    return (
      <label className="form-label">
        {this.props.label}
        {this.props.value}
        {this.props.type === 'file' ? (
          <label htmlFor="fileInput" className="input-wrapper">
            Select Image
            <input
              type={this.props.type}
              id="fileInput"
              ref={this.inputRef}
              name={this.props.name}
              value={this.props.value}
              data-testid={
                this.props.label
                  ? this.props.label.toLocaleLowerCase().slice(2, 4)
                  : this.props.name?.toLocaleLowerCase().slice(2, 4)
              }
            ></input>
          </label>
        ) : (
          <input
            type={this.props.type}
            ref={this.inputRef}
            name={this.props.name}
            value={this.props.value}
            data-testid={
              this.props.label
                ? this.props.label.toLocaleLowerCase().slice(2, 4)
                : this.props.name?.toLocaleLowerCase().slice(2, 4)
            }
          ></input>
        )}
      </label>
    );
  }

  renderSelect() {
    return (
      <label className="form-label">
        {this.props.label}
        {this.props.value}
        <select
          ref={this.selectRef}
          name={this.props.name}
          data-testid={this.props.label?.slice(0, -2).toLocaleLowerCase()}
        >
          {this.props.options?.map((opt) => {
            return (
              <option
                value={opt}
                data-testid={`${this.props.label?.toLocaleLowerCase().slice(0, 3)}`}
                key={`option-${opt.toLocaleLowerCase()}`}
              >
                {opt}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  renderRadio() {
    return this.props.options?.map((option, index) => {
      return (
        <label className="form-label" key={option}>
          {option}
          <input
            type="radio"
            ref={this.radioRefs[index]}
            name={this.props.name}
            value={option}
            data-testid={`radio-${index}`}
          ></input>
        </label>
      );
    });
  }

  render() {
    return (
      <>
        {this.props.element === 'input' && this.renderInput()}
        {this.props.element === 'select' && this.renderSelect()}
        {this.props.element === 'radio' && this.renderRadio()}
        <span className="input-error">{this.state.error}</span>
        <div className="underline"></div>
      </>
    );
  }
}

export default FormField;
