import React, { Fragment } from 'react';
import { IFormFieldProps } from '../models/types';

export default function FormField(props: IFormFieldProps) {
  const renderTextInput = () => {
    return (
      <>
        <label className="form-label">
          {props.formField.labels[0]}
          <input
            placeholder={props.formField.placeholder}
            data-testid={props.formField.ids[0]}
            key={props.formField.ids[0]}
            {...props.register(props.formField.register, {
              required: props.formField.required,
              pattern: props.formField.patern,
              minLength: props.formField.minLength,
            })}
          ></input>
        </label>
        {props.formField.ids[0] === 'name' && props.errors.name && (
          <span className="input-error">{props.errors.name.message}</span>
        )}
        {props.formField.ids[0] === 'origin' && props.errors.origin && (
          <span className="input-error">{props.errors.origin.message}</span>
        )}
        {props.formField.ids[0] === 'location' && props.errors.location && (
          <span className="input-error">{props.errors.location.message}</span>
        )}
      </>
    );
  };

  const renderRadioInput = () => {
    return (
      <>
        <label className="form-label">
          {props.formField.ids.map((_, index) => {
            return (
              <Fragment key={props.formField.ids[index]}>
                {props.formField.labels[index]}
                <input
                  type={props.formField.type}
                  data-testid={props.formField.ids[index]}
                  {...props.register(props.formField.register, {
                    required: props.formField.required,
                    pattern: props.formField.patern,
                    minLength: props.formField.minLength,
                  })}
                  value={props.formField.values?.[index]}
                ></input>
              </Fragment>
            );
          })}
        </label>
        {props.errors.status && <span className="input-error">{props.errors.status.message}</span>}
      </>
    );
  };

  const renderSelectInput = () => {
    return (
      <>
        <label className="form-label">
          {props.formField.labels[0]}
          <select
            {...props.register(props.formField.register, { required: props.formField.required })}
          >
            {props.formField.ids.map((_, index) => {
              return (
                <option
                  key={`${props.formField.ids[0]}-${index}`}
                  data-testid={props.formField.ids[index]}
                  value={props.formField.values?.[index]}
                >
                  {props.formField.options?.[index]}
                </option>
              );
            })}
          </select>
        </label>
        {props.formField.ids[0] === 'select-spec-0' && props.errors.species && (
          <span className="input-error">{props.errors.species.message}</span>
        )}
        {props.formField.ids[0] === 'select-gen-0' && props.errors.gender && (
          <span className="input-error">{props.errors.gender.message}</span>
        )}
      </>
    );
  };

  const renderInput = () => {
    return (
      <>
        <label className="form-label">
          {props.formField.labels[0]}
          <input
            {...props.register(props.formField.register, { required: props.formField.required })}
            type={props.formField.type}
            key={props.formField.ids[0]}
            data-testid={props.formField.ids[0]}
          />
        </label>
        {props.formField.type === 'file' && props.errors.image && (
          <span className="input-error">{props.errors.image.message}</span>
        )}
        {props.formField.type === 'date' && props.errors.date && (
          <span className="input-error">{props.errors.date.message}</span>
        )}
        {props.formField.type === 'checkbox' && props.errors.consest && (
          <span className="input-error">{props.errors.consest.message}</span>
        )}
      </>
    );
  };

  return (
    <>
      {props.formField.type === 'text' && renderTextInput()}
      {props.formField.type === 'radio' && renderRadioInput()}
      {props.formField.type === 'select' && renderSelectInput()}
      {(props.formField.type === 'file' ||
        props.formField.type === 'date' ||
        props.formField.type === 'checkbox') &&
        renderInput()}
      <div className="underline"></div>
    </>
  );
}
