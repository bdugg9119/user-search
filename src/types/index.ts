export type ListUser = {
  avatar_url: string,
  events_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  gravatar_id: string,
  html_url: string,
  id: number,
  login: string,
  node_id: string,
  organizations_url: string,
  received_events_url: string,
  repos_url: string,
  score: number,
  site_admin: boolean,
  starred_url: string,
  subscriptions_url: string,
  type: string,
  url: string
};

export type UserList = {
  incomplete_results: boolean,
  items: ListUser[],
  total_count: number
};

export type User = {
  avatar_url: string,
  bio: string,
  blog: string,
  company?: string,
  created_at: Date,
  email?: string,
  events_url: string,
  followers: number,
  followers_url: string,
  following: number,
  following_url: string,
  gists_url: string,
  gravatar_id: string,
  hireable?: string,
  html_url: string,
  id: number,
  location?: string,
  login: string,
  name: string,
  node_id: string,
  organizations_url: string,
  public_gists: number,
  public_repos: number,
  received_events_url: string,
  repos_url: string,
  site_admin: false,
  starred_url: string,
  subscriptions_url: string,
  twitter_username: null,
  type: string,
  updated_at: Date,
  url: string
};

export enum SearchType {
  Email = 'email',
  Name = 'name'
};