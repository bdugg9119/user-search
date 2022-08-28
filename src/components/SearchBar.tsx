import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import { SearchType } from '../types';
import { validateEmail } from '../utils';

export interface ISearchBarProps {
  handleSubmit: (
    queryString: string,
    searchType: SearchType,
    resultsPerPage: number,
    currentPage: number
  ) => void,
  resultsCount: number
};

const SearchBar = ({ handleSubmit, resultsCount }: ISearchBarProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [queryString, setQueryString] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState(30);
  const [searchType, setSearchType] = useState(SearchType.Name);
  const [textError, setTextError] = useState(false);

  const handlePageCount = () => {
    // Github limits search API to 1000 results.
    const pageLimit = Math.ceil(1000 / resultsPerPage);
    const resultPages = Math.ceil(resultsCount / resultsPerPage);
    return Math.min(pageLimit, resultPages);
  };

  const submitData = () => {
    if (queryString === '') {
      return setTextError(true);
    } else if (searchType === SearchType.Email && validateEmail(queryString) === false) {
      return setTextError(true);
    };

    setTextError(false);
    handleSubmit(queryString, searchType, resultsPerPage, currentPage);
  };

  useEffect(() => setPageCount(handlePageCount()), [resultsCount]);

  useEffect(() => {
    const pageLimit = handlePageCount()
    if (currentPage > pageLimit) {
      setCurrentPage(pageLimit);
    } else {
      handleSubmit(queryString, searchType, resultsPerPage, currentPage);
    }

    setPageCount(pageLimit);
  }, [resultsPerPage]);

  useEffect(() => {
    handleSubmit(queryString, searchType, resultsPerPage, currentPage);
  }, [currentPage]);

  console.log('division: ', (Math.ceil(resultsCount / resultsPerPage)));
  console.log(resultsCount);

  return (
    <>
      <Grid container>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl>
            <FormLabel id='demo-controlled-radio-buttons-group'>Search Users By:</FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                onChange={(e) => setSearchType(e.target.value as SearchType)}
                value={searchType}
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
            onKeyDown={(e) => e.key === 'Enter' && submitData()}
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
            onClick={() => submitData()}
            size='large'
            sx={{ height: '56px' }}
            variant='contained'
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            Results per page:
          </Typography>
          <ButtonGroup variant='text' aria-label='text button group'>
            <Button onClick={() => setResultsPerPage(30)}>30</Button>
            <Button onClick={() => setResultsPerPage(50)}>50</Button>
            <Button onClick={() => setResultsPerPage(100)}>100</Button>
          </ButtonGroup>
        </Box>
        <Pagination
          color='primary'
          count={pageCount}
          onChange={(_, val) => setCurrentPage(val)}
          page={currentPage}
        />
      </Stack>
    </>
  );
};

export default SearchBar;
