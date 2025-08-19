import {z} from 'zod';

export const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name is too long"),
  password: z.string().min(4, "Password must be at least 4 characters long").max(20, "Password is too long"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;