import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ICharacterFormProps, Inputs } from '../models/types';
import CharacterFactory from '../models/CharacterFactory';
import FormField from './FormField';
import { CharacterFormMetadata } from '../data/CharacterFormMetadata';

export default function CharacterForm(onSuccessSubmit: ICharacterFormProps) {
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const characterFactory = new CharacterFactory();

  const onSubmit: SubmitHandler<Inputs> = (_, event) => {
    event?.preventDefault();

    setShowSubmitMessage(true);
    setTimeout(() => {
      setShowSubmitMessage(false);
      const characterData = Object.values(getValues());
      const filteredData = characterData
        .map((value) => {
          if (value && typeof value === 'string') {
            return value;
          } else if (value && typeof value === 'boolean') {
            return;
          } else if (value) {
            return URL.createObjectURL(getValues('image')[0]);
          }
        })
        .filter((value) => value !== undefined) as string[];

      const newCharcter = characterFactory.create(filteredData);
      onSuccessSubmit.onSuccessSubmit(newCharcter);
      reset();
    }, 1000);
  };

  return (
    <form className="character-form" onSubmit={handleSubmit(onSubmit)}>
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

      <input className="form-buttons" type="submit" />
      <span
        data-testid="submit-message"
        className={showSubmitMessage ? 'submit-message' : 'notsubmit-message'}
      >
        Data has been saved
      </span>
    </form>
  );
}
