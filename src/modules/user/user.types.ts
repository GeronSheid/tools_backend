export type User = {
  id: number;
  email: string;
  password: string;
  name: string | null;
};

export type CreateUser = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserData = Partial<CreateUser>;