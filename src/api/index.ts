import { octokit } from '../App';

import { SearchType } from '../types';

export const getUser = async (username: string): Promise<any> => {
  try {
    return await octokit.request(`GET /users/${username}`).then(res => res.data);
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.error(err.toUpperCase()); // works, `e` narrowed to string
    } else if (err instanceof Error) {
      console.error(err.message); // works, `e` narrowed to Error
    }
    return err;
  };
};

export const searchUsers = async (
  query: string,
  searchType: SearchType,
  resultsPerPage: number,
  currentPage: number
  ): Promise<any> => {
  const searchQuery = { page: currentPage, per_page: resultsPerPage, q: query + ` in:${searchType}` };

  try {
    return await octokit.rest.search.users(searchQuery).then(res => res.data.items); 
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.error(err.toUpperCase()); // works, `e` narrowed to string
    } else if (err instanceof Error) {
      console.error(err.message); // works, `e` narrowed to Error
    }
    return err;
  };
};