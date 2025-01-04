import { useTranslation } from '@nexus-ui/i18n'
import { MessagesList } from '@nexus-ui/ui'
import { MessagesProps as PrimeMessagesProps } from 'primereact/messages'
import { memo, useEffect, useRef } from 'react'
import { FieldErrors } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/shared/model'

import { generateApplicationMessageId } from '../../lib/applicationMessage/generateId'
import { useErrorMessages } from '../../lib/applicationMessage/useErrorMessages'
import {
  removeApplicationMessageById,
  replaceApplicationMessages,
  selectApplicationMessagesByPageAndType,
} from '../../model/applicationMessage/slice'
import {
  APPLICATION_MESSAGE_PAGE,
  APPLICATION_MESSAGE_TYPE,
  ApplicationMessage,
} from '../../model/applicationMessage/types'

const TYPE = APPLICATION_MESSAGE_TYPE.FORM

type FormValidationMessagesProps = PrimeMessagesProps & {
  page: APPLICATION_MESSAGE_PAGE
  errors: FieldErrors<z.Schema>
  ignoredMessages?: string[]
}

export const FormValidationMessages = memo(
  ({ page, errors, ignoredMessages = [], ...otherProps }: FormValidationMessagesProps) => {
    const { t } = useTranslation()

    const applicationMessages = useAppSelector((state) => selectApplicationMessagesByPageAndType(state, page, TYPE))
    const dispatch = useAppDispatch()

    const errorMessages = useErrorMessages(errors, ignoredMessages, t)
    const currentMessageIdsRef = useRef<string[]>([])

    useEffect(() => {
      if (errorMessages.length > 0) {
        const applicationMessages: ApplicationMessage[] = errorMessages.map(({ title, message }) => {
          return {
            id: generateApplicationMessageId({ page, title, message }),
            severity: 'error' as const,
            summary: title,
            detail: message,
            sticky: true,
            page,
            type: APPLICATION_MESSAGE_TYPE.FORM,
          }
        })

        currentMessageIdsRef.current = applicationMessages.map((message) => message.id)

        dispatch(replaceApplicationMessages(applicationMessages))
      } else {
        currentMessageIdsRef.current.forEach((id) => {
          dispatch(removeApplicationMessageById(id))
        })
        currentMessageIdsRef.current = []
      }

      return () => {
        currentMessageIdsRef.current.forEach((id) => {
          dispatch(removeApplicationMessageById(id))
        })
      }
      /**
       * We make the effect stop being executed on every render is to ignore the rules of hooks
       * (only from the perspective of the linter; we are actually still adhering to the rules of hooks)
       * and use the JSON.stringify() method on the errorMessages object.
       *
       * JSON.stringify() will make it possible for React to effectively detect if the actual value of the
       * errorMessages object has changed instead of just its reference
       *
       * Since the value is a string, React can now compare the previous value with the new value
       * and only execute the effect if they are different.
       *
       * You could find more information at https://gitlab.avag.eu/nexus/nexus-ui/-/merge_requests/159#note_4585
       */
      // eslint-disable-next-line react-compiler/react-compiler
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, JSON.stringify(errorMessages), page])

    return <MessagesList {...otherProps} messages={applicationMessages} />
  },
)

FormValidationMessages.displayName = 'FormValidationMessages'
