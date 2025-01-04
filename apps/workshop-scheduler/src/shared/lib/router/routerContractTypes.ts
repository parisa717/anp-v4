import { z } from 'zod'

import { IdParamSchema } from './routerContracts'

export type IdParam = z.infer<typeof IdParamSchema>
