import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Inputs } from '../models/types';
import FormField from './FormField';
import { CharacterFormMetadata } from '../data/CharacterFormMetadata';
import useSubmitForm from '../models/useSubmitForm';

export default function CharacterForm() {
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  return (
    <form
      data-testid="form"
      className="character-form"
      onSubmit={handleSubmit(useSubmitForm(setShowSubmitMessage, getValues, reset))}
    >
      {CharacterFormMetadata.map((_, index) => {
        return (
          <FormField
            formField={CharacterFormMetadata[index]}
            register={register}
            errors={errors}
            key={index}
          />
        );
      })}
      <div className="form-buttons">
        <button data-testid="form-submit-btn" type="submit">
          Submit form
        </button>
      </div>
      <span
        data-testid="submit-message"
        className={showSubmitMessage ? 'submit-message' : 'notsubmit-message'}
      >
        Data has been saved
      </span>
    </form>
  );
}
