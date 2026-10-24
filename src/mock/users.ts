import type { User } from '../types/user'

export const users: User[] = [
  {
    id: '1', name: 'John Doe', gender: 'male', birthDate: 'October 26, 1998',
    email: 'john.doe@example.com', phone: '+1 555-123-4567', store: 'New York Store', dateAdded: '2024-10-01'
  },
  {
    id: '2', name: 'Jane Smith', gender: 'female', birthDate: 'March 15, 1992',
    email: 'alex.g@example.com', phone: '+44 20 7946 0958', store: 'London Store', avatar: 'jane', dateAdded: '2024-09-14'
  }
]
