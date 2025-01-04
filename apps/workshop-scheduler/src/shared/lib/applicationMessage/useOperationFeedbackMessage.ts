import { useAppDispatch } from '@/shared/model'

import { addApplicationMessage, replaceApplicationMessages } from '../../model/applicationMessage/slice'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'
import { generateApplicationMessageId } from './generateId'

export const useOperationFeedbackMessage = (page: APPLICATION_MESSAGE_PAGE) => {
  const dispatch = useAppDispatch()

  const addOperationFeedback = ({ title, message }: { title: string; message: string }) => {
    dispatch(
      addApplicationMessage({
        id: generateApplicationMessageId({ page, title, message }),
        severity: 'error',
        summary: title,
        detail: message,
        sticky: true,
        page,
        type: APPLICATION_MESSAGE_TYPE.OPERATION,
      }),
    )
  }

  const replaceOperationFeedback = (messages: { title: string; message: string }[]) => {
    const applicationMessages = messages.map(({ title, message }) => {
      return {
        id: generateApplicationMessageId({ page, title, message }),
        severity: 'error' as const,
        summary: title,
        detail: message,
        sticky: true,
        page,
        type: APPLICATION_MESSAGE_TYPE.OPERATION,
      }
    })

    dispatch(replaceApplicationMessages(applicationMessages))
  }

  return {
    addOperationFeedback,
    replaceOperationFeedback,
  }
}
