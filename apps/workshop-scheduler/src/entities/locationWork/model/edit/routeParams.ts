import { z } from 'zod'

export const EditLocationWorkParamSchema = z.object({
  id: z.string().min(1),
  locationWorkId: z.string().min(1),
})
export type EditLocationWorkParams = z.infer<typeof EditLocationWorkParamSchema>
