export type UserSort = 'name' | 'date'

export interface UserInput {
  name: string
  gender: 'male' | 'female'
  birthDate: string
  email: string
  phone: string
  store: string
}

export interface User extends UserInput {
  id: string
  avatar?: string
  dateAdded: string
}

export interface UserQuery {
  q: string
  sort: UserSort
}
