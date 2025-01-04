import { MessagesList } from '@nexus-ui/ui'
import { MessagesProps as PrimeMessagesProps } from 'primereact/messages'
import { memo, useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '@/shared/model'

import {
  removeApplicationMessageById,
  selectApplicationMessagesByPageAndType,
} from '../../model/applicationMessage/slice'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'

type MessagesListOfTypeProps = PrimeMessagesProps & {
  page: APPLICATION_MESSAGE_PAGE
  type: APPLICATION_MESSAGE_TYPE
}

export const MessagesListOfType = memo(({ page, type, ...otherProps }: MessagesListOfTypeProps) => {
  const applicationMessages = useAppSelector((state) => selectApplicationMessagesByPageAndType(state, page, type))
  const dispatch = useAppDispatch()

  const currentMessageIdsRef = useRef<string[]>([])

  useEffect(() => {
    currentMessageIdsRef.current = applicationMessages.map((message) => message.id)

    return () => {
      currentMessageIdsRef.current.forEach((id) => {
        dispatch(removeApplicationMessageById(id))
      })
    }
  }, [applicationMessages, dispatch])

  return <MessagesList {...otherProps} messages={applicationMessages} />
})

MessagesListOfType.displayName = 'MessagesListOfType'
