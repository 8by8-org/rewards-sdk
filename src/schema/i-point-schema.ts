import { z } from 'zod';

export const IPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type IPoint = z.infer<typeof IPointSchema>;
