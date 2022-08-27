import {useState} from 'react';
import {
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';

import { searchUsers } from '../api';
import { SearchType } from '../types';

import SearchBar from './SearchBar';
import UserAccordion from './UserAccordion';

const Main = () => {
  const [queryParams, setQueryParams] = useState({ queryString: '', searchType: SearchType.Name });
  const {
    data: userList,
    error,
    isFetching
  } = useQuery(
    ['users', queryParams],
    () => searchUsers(queryParams.queryString, queryParams.searchType),
    {
      enabled: !!queryParams.queryString,
      refetchOnWindowFocus: false
    }
  );
  
  const submitQuery = (queryString: string, searchType: SearchType) => {
    setQueryParams({ queryString: queryString, searchType: searchType });
  };

  if (error) console.error(error);

  return (
    <>
      <SearchBar handleSubmit={submitQuery} />
      <Divider sx={{ marginBottom: '25px', marginTop: '25px' }}/>
      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={80}/>
        </Box>
      )}
      <UserAccordion userList={userList} />
    </>
  );
};

export default Main;