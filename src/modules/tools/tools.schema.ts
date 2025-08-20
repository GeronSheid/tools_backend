import {z} from 'zod';

export const ToolTypeSchema = z.union([
    z.literal('HAND'),
    z.literal('HEAVY'),
    z.literal('GENERATOR'),
    z.literal('CONSTRUCTION')
  ])

export const ToolSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(20),
  toolType: ToolTypeSchema,
  toolName: z.string().min(1, 'Name is required').max(20),
  brand: z.string().nullish(),
  model: z.string().nullish(),
  dayPrice: z.number().min(0, 'Price must be non-negative'),
  weekPrice: z.number().min(0, 'Price must be non-negative'),
  deposit: z.number().min(0, 'Deposit must be non-negative'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  imageUrl: z.string().url('Url is invalid'),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const CreateToolSchema = ToolSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateToolSchema = CreateToolSchema.partial();

export type ToolType = z.infer<typeof ToolTypeSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type CreateTool = z.infer<typeof CreateToolSchema>;
export type UpdateTool = z.infer<typeof UpdateToolSchema>;