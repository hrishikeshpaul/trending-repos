/**
 * Interface for each repositoy object
 */
export interface Repo {
  name: string;
  url: string;
  owner: string;
  owner_url: string;
  avatar: string;
  description: string;
  stars: number;
  issues: number;
  created: string;
  dur: number;
}

/**
 * Interface for the error object
 */
export interface Error {
  message?: string;
  statusText?: string;
  troublshooot?: string;
}
