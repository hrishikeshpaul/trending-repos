export interface Repo {
  name: string,
  url: string,
  owner: string,
  owner_url: string,
  avatar: string,
  description: string,
  stars: number,
  issues: number,
  created: string
}

export interface Error {
  message?: string,
  statusText?: string,
  troublshooot?: string
}