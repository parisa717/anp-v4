type ServerSideValidationError = {
  messageKey: string
  context: Record<string, string>
  plurality: number | null
}

type ServerSideFieldError = {
  errors: ServerSideValidationError[]
}

type ServerSideNestedFieldErrors = {
  children: Record<string, ServerSideFieldError>
}

type ServerSideValidationFields = {
  [key: string]: ServerSideFieldError | ServerSideNestedFieldErrors
}

export type ServerSideValidationContext = {
  fields: ServerSideValidationFields
}
