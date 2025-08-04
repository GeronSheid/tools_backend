export type User = {
  id: number;
  email: string;
  name: string | null;
};

export type CreateUser = {
  email: string;
  name: string;
};

export type UpdateUserData = Partial<CreateUser>;