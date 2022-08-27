import {
  User,
  UserList,
  SearchType
} from '../types';

import { octokit } from '../App';

export const getUser = async (username: string): Promise<any> => {
  try {
    return await octokit.request(`GET /users/${username}`);
  } catch (err: any) {
    return err;
  };
};

export const searchUsers = async (
  query: string,
  searchType: SearchType,
  resultsPerPage: number,
  currentPage: number
  ) => {
  const searchQuery = {
    page: currentPage,
    per_page: resultsPerPage,
    q: query + ` in:${searchType}`
  };

  try {
    return await octokit.rest.search.users(searchQuery); 
  } catch(err: any) {
    return err;
  };
};