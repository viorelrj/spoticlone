import { Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ISearchFormProps, ISearchFormState } from './search-form.type';

export function SearchForm({ initialState, onChange }: ISearchFormProps) {
  const { watch, register } = useForm<ISearchFormState>({
    defaultValues: initialState,
  });

  useEffect(() => {
    const subscription = watch((val) => onChange?.(val));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <form>
      <Input
        autoComplete="off"
        {...register('query')}
        placeholder="Search a song..."
      />
    </form>
  );
}
