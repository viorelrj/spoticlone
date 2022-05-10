import {
  IconButton,
  Input, InputGroup, InputLeftElement, InputRightElement,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { ISearchFormProps, ISearchFormState } from './search-form.type';

export const SearchForm = ({ initialState, onChange, className }: ISearchFormProps) => {
  const {
    register, control, reset, setFocus,
  } = useForm<ISearchFormState>({
    defaultValues: initialState,
  });

  const searchValue = useWatch({
    control,
  });

  const clearForm = () => {
    setFocus?.('query');
    reset();
  };

  useEffect(() => {
    onChange?.(searchValue || '');
  }, [searchValue, onChange]);

  return (
    <form className={className}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoSearchOutline color="gray.300" />
        </InputLeftElement>
        <Input
          autoComplete="off"
          {...register('query')}
          placeholder="Search a song..."
        />
        {
          searchValue.query
          && <InputRightElement variant="ghost" isRound onClick={clearForm} as={IconButton} icon={<IoCloseOutline />} />
        }
      </InputGroup>
    </form>
  );
};
