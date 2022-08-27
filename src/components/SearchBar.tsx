import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { useState } from 'react';

import { SearchType } from '../types';
import { validateEmail } from '../utils';

export interface ISearchBarProps {
  handleSubmit: (queryString: string, searchType: SearchType) => void,
}

const SearchBar = ({ handleSubmit}: ISearchBarProps) => {
  const [queryString, setQueryString] = useState('');
  const [searchType, setSearchType] = useState(SearchType.Name);
  const [textError, setTextError] = useState(false);

  const submitData = (queryString: string, searchType: SearchType) => {
    if (queryString === '') {
      return setTextError(true);
    } else if (searchType === SearchType.Email && validateEmail(queryString) === false) {
      return setTextError(true);
    };

    setTextError(false);
    handleSubmit(queryString, searchType);
  };

  return (
    <Grid container>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl>
          <FormLabel id='demo-controlled-radio-buttons-group'>Search Users By:</FormLabel>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
            >
              <FormControlLabel value='name' control={<Radio />} label='Name' />
              <FormControlLabel value='email' control={<Radio />} label='Email' />
            </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center'}}>
        <TextField
          error={textError}
          helperText={textError ? `Enter a valid ${searchType}` : ' '}
          label='Search'
          onChange={(e) => setQueryString(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitData(queryString, searchType)}
          placeholder={`Enter ${searchType}`}
          required
          sx={{ marginTop: '22px', width: '100%' }}
        />
      </Grid>
      <Grid
        item
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        xs={3}
      >
        <Button
          onClick={() => submitData(queryString, searchType)}
          size='large'
          sx={{ height: '56px' }}
          variant='contained'
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
