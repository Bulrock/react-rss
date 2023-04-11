import CharacterFactory from './CharacterFactory';
import { SubmitHandler, UseFormGetValues, UseFormReset } from 'react-hook-form';
import { Inputs } from './types';
import { addCharacter } from '../features/CharacterFormSlice';
import { useAppDispatch } from '../app/hooks';

export default function useSubmitForm(
  setShowSubmitMessage: (value: React.SetStateAction<boolean>) => void,
  getValues: UseFormGetValues<Inputs>,
  reset: UseFormReset<Inputs>
) {
  const dispatch = useAppDispatch();
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
      dispatch(addCharacter(newCharcter));
      reset();
    }, 1000);
  };
  return useSubmit;
}
