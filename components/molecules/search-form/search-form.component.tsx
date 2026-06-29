import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { ISearchFormProps, ISearchFormState } from './search-form.type';

export const SearchForm = ({ initialState, onChange, className }: ISearchFormProps) => {
  const {
    register, control, setFocus, setValue,
  } = useForm<ISearchFormState>({
    defaultValues: initialState,
  });

  const searchValue = useWatch({
    control,
  });

  const clearForm = () => {
    setFocus?.('query');
    setValue('query', '');
  };

  useEffect(() => {
    onChange(searchValue || '');
  }, [searchValue, onChange]);

  return (
    <InputGroup
      className={className}
      startElement={<IoSearchOutline color="gray.300" />}
      endElement={
        searchValue.query ? (
          <IconButton
            aria-label="Clear search"
            borderRadius="full"
            variant="ghost"
            size="sm"
            pointerEvents="auto"
            onClick={clearForm}
          >
            <IoCloseOutline />
          </IconButton>
        ) : undefined
      }
    >
      <Input
        autoComplete="off"
        {...register('query')}
        placeholder="Search a song..."
      />
    </InputGroup>
  );
};
