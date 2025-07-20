import { z } from 'zod';

export const maybeDate = z
  .string()
  .or(z.number())
  .or(z.date())
  .optional()
  .transform(v => (v !== undefined ? new Date(v) : v));
