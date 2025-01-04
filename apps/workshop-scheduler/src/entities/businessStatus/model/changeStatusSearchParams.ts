import { z } from 'zod'

export const changeBusinessStatusSearchParams = z.object({
  type: z.enum(['activate', 'deactivate']),
  // Since search params are always strings, boolean values need to be specified this way
  isAdditionalBusinessStatus: z.enum(['true', 'false']),
})

export type ChangeBusinessStatusSearchParams = z.infer<typeof changeBusinessStatusSearchParams>
