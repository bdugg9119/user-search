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

export const searchUsers = async (query: string, searchType: SearchType): Promise<UserList> => {
  try {
    return await fetch(BASE_URL + 'search/users?q=' + `${query}%20in:${searchType}`).then(res => res.json());
  } catch(err: any) {
    return err;
  };
};