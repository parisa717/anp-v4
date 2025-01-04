import { z } from 'zod'

// TODO: Replace with proper UUID validation when connected to Gateway
export const IdParamSchema = z.object({ id: z.string().min(1) })
