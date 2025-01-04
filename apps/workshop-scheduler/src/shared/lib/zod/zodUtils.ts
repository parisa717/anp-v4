import { ZodType } from 'zod'

export type Contract<Raw, Data extends Raw> = {
  isData: (prepared: Raw) => prepared is Data
  getErrorMessages: (prepared: Raw) => string[]
}

export function zodContract<D>(data: ZodType<D>): Contract<unknown, D> {
  return {
    isData: (prepared: unknown): prepared is D => {
      return data.safeParse(prepared).success
    },
    getErrorMessages(raw) {
      const validation = data.safeParse(raw)
      if (validation.success) {
        return []
      }

      return validation.error.errors.map((e) => {
        const path = e.path.join('.')
        return path !== '' ? `${e.message}, path: ${path}` : e.message
      })
    },
  }
}
