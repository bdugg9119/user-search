import {
  User,
  UserList,
  SearchType
} from '../types';

const BASE_URL = 'https://api.github.com/';

export const getUser = async (id: number): Promise<User> => {
  try {
    return await fetch(BASE_URL + `user/${id}`).then(res => res.json());
  } catch (err: any) {
    return err;
  };
};

export const searchUsers = async (
  query: string,
  searchType: SearchType,
  resultsPerPage: number,
  currentPage: number
  ): Promise<UserList> => {
  const searchQuery = `search/users?q=${query}%20in:${searchType}&per_page=${resultsPerPage}&page=${currentPage}`;

  try {
    return await fetch(BASE_URL + searchQuery).then(res => res.json());
  } catch(err: any) {
    return err;
  };
};