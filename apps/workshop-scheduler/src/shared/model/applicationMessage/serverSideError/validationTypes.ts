export type ServerSideValidationError = {
  messageKey: string
  context?: Record<string, string>
  plurality?: number | null
}

export type ServerSideValidationField = {
  errors?: ServerSideValidationError[]
  children?: Record<string, ServerSideValidationField>
}

export type ServerSideValidationFields = {
  fields: Record<string, ServerSideValidationField>
}

export type ServerSideValidationContext = {
  fields: Record<string, ServerSideValidationField>
}
