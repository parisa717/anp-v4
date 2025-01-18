import { useEffect, useRef } from 'react'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { z } from 'zod'

import { useAppSelector } from '@/shared/model'

import { selectApplicationMessagesByPageAndType } from '../../model/applicationMessage/slice'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'

type ZodObjectSchema = z.ZodObject<z.ZodRawShape>

const isValidFormFieldPath = <TFieldValues extends FieldValues, TSchema extends ZodObjectSchema>(
  path: string,
  formSchema: TSchema,
): path is Path<TFieldValues> => {
  const validKeys = Object.keys(formSchema.shape)
  const rootField = path.split('.')[0]

  return validKeys.includes(rootField)
}

const getSchemaStructure = (schema: ZodObjectSchema) => {
  return Object.keys(schema.shape).sort().join(',')
}

export const useServerSideValidation = <TFieldValues extends FieldValues, TSchema extends ZodObjectSchema>(
  page: APPLICATION_MESSAGE_PAGE,
  setError: UseFormSetError<TFieldValues>,
  formSchema: TSchema,
) => {
  const validationMessages = useAppSelector((state) =>
    selectApplicationMessagesByPageAndType(state, page, APPLICATION_MESSAGE_TYPE.SERVER_SIDE_VALIDATION),
  )

  const schemaRef = useRef(formSchema)
  const schemaStructureRef = useRef(getSchemaStructure(formSchema))

  // Update refs when schema structure changes
  useEffect(() => {
    const currentStructure = getSchemaStructure(formSchema)

    if (currentStructure !== schemaStructureRef.current) {
      schemaRef.current = formSchema
      schemaStructureRef.current = currentStructure
    }
  }, [formSchema])

  // Handle validation messages
  useEffect(() => {
    validationMessages.forEach((message) => {
      if (message.validationErrors) {
        Object.entries(message.validationErrors).forEach(([fieldPath, errorMessages]) => {
          if (isValidFormFieldPath<TFieldValues, TSchema>(fieldPath, schemaRef.current) && errorMessages.length > 0) {
            setError(fieldPath, {
              type: 'server',
              message: errorMessages[0],
            })
          } else {
            console.warn(`Invalid form field path received from server: ${fieldPath}`)
          }
        })
      }
    })
  }, [validationMessages, setError])
}
