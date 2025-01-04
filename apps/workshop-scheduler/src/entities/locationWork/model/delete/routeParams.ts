import { z } from 'zod'

export const RemoveLocationWorkParamSchema = z.object({
  id: z.string().min(1),
  locationWorkId: z.string().min(1),
})

export type RemoveLocationWorkParams = z.infer<typeof RemoveLocationWorkParamSchema>
