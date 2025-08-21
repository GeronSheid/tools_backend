import {z} from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name is too long"),
  password: z.string().min(4, "Password must be at least 4 characters long").max(20, "Password is too long"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();


export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;