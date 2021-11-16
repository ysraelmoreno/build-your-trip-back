export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isIncomplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
