export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  isIncomplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isIncomplete: boolean;
}
