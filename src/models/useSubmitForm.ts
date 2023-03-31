import CharacterFactory from './CharacterFactory';
import { SubmitHandler, UseFormGetValues, UseFormReset } from 'react-hook-form';
import { ICharacterFormProps, Inputs } from './types';

export default function useSubmitForm(
  setShowSubmitMessage: (value: React.SetStateAction<boolean>) => void,
  onSuccessSubmit: ICharacterFormProps,
  getValues: UseFormGetValues<Inputs>,
  reset: UseFormReset<Inputs>
) {
  const useSubmit: SubmitHandler<Inputs> = (data, event) => {
    const characterFactory = new CharacterFactory();
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
  return useSubmit;
}
