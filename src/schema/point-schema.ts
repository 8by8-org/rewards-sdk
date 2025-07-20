import { z } from 'zod';

export const pointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
